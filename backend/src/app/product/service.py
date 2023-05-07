import os
import shutil
from typing import List
import uuid
from app.models import CreateEngine, Product, ProductCategory, Category, Photo
from app.utils import query_to_dict, product_to_json, category_to_json, photo_to_json
from sqlalchemy.dialects import postgresql
from sqlalchemy import or_, and_
from app.product.models import ProductCreate

class ProductService:

    def __init__(self):
        self.engine = CreateEngine()

    def get_products_filter(self, query: str) -> dict:
        result = dict()
        params = query_to_dict(query)
        Session = self.engine.create_session()
        count = 0

        with Session() as session:
            filters = list()
            if "search" in params:
                filters.append(Product.name.like("%{}%".format(params["search"][0])))
            if "price" in params:
                filters.append(Product.total_price < params["price"][0])
            if "quantity" in params:
                filters.append(Product.quantity > params["quantity"][0])
            if "category" in params:
                categories = list()
                for category in params["category"]:
                    categories.append(ProductCategory.category_id == category)
                filters.append(or_(*categories))
            products = session.query(Product).join(ProductCategory).filter(and_(*filters)).all()
            for product in products:
                result[count] = self.get_product_info(product)
                count += 1
        Session.remove()
        return result

    def get_products_all(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            products = session.query(Product).all()
            for product in products:
                result[count] = self.get_product_info(product)
                count += 1
        Session.remove()
        return result

    def get_product(self, product_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            product = session.query(Product).filter(Product.product_id == product_id).one()
            result = self.get_product_info(product)
        Session.remove()
        return result

    def get_product_categories(self, product_id: int) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            categories = session.query(Category).join(ProductCategory).filter(ProductCategory.product_id == product_id).all()
            for i, category in enumerate(categories):
                result[i] = category_to_json(category)
        Session.remove()
        return result

    def get_product_photos(self, product_id: int) -> str:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            photos = session.query(Photo).filter(Photo.product_id == product_id).all()
            for i, photo in enumerate(photos):
                result[i] = photo_to_json(photo)
        Session.remove()
        return result

    def get_product_info(self, product: Product) -> dict:
        categories = self.get_product_categories(product.product_id)
        photos = self.get_product_photos(product.product_id)
        return product_to_json(product, categories, photos)
    
    def create_product(self, product: ProductCreate) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            product_entity = Product(
                seller_id=product.seller_id,
                name=product.name,
                product_description=product.description,
                quantity=product.quantity,
                total_price=product.total_price,
                sale_type=product.sale_type,
            )
            session.add(product_entity)
            session.commit()
            product_id = product_entity.product_id
            for photo in product.photos:
                if not os.path.exists("/backend/static/photos/" + product.name):
                    os.makedirs("/backend/static/photos/" + product.name)
                filename = str(uuid.uuid4()) + ".jpg"
                with open("/backend/static/photos/" + product.name + "/" + filename, "wb") as buffer:
                    as_bytes = bytes.fromhex(photo)
                    buffer.write(as_bytes)
                photo_entity = Photo(
                    product_id=product_id,
                    photo_url="/backend/static/photos/" + product.name + "/" + filename
                )
                session.add(photo_entity)
            session.commit()
            for category in product.categories:
                product_category_entity = ProductCategory(
                    product_id=product_id,
                    category_id=category
                )
                session.add(product_category_entity)
                session.commit()
            result = self.get_product(product_id)
        Session.remove()
        return result
