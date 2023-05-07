import os
from typing import List
import uuid
from app.models import CreateEngine, Product, ProductCategory, Category, Photo
from app.utils import query_to_dict, product_to_json, category_to_json, photo_to_json
from sqlalchemy.dialects import postgresql
from sqlalchemy import or_, and_
from app.product.models import ProductCreate
from fastapi import UploadFile

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
    
    async def create_product(self, product: ProductCreate, photos: List[UploadFile]) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            product_id = self.create_product_info(session, product)
            self.create_product_categories(session, product_id, product.categories)
            await self.create_product_photos(session, product_id, photos)
        Session.commit()
        return self.get_product(product_id)
    
    def create_product_info(self, session, product: ProductCreate) -> int:
        new_product = Product(
            seller_id=product.seller_id,
            name=product.name,
            product_description=product.description,
            quantity=product.quantity,
            total_price=product.total_price,
            sale_type=product.sale_type
        )
        session.add(new_product)
        session.commit()
        return new_product.product_id

    def create_product_categories(self, session, product_id: int, categories: List[int]) -> None:
        for category_id in categories:
            new_product_category = ProductCategory(
                product_id=product_id,
                category_id=category_id
            )
            session.add(new_product_category)
        session.commit()
    
    async def create_product_photos(self, session, product_id: int, photos: List[UploadFile]) -> None:
        if not os.path.exists(f"/backend/static/{product_id}"):
            os.mkdir(f"/backend/static/{product_id}")

        for photo in photos:
            photo_url = f"/backend/static/{product_id}/{uuid.uuid4()}.{photo.filename.split('.')[-1]}"
            with open(photo_url, "wb") as image:
                content = await photo.read()
                image.write(content)
                image.close()
            new_photo = Photo(
                product_id=product_id,
                photo_url=photo_url
            )
            session.add(new_photo)
        session.commit()

            
            