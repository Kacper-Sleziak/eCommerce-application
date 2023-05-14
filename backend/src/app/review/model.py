from pydantic import BaseModel


class ReviewTs(BaseModel):
    seller_id: int
    reviewer_id: int
    review: int
    review_description: str
