from fastapi import HTTPException
from app.address.schema import CreateAddressSchema
from app.models import CreateEngine, Address


class AddressService:
    def __init__(self):
        self.engine = CreateEngine()

    def add_address(self, address: CreateAddressSchema) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            new_address = Address(
                country=address.country,
                region=address.region,
                city=address.city,
                postal_code=address.postal_code,
                street=address.street,
                building=address.building,
                flat=address.flat,
                latitude=address.latitude,
                longitude=address.longitude)
            session.add(new_address)
            session.commit()
            result = session.query(Address).get(new_address.address_id)
        Session.remove()
        return result.serialize()

    def get_address(self, address_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            address = session.query(Address).get(address_id)
            if address is None:
                raise HTTPException(status_code=422, detail="No address with given id")
        Session.remove()
        return address.serialize()

    def get_addresses(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            addresses = session.query(Address).all()
            for i, address in enumerate(addresses):
                result[i] = address.serialize()
        Session.remove()
        return result
