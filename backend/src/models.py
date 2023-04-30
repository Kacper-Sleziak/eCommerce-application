# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


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




