class ProductParams:

    def __init__(
            self,
            search: str | None,
            quantity: int | None,
            categories: list[int] | None,
            brands: list[str] | None,
            colors: list[str] | None,
            price: int | None,
            order: str | None,
            order_by: str | None,
            page: int | None,
            limit: int | None
    ):
        self.search: str = search
        self.quantity: int = quantity
        self.categories: list[int] = categories
        self.brands: list[str] = brands
        self.colors: list[str] = colors
        self.price: int = price
        self.order: str = order if order is not None else "ASC"
        self.order_by: str = order_by if order_by is not None else "product_id"
        if self.order_by == "price":
            self.order_by = "total_price"
        self.page: int = page if page is not None else 0
        self.limit: int = limit if limit is not None else 20

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

    def has_data(self) -> bool:
        return (self.has_search() or self.has_quantity()
                or self.has_categories() or self.has_brands()
                or self.has_colors() or self.has_price())
