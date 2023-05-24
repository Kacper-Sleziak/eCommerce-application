from fastapi import APIRouter, HTTPException
from src.app.review.service import ReviewService
from src.app.review.schema import ReviewSchema

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
    responses={404: {"description": "Not found"}},
)
review_service = ReviewService()


@router.post("/")
def create_review(review: ReviewSchema) -> dict:
    return review_service.post_review(review)


@router.get("/seller/{seller_id}")
def get_reviews_seller(seller_id: int) -> dict:
    result = review_service.get_reviews(seller_id, True)

    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Not found")


@router.get("/buyer/{buyer_id}")
def get_reviews_buyer(buyer_id: int) -> dict:
    result = review_service.get_reviews(buyer_id, False)

    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Not found")
