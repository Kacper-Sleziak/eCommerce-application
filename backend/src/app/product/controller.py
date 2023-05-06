from fastapi import APIRouter
from app.product.service import ProductService

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    responses={404: {"description": "Not found"}},
)
product_service = ProductService()

@router.get("/{query}")
def get_products_filter(query: str) -> dict:
    return product_service.get_products_filter(query)


@router.get("/")
def get_products_all() -> dict:
    return product_service.get_products_all()


@router.get("/{product_id}")
def get_product_id(product_id: int) -> dict:
    return product_service.get_product(product_id)
