from fastapi import APIRouter
from app.address.service import AddressService
from app.address.schema import CreateAddressSchema
from app.models import Address

router = APIRouter(
    prefix="/addresses",
    tags=["Addresses"],
    responses={404: {"description": "Not found"}},
)
address_service = AddressService()


@router.post("/")
def create_address(address: CreateAddressSchema) -> dict:
    return address_service.add_address(address)


@router.get("/")
def get_addresses() -> dict:
    return address_service.get_addresses()


@router.get("/{address_id}")
def get_address(address_id: int) -> dict:
    return address_service.get_address(address_id)
