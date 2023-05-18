# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text, create_engine
from sqlalchemy.orm import relationship, sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class CreateEngine:

    def __init__(self):
        self.connection_string = "postgresql://postgres:postgres@db:5432/leasing_shop"
        self.engine = create_engine(self.connection_string)

    def create_table(self):
        return Base.metadata.create_all(self.engine)

    def create_session(self) -> scoped_session:
        session_factory = sessionmaker(bind=self.engine)
        Session = scoped_session(session_factory)
        return Session


class User(Base):
    __tablename__ = 'user_'
    __table_args__ = {'extend_existing': True}

    user_id = Column(Integer, primary_key=True, server_default=text("nextval('user__user_id_seq'::regclass)"))
    role_id = Column(ForeignKey('role.role_id'), nullable=False)
    address_id = Column(ForeignKey('address.address_id'), nullable=False)
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

    address = relationship('Address')
    role = relationship('Role')

    def serialize(self) -> dict:
        return {
            "id": self.product_id,
            "role_id": self.role_id,
            "address_id": self.address_id,
            "username": self.username,
            "email": self.email
        }


class Category(Base):
    __tablename__ = 'category'
    __table_args__ = {'extend_existing': True}

    category_id = Column(Integer, primary_key=True,
                         server_default=text("nextval('category_category_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)

    def serialize(self) -> dict:
        return {
            "id": self.category_id,
            "name": self.name
        }


class Color(Base):
    __tablename__ = 'color'
    __table_args__ = {'extend_existing': True}

    color_id = Column(Integer, primary_key=True,
                      server_default=text("nextval('color_color_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)

    def serialize(self) -> dict:
        return {
            "id": self.color_id,
            "name": self.name
        }


class Product(Base):
    __tablename__ = 'product'
    __table_args__ = {'extend_existing': True}

    product_id = Column(Integer, primary_key=True, server_default=text("nextval('product_product_id_seq'::regclass)"))
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    name = Column(String(255), nullable=False)
    brand = Column(String(255), nullable=False)
    product_description = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Numeric(8, 2), nullable=False)
    sale_type = Column(String(20))

    seller = relationship('User')

    def serialize(self) -> dict:
        return {
            "id": self.product_id,
            "seller_id": self.seller_id,
            "name": self.name,
            "brand": self.brand,
            "product_description": self.product_description,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "sale_type": self.sale_type
        }


class Review(Base):
    __tablename__ = 'review'
    __table_args__ = {'extend_existing': True}

    review_id = Column(Integer, primary_key=True, server_default=text("nextval('review_review_id_seq'::regclass)"))
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    reviewer_id = Column(ForeignKey('user_.user_id'), nullable=False)
    review = Column(Integer, nullable=False)
    review_description = Column(String(255), nullable=False)

    reviewer = relationship('User', primaryjoin='Review.reviewer_id == User.user_id')
    seller = relationship('User', primaryjoin='Review.seller_id == User.user_id')

    def serialize(self) -> dict:
        return {
            "id": self.review_id,
            "seller_id": self.seller_id,
            "reviewer_id": self.reviewer_id,
            "review": self.review,
            "review_description": self.review_description
        }


class QuestionAnswer(Base):
    __tablename__ = 'question_answer'
    __table_args__ = {'extend_existing': True}

    qa_id = Column(Integer, primary_key=True, server_default=text("nextval('question_answer_qa_id_seq'::regclass)"))
    product_id = Column(ForeignKey('product.product_id'), nullable=False)
    question = Column(String(255), nullable=False)
    answer = Column(String(255), nullable=False)

    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "id": self.qa_id,
            "product_id": self.product_id,
            "question": self.question,
            "answer": self.answer
        }


class Photo(Base):
    __tablename__ = 'photo'
    __table_args__ = {'extend_existing': True}

    photo_id = Column(Integer, primary_key=True, server_default=text("nextval('photo_photo_id_seq'::regclass)"))
    photo_url = Column(String(255), nullable=False)
    product_id = Column(ForeignKey('product.product_id'), nullable=False)

    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "id": self.photo_id,
            "photo_url": self.photo_url,
            "product_id": self.product_id
        }


class Auction(Base):
    __tablename__ = 'auction'
    __table_args__ = {'extend_existing': True}

    auction_id = Column(Integer, primary_key=True, server_default=text("nextval('auction_auction_id_seq'::regclass)"))
    product_id = Column(ForeignKey('product.product_id'), nullable=False)
    highest_bidder_id = Column(ForeignKey('user_.user_id'), nullable=False)
    current_price = Column(Numeric(8, 2), nullable=False)
    highest_bid = Column(Numeric(8, 2), nullable=False)
    minimal_bump = Column(Numeric(5, 2), nullable=False)
    end_date = Column(Date, nullable=False)

    highest_bidder = relationship('User')
    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "id": self.auction_id,
            "product_id": self.product_id,
            "highest_bidder_id": self.highest_bidder_id,
            "current_price": self.current_price,
            "highest_bid": self.highest_bid,
            "minimal_bump": self.minimal_bump,
            "end_date": self.end_date
        }


class ProductCategory(Base):
    __tablename__ = 'product_category'
    __table_args__ = {'extend_existing': True}

    category_id = Column(ForeignKey('category.category_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)

    category = relationship('Category')
    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "category_id": self.category_id,
            "product_id": self.product_id
        }


class ProductColor(Base):
    __tablename__ = 'product_color'
    __table_args__ = {'extend_existing': True}

    color_id = Column(ForeignKey('color.color_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)

    color = relationship('Color')
    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "color_id": self.color_id,
            "product_id": self.product_id
        }


class SaleOrder(Base):
    __tablename__ = 'sale_order'
    __table_args__ = {'extend_existing': True}

    order_id = Column(Integer, primary_key=True, server_default=text("nextval('sale_order_order_id_seq'::regclass)"))
    buyer_id = Column(ForeignKey('user_.user_id'), nullable=False)
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    order_date = Column(Date, nullable=False)
    total_price = Column(Numeric(8, 2), nullable=False)

    buyer = relationship('User', primaryjoin='SaleOrder.buyer_id == User.user_id')
    seller = relationship('User', primaryjoin='SaleOrder.seller_id == User.user_id')

    def serialize(self) -> dict:
        return {
            "order_id": self.order_id,
            "buyer_id": self.buyer_id,
            "seller_id": self.seller_id,
            "order_date": self.order_date,
            "total_price": self.total_price
        }


class OrderProduct(Base):
    __tablename__ = 'order_product'
    __table_args__ = {'extend_existing': True}

    order_id = Column(ForeignKey('sale_order.order_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship('SaleOrder')
    product = relationship('Product')

    def serialize(self) -> dict:
        return {
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity
        }


class Role(Base):
    __tablename__ = 'role'
    __table_args__ = {'extend_existing': True}

    role_id = Column(Integer, primary_key=True, server_default=text("nextval('role_role_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)

    def serialize(self) -> dict:
        return {
            "id": self.role_id,
            "name": self.name
        }


class Address(Base):
    __tablename__ = 'address'
    __table_args__ = {'extend_existing': True}

    address_id = Column(Integer, primary_key=True, server_default=text("nextval('address_address_id_seq'::regclass)"))
    country = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    postal_code = Column(String(255), nullable=False)
    street = Column(String(255), nullable=False)
    building = Column(Integer, nullable=False)
    flat = Column(String(3), nullable=True)
    latitude = Column(String(10), nullable=True)
    longitude = Column(String(10), nullable=True)

    def serialize(self) -> dict:
        return {
            "id": self.address_id,
            "country": self.country,
            "region": self.region,
            "city": self.city,
            "postal_code": self.postal_code,
            "street": self.street,
            "building": self.building,
            "flat": self.flat,
            "latitude": self.latitude,
            "longitude": self.longitude
        }
