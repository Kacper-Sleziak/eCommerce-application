from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class SaleOrder(Base):
    __tablename__ = 'sale_order'

    order_id = Column(Integer, primary_key=True, server_default=text("nextval('sale_order_order_id_seq'::regclass)"))
    buyer_id = Column(ForeignKey('user_.user_id'), nullable=False)
    seller_id = Column(ForeignKey('user_.user_id'), nullable=False)
    order_date = Column(Date, nullable=False)
    total_price = Column(Numeric(8, 2), nullable=False)

    buyer = relationship('User', primaryjoin='SaleOrder.buyer_id == User.user_id')
    seller = relationship('User', primaryjoin='SaleOrder.seller_id == User.user_id')


class OrderProduct(Base):
    __tablename__ = 'order_product'

    order_id = Column(ForeignKey('sale_order.order_id'), primary_key=True, nullable=False)
    product_id = Column(ForeignKey('product.product_id'), primary_key=True, nullable=False)
    quantity = Column(Integer, nullable=False)

    order = relationship('SaleOrder')
    product = relationship('Product')
