from fastapi import APIRouter, File, UploadFile
from app.product.service import ProductService
from app.product.models import ProductCreate
from typing import List

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    responses={404: {"description": "Not found"}},
)
product_service = ProductService()

@router.get("")
def get_products_filter(params: str = "") -> dict:
    if params:
        return product_service.get_products_filter(params)
    return product_service.get_products_all()

@router.get("/{product_id}")
def get_product_id(product_id: int) -> dict:
    return product_service.get_product(product_id)


@router.post("/")
def create_product(product: ProductCreate) -> dict:
    return product_service.create_product(product)
