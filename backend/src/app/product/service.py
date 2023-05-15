import os
from typing import List
import uuid
from app.models import CreateEngine, Product, ProductCategory, Category, Photo, Color, ProductColor, Auction
from sqlalchemy.dialects import postgresql
from sqlalchemy import or_, and_, desc, asc, text
from app.product.schema import ProductCreateSchema, ProductParams
from datetime import datetime
from fastapi import UploadFile


class ProductService:

    def __init__(self):
        self.engine = CreateEngine()

    def get_products_filter(self, params: ProductParams) -> dict:
        result = dict()

        Session = self.engine.create_session()
        with Session() as session:
            filters = list()

            if params.has_search():
                filters.append(Product.name.ilike("%{}%".format(params.search)))
            if params.has_quantity():
                filters.append(Product.quantity > params.quantity)
            if params.has_categories():
                categories = list()
                for category in params.categories:
                    categories.append(ProductCategory.category_id == category)
                filters.append(or_(*categories))
            if params.has_brands():
                brands = list()
                for brand in params.brands:
                    brands.append(Product.brand == brand)
                filters.append(or_(*brands))
            if params.has_colors():
                colors = list()
                for color in params.colors:
                    colors.append(Color.name == color)
                filters.append(or_(*colors))
            if params.has_price():
                filters.append(Product.total_price < params.price)
            if params.has_auction():
                auction_type = "Auction" if params.auction else "Regular"
                filters.append(Product.sale_type == auction_type)
            if params.has_auction_active():
                today = datetime.today().strftime('%Y-%m-%d')
                if params.auction_active:
                    filters.append(Auction.end_date >= today)
                else:
                    filters.append(Auction.end_date < today)

            sort = asc(text(params.order_by)) if params.order == "ASC" else desc(text(params.order_by))
            query = session.query(Product).join(ProductCategory).join(ProductColor).join(Color).join(Auction)
            products = query.filter(and_(*filters)).order_by(sort).limit(params.limit).offset(params.page * params.limit)
            for count, product in enumerate(products):
                result[count] = self.get_product_info(product)
        Session.remove()

        return result

    def get_products_all(self) -> dict:
        result = dict()

        Session = self.engine.create_session()
        with Session() as session:
            products = session.query(Product).order_by(asc("product_id")).limit(20).all()
            for count, product in enumerate(products):
                result[count] = self.get_product_info(product)
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
            categories = session.query(Category).join(ProductCategory).filter(
                ProductCategory.product_id == product_id).all()
            for i, category in enumerate(categories):
                result[i] = category.serialize()
        Session.remove()

        return result

    def get_product_colors(self, product_id: int) -> dict:
        result = dict()

        Session = self.engine.create_session()
        with Session() as session:
            colors = session.query(Color).join(ProductColor).filter(
                ProductColor.product_id == product_id).all()
            for i, color in enumerate(colors):
                result[i] = color.serialize()
        Session.remove()

        return result

    def get_product_photos(self, product_id: int) -> dict:
        result = dict()

        Session = self.engine.create_session()
        with Session() as session:
            photos = session.query(Photo).filter(Photo.product_id == product_id).all()
            for i, photo in enumerate(photos):
                result[i] = photo.serialize()
        Session.remove()

        return result

    def get_product_auction(self, product_id: int) -> dict:

        Session = self.engine.create_session()
        with Session() as session:
            auction = session.query(Auction).filter(Auction.product_id == product_id).one()
            result = auction.serialize()
        Session.remove()

        return result

    def get_product_info(self, product: Product) -> dict:

        result = product.serialize()
        result["photos"] = self.get_product_photos(product.product_id)
        result["colors"] = self.get_product_colors(product.product_id)
        result["categories"] = self.get_product_categories(product.product_id)

        if product.sale_type == "Auction":
            result["auction"] = self.get_product_auction(product.product_id)
        return result

    async def create_product(self, product: ProductCreateSchema, photos: List[UploadFile]) -> dict:

        Session = self.engine.create_session()
        with Session() as session:
            product_id = self.create_product_info(session, product)
            self.create_product_categories(session, product_id, product.categories)
            await self.create_product_photos(session, product_id, photos)
        Session.commit()
        Session.remove()

        return self.get_product(product_id)

    def create_product_info(self, product: ProductCreateSchema) -> int:
        new_product = Product(
            seller_id=product.seller_id,
            name=product.name,
            product_description=product.description,
            quantity=product.quantity,
            total_price=product.total_price,
            sale_type=product.sale_type
        )

        Session = self.engine.create_session()
        with Session() as session:
            session.add(new_product)
        Session.commit()
        Session.remove()

        return new_product.product_id

    def create_product_categories(self, product_id: int, categories: List[int]) -> None:

        Session = self.engine.create_session()
        with Session() as session:
            for category_id in categories:
                new_product_category = ProductCategory(
                    product_id=product_id,
                    category_id=category_id
                )
                session.add(new_product_category)
        Session.commit()
        Session.remove()

    async def create_product_photos(self, product_id: int, photos: List[UploadFile]) -> None:
        if not os.path.exists(f"/backend/static/{product_id}"):
            os.mkdir(f"/backend/static/{product_id}")

        Session = self.engine.create_session()
        with Session() as session:
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
        Session.commit()
        Session.remove()
