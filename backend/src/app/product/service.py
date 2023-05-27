import os
from typing import List
import uuid

import sqlalchemy.exc
from app.models import CreateEngine, Product, ProductCategory, Category, Photo, Color, ProductColor, Auction, User
from sqlalchemy.dialects import postgresql
from sqlalchemy import or_, and_, desc, asc, text
from app.product.schema import ProductCreateSchema, ProductParams, AuctionCreateSchema
from datetime import datetime
from fastapi import UploadFile, HTTPException
from decimal import Decimal

sale_types = ["Regular", "Auction"]


def process_filters(params: ProductParams) -> list:
    filters = list()

    if params.has_search():
        search_query = "%" + params.search + "%"
        searches = list()
        searches.append(Product.name.ilike(search_query))
        searches.append(Product.brand.ilike(search_query))
        searches.append(Product.product_description.ilike(search_query))
        filters.append(or_(*searches))
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
    return filters


class ProductService:

    def __init__(self):
        self.engine = CreateEngine()

    def get_products_filter(self, params: ProductParams) -> dict:
        result = dict()

        Session = self.engine.create_session()
        with Session() as session:
            filters = process_filters(params)
            sort = asc(text(params.order_by)) if params.order == "ASC" else desc(text(params.order_by))

            query = session.query(Product).join(ProductCategory).join(ProductColor).join(Color)
            query = query.join(Auction, isouter=True)

            products = query.filter(and_(*filters)).order_by(sort).limit(params.limit).offset(
                params.page * params.limit)
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

    def get_product_all_count(self) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            total_count = session.query(Product.product_id).count()
        Session.remove()

        result = int(total_count / 20)
        result += 1 if total_count % 20 != 0 else 0

        return {"count": result}

    def get_product_filter_count(self, params: ProductParams) -> dict:

        Session = self.engine.create_session()
        with Session() as session:
            filters = process_filters(params)

            query = session.query(Product).join(ProductCategory).join(ProductColor).join(Color)
            query = query.join(Auction, isouter=True)

            total_count = query.filter(and_(*filters)).count()
        Session.remove()
        result = int(total_count / params.limit)
        result += 1 if total_count % params.limit != 0 else 0

        return {"count": result}

    def get_product(self, product_id: int) -> dict:

        Session = self.engine.create_session()
        with Session() as session:
            product = session.query(Product).get(product_id)
            if product is None:
                raise HTTPException(status_code=422, detail="No product with such id")
        Session.remove()
        result = self.get_product_info(product)
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
            auction = session.query(Auction).filter(Auction.product_id == product_id).first()
            if auction is None:
                raise HTTPException(status_code=422, detail="No auction for given product id")
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

    def create_product(self, product: ProductCreateSchema) -> dict:

        self.creation_validation(product, None)

        product_id = self.create_product_info(product)
        self.create_product_categories(product_id, product.categories)
        self.create_product_colors(product_id, product.colors)
        self.create_product_photos(product_id, product.photos)
        return self.get_product(product_id)

    def create_product_auction(self, product: ProductCreateSchema, auction: AuctionCreateSchema) -> dict:

        self.creation_validation(product, auction)

        product_id = self.create_product_info(product)
        self.create_auction(auction, product_id)
        self.create_product_categories(product_id, product.categories)
        self.create_product_colors(product_id, product.colors)
        self.create_product_photos(product_id, product.photos)

        return self.get_product(product_id)

    def create_auction(self, auction: AuctionCreateSchema, product_id: int) -> None:

        Session = self.engine.create_session()
        with Session() as session:
            new_auction = Auction(
                product_id=product_id,
                highest_bidder_id=auction.highest_bidder_id,
                current_price=auction.starting_price,
                highest_bid=auction.highest_bid,
                minimal_bump=auction.minimal_bump,
                end_date=auction.end_date)
            session.add(new_auction)
            session.commit()
        Session.remove()

    def create_product_info(self, product: ProductCreateSchema) -> int:

        Session = self.engine.create_session()
        with Session() as session:

            new_product = Product(
                seller_id=product.seller_id,
                name=product.name,
                brand=product.brand,
                product_description=product.description,
                quantity=product.quantity,
                total_price=product.total_price,
                sale_type=product.sale_type
            )
            session.add(new_product)
            session.commit()
            new_id = new_product.product_id
        Session.remove()

        return new_id

    def create_product_colors(self, product_id: int, colors: List[int]) -> None:

        Session = self.engine.create_session()
        with Session() as session:
            for color_id in colors:
                new_product_color = ProductColor(
                    product_id=product_id,
                    color_id=color_id
                )
                session.add(new_product_color)
            session.commit()
        Session.remove()

    def create_product_categories(self, product_id: int, categories: List[int]) -> None:

        Session = self.engine.create_session()
        with Session() as session:
            for category_id in categories:
                new_product_category = ProductCategory(
                    product_id=product_id,
                    category_id=category_id
                )
                session.add(new_product_category)
            session.commit()
        Session.remove()

    def create_product_photos(self, product_id: int, photos: List[str]) -> None:
        Session = self.engine.create_session()
        with Session() as session:
            for photo in photos:
                new_photo = Photo(
                    product_id=product_id,
                    content=photo
                )
                session.add(new_photo)
            session.commit()
        Session.remove()

    def auction_bump(self, product_id: int, user_id: int, bid: float) -> dict:
        bid = Decimal(bid)
        Session = self.engine.create_session()
        with Session() as session:

            bidder = session.query(User).get(user_id)
            if bidder is None:
                raise HTTPException(status_code=422, detail="No user with given id")

            reference_value = bid
            auction = session.query(Auction).filter(Auction.product_id == product_id).first()
            if auction is not None:
                if auction.highest_bid < bid:
                    auction.highest_bidder_id = user_id
                    auction.highest_bid = bid
                    reference_value = auction.current_price
                auction.current_price = min(auction.highest_bid, reference_value + auction.minimal_bump)
                session.commit()
                result = session.query(Auction).filter(Auction.product_id == product_id).first().serialize()
            else:
                raise HTTPException(status_code=422, detail="No auction for given id")

        Session.remove()

        return result

    def creation_validation(self, product: ProductCreateSchema, auction: AuctionCreateSchema | None) -> None:

        if len(product.categories) == 0:
            raise HTTPException(status_code=422, detail="Categories cannot be empty")
        if len(product.colors) == 0:
            raise HTTPException(status_code=422, detail="Colors cannot be empty")

        if auction is not None:
            if auction.minimal_bump < 1:
                raise HTTPException(status_code=422, detail="Minimal bump must be greater or equal to 1")
            if auction.end_date < datetime.today().date():
                raise HTTPException(status_code=422, detail="Date cannot be less than today")

        Session = self.engine.create_session()
        with Session() as session:

            for category_id in product.categories:
                category = session.query(Category).get(category_id)
                if category is None:
                    raise HTTPException(status_code=422, detail="No category with id {}".format(category_id))

            for color_id in product.colors:
                color = session.query(Color).get(color_id)
                if color is None:
                    raise HTTPException(status_code=422, detail="No color with id {}".format(color_id))

            seller = session.query(User).get(product.seller_id)
            if seller is None:
                raise HTTPException(status_code=422, detail="No seller with given id")
            if product.sale_type not in sale_types:
                message = "{} is not a valid sale type ({})".format(product.sale_type, sale_types)
                raise HTTPException(status_code=422, detail=message)
            if product.quantity < 1:
                raise HTTPException(status_code=422, detail="Quantity cannot be smaller than 1")
            if product.total_price < 0:
                raise HTTPException(status_code=422, detail="Price cannot be negative")

