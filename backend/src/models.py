# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Address(Base):
    __tablename__ = 'address'

    address_id = Column(Integer, primary_key=True, server_default=text("nextval('address_address_id_seq'::regclass)"))
    country = Column(String(255), nullable=False)
    region = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    postal_code = Column(String(255), nullable=False)
    street = Column(String(255), nullable=False)
    building = Column(Integer, nullable=False)
    flat = Column(String(3))
    latitude = Column(String(10))
    longitude = Column(String(10))


class Category(Base):
    __tablename__ = 'category'

    category_id = Column(Integer, primary_key=True, server_default=text("nextval('category_category_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)

    products = relationship('Product', secondary='product_category')


class Role(Base):
    __tablename__ = 'role'

    role_id = Column(Integer, primary_key=True, server_default=text("nextval('role_role_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)


class User(Base):
    __tablename__ = 'user_'

    user_id = Column(Integer, primary_key=True, server_default=text("nextval('user__user_id_seq'::regclass)"))
    role_id = Column(ForeignKey('role.role_id'), nullable=False)
    address_id = Column(ForeignKey('address.address_id'), nullable=False)
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)

    address = relationship('Addres')
    role = relationship('Role')


class Product(Base):
    __tablename__ = 'product'

    product_id = Column(Integer, primary_key=True, server_default=text("nextval('product_product_id_seq'::regclass)"))
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    name = Column(String(255), nullable=False)
    product_description = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Numeric(8, 2), nullable=False)
    sale_type = Column(String(20))

    seller = relationship('User')


class Review(Base):
    __tablename__ = 'review'

    review_id = Column(Integer, primary_key=True, server_default=text("nextval('review_review_id_seq'::regclass)"))
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    reviewer_id = Column(ForeignKey('user_.user_id'), nullable=False)
    review = Column(Integer, nullable=False)
    review_description = Column(String(255), nullable=False)

    reviewer = relationship('User', primaryjoin='Review.reviewer_id == User.user_id')
    seller = relationship('User', primaryjoin='Review.seller_id == User.user_id')


class SaleOrder(Base):
    __tablename__ = 'sale_order'

    order_id = Column(Integer, primary_key=True, server_default=text("nextval('sale_order_order_id_seq'::regclass)"))
    buyer_id = Column(ForeignKey('user_.user_id'), nullable=False)
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    order_date = Column(Date, nullable=False)
    total_price = Column(Numeric(8, 2), nullable=False)

    buyer = relationship('User', primaryjoin='SaleOrder.buyer_id == User.user_id')
    seller = relationship('User', primaryjoin='SaleOrder.seller_id == User.user_id')


class Auction(Base):
    __tablename__ = 'product'

    auction_id = Column(Integer, primary_key=True, server_default=text("nextval('auction_auction_id_seq'::regclass)"))
    product_id = Column(ForeignKey('product.product_id'), nullable=False)
    highest_bidder_id = Column(ForeignKey('user_.user_id'), nullable=False)
    current_price = Column(Numeric(8, 2), nullable=False)
    highest_bid = Column(Numeric(8, 2), nullable=False)
    minimal_bump = Column(Numeric(5, 2), nullable=False)
    end_date = Column(Date, nullable=False)

    highest_bidder = relationship('User')
    product = relationship('Product')


class OrderProduct(Base):
    __tablename__ = 'order_product'

    order_id = Column(ForeignKey('sale_order.order_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship('SaleOrder')
    product = relationship('Product')


class Photo(Base):
    __tablename__ = 'photo'

    photo_id = Column(Integer, primary_key=True, server_default=text("nextval('photo_photo_id_seq'::regclass)"))
    photo_url = Column(String(255), nullable=False)
    product_id = Column(ForeignKey('product.product_id'), nullable=False)

    product = relationship('Product')


t_product_category = Table(
    'product_category', metadata,
    Column('category_id', ForeignKey('category.category_id'), nullable=False),
    Column('product_id', ForeignKey('product.product_id'), nullable=False)
)


class QuestionAnswer(Base):
    __tablename__ = 'question_answer'

    qa_id = Column(Integer, primary_key=True, server_default=text("nextval('question_answer_qa_id_seq'::regclass)"))
    product_id = Column(ForeignKey('product.product_id'), nullable=False)
    question = Column(String(255), nullable=False)
    answer = Column(String(255), nullable=False)

    product = relationship('Product')
