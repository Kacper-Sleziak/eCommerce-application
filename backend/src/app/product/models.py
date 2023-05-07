from pydantic import BaseModel
from typing import List

class ProductCreate(BaseModel):
    seller_id: int
    name: str
    description: str
    quantity: int
    total_price: float
    sale_type: str
    categories: List[int]