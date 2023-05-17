from pydantic import BaseModel


class ReviewSchema(BaseModel):
    seller_id: int
    reviewer_id: int
    review: int
    review_description: str
