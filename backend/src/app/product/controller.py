from fastapi import APIRouter, File, UploadFile, Query
from app.product.service import ProductService
from app.product.schema import ProductCreateSchema, ProductParams
from typing import List, Annotated

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    responses={404: {"description": "Not found"}},
)
product_service = ProductService()


@router.get("/")
def get_products_filter(search: str | None = None,
                        quantity: int | None = None,
                        category: Annotated[list[int] | None, Query()] = None,
                        brand: Annotated[list[str] | None, Query()] = None,
                        color: Annotated[list[str] | None, Query()] = None,
                        price: int | None = None,
                        order: str | None = None,
                        order_by: str | None = None,
                        page: int | None = None,
                        limit: int | None = None,
                        auction: bool | None = None,
                        auction_active: bool | None = None) -> dict:

    params = ProductParams(
        search=search,
        quantity=quantity,
        categories=category,
        brands=brand,
        colors=color,
        price=price,
        order=order,
        order_by=order_by,
        page=page,
        limit=limit,
        auction=auction,
        auction_active=auction_active
    )
    if params.has_data():
        return product_service.get_products_filter(params)
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
    product = ProductCreateSchema(seller_id=seller_id,
                                  name=name,
                                  description=description,
                                  quantity=quantity,
                                  total_price=total_price,
                                  sale_type=sale_type,
                                  categories=categories)
    return await product_service.create_product(product, photos)
