from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Role(Base):
    __tablename__ = 'role'

    role_id = Column(Integer, primary_key=True, server_default=text("nextval('role_role_id_seq'::regclass)"))
    name = Column(String(255), nullable=False)


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
