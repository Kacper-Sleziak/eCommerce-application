from fastapi import APIRouter, File, UploadFile, Query
from app.product.service import ProductService
from app.product.schema import ProductCreateSchema, ProductParams, AuctionCreate
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
                         brand: str,
                         description: str,
                         quantity: int,
                         total_price: float,
                         categories: List[int],
                         colors: List[int],
                         photos: list[UploadFile]) -> dict:
    product = ProductCreateSchema(seller_id=seller_id,
                            name=name,
                            brand=brand,
                            description=description,
                            quantity=quantity,
                            total_price=total_price,
                            sale_type="Regular",
                            categories=categories,
                            colors=colors)
    return await product_service.create_product(product, photos)


@router.post("/auction")
def create_auction(seller_id: int,
                   name: str,
                   brand: str,
                   description: str,
                   quantity: int,
                   categories: List[int],
                   colors: List[int],
                   photos: list[UploadFile],
                   starting_price: float,
                   minimal_bump: float,
                   end_date: str
                   ) -> dict:
    product = ProductCreateSchema(seller_id=seller_id,
                            name=name,
                            brand=brand,
                            description=description,
                            quantity=quantity,
                            total_price=starting_price,
                            sale_type="Auction",
                            categories=categories,
                            colors=colors)
    auction = AuctionCreate(highest_bidder_id=seller_id,
                            starting_price=starting_price,
                            highest_bid=starting_price,
                            minimal_bump=minimal_bump,
                            end_date=end_date)
    return product_service.create_product_auction(product, auction, photos)


@router.put("/auction")
def bid_auction(product_id: int, user_id: int, bid: float) -> dict:
    return product_service.auction_bump(product_id, user_id, bid)
