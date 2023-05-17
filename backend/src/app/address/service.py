from sqlalchemy.dialects import postgresql
from app.address.models import CreateAddress
from app.models import CreateEngine, Address
from app.utils import address_to_json


class AddressService:
    def __init__(self):
        self.engine = CreateEngine()

    def add_address(self, address: CreateAddress) -> dict:
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
            result = session.query(Address).filter(Address.address_id == new_address.address_id).one()
        Session.remove()
        return address_to_json(result)

    def get_address(self, address_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            address = session.query(Address).filter(Address.address_id == address_id).one()
        Session.remove()
        return address_to_json(address)

    def get_addresses(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            addresses = session.query(Address).all()
            for i, address in enumerate(addresses):
                result[i] = address_to_json(address)
        Session.remove()
        return result
