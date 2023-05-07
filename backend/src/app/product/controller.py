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

@router.get("/{query}")
def get_products_filter(query: str) -> dict:
    return product_service.get_products_filter(query)


@router.get("/")
def get_products_all() -> dict:
    return product_service.get_products_all()


@router.get("/{product_id}")
def get_product_id(product_id: int) -> dict:
    return product_service.get_product(product_id)


@router.post("/")
async def create_product(seller_id: int,
                            name: str,
                            description: str,
                            quantity: int,
                            total_price: float,
                            sale_type: str,
                            categories: List[int],
                            photos: list[UploadFile]) -> dict:
    product = ProductCreate(seller_id=seller_id,
                            name=name,
                            description=description,
                            quantity=quantity,
                            total_price=total_price,
                            sale_type=sale_type,
                            categories=categories)
    return await product_service.create_product(product, photos)

@router.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}