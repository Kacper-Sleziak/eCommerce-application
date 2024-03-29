from pydantic import BaseModel
from typing import List
from datetime import date


class ProductCreateSchema(BaseModel):
    seller_id: int
    name: str
    brand: str
    description: str
    quantity: int
    total_price: float
    sale_type: str
    categories: List[str]
    colors: List[str]
    photos: List[str]


class AuctionCreateSchema(BaseModel):
    highest_bidder_id: int
    starting_price: float
    highest_bid: float
    minimal_bump: float
    end_date: date


class ProductParams:

    def __init__(
            self,
            search: str | None,
            quantity: int | None,
            categories: list[str] | None,
            brands: list[str] | None,
            colors: list[str] | None,
            price: int | None,
            order: str | None,
            order_by: str | None,
            page: int | None,
            limit: int | None,
            auction: bool | None,
            auction_active: bool | None
    ):
        self.search: str = search
        self.quantity: int = quantity
        self.categories: list[str] = categories
        self.brands: list[str] = brands
        self.colors: list[str] = colors
        self.price: int = price
        self.order: str = order.upper() if order is not None else "ASC"
        if self.order != "ASC" and self.order != "DESC":
            self.order = "ASC"
        self.order_by: str = order_by if order_by is not None else "product_id"
        if self.order_by == "price":
            self.order_by = "total_price"
        self.order_by = "Product." + self.order_by
        self.page: int = page - 1 if page is not None else 0
        self.limit: int = limit if limit is not None else 20
        self.auction: bool = auction
        self.auction_active: bool = auction_active

    def has_search(self) -> bool:
        return self.search is not None

    def has_quantity(self) -> bool:
        return self.quantity is not None

    def has_categories(self) -> bool:
        return self.categories is not None

    def has_brands(self) -> bool:
        return self.brands is not None

    def has_colors(self) -> bool:
        return self.colors is not None

    def has_price(self) -> bool:
        return self.price is not None

    def has_auction(self) -> bool:
        return self.auction is not None

    def has_auction_active(self) -> bool:
        return self.auction_active is not None

    def has_data(self) -> bool:
        return (self.page != 0
                or self.limit != 20
                or self.order_by != "Product.product_id"
                or self.order != "ASC"
                or self.has_search()
                or self.has_quantity()
                or self.has_categories()
                or self.has_brands()
                or self.has_colors()
                or self.has_price()
                or self.has_auction()
                or self.has_auction_active())

class BuyProductSchema(BaseModel):
    product_id: int
    quantity: int
