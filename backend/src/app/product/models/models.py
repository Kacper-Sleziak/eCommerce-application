from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Category(Base):
    __tablename__ = 'category'

    category_id = Column(Integer, primary_key=True,
                         server_default=text("nextval('category_category_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)

    products = relationship('Product', secondary='product_category')


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


class QuestionAnswer(Base):
    __tablename__ = 'question_answer'

    qa_id = Column(Integer, primary_key=True, server_default=text("nextval('question_answer_qa_id_seq'::regclass)"))
    product_id = Column(ForeignKey('product.product_id'), nullable=False)
    question = Column(String(255), nullable=False)
    answer = Column(String(255), nullable=False)

    product = relationship('Product')


class Photo(Base):
    __tablename__ = 'photo'

    photo_id = Column(Integer, primary_key=True, server_default=text("nextval('photo_photo_id_seq'::regclass)"))
    photo_url = Column(String(255), nullable=False)
    product_id = Column(ForeignKey('product.product_id'), nullable=False)

    product = relationship('Product')


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


class ProductCategory(Base):
    __tablename__ = 'product_category'

    category_id = Column(ForeignKey('category.category_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)

    category = relationship('Category')
    product = relationship('Product')
