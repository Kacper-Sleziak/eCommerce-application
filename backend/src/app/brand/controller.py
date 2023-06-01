from fastapi import APIRouter
from app.brand.service import BrandService

router = APIRouter(
    prefix="/brands",
    tags=["Brands"],
    responses={404: {"description": "Not found"}},
)
brand_service = BrandService()


@router.get("/")
def get_brands() -> dict:
    return brand_service.get_brands()
