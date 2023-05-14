from fastapi import APIRouter
from app.review.service import ReviewService
from app.review.model import ReviewTs

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
    responses={404: {"description": "Not found"}},
)
review_service = ReviewService()


@router.post("/")
def create_review(review: ReviewTs) -> dict:
    return review_service.post_review(review)


@router.get("/seller/{seller_id}")
def get_reviews_seller(seller_id: int) -> dict:
    return review_service.get_reviews(seller_id, True)


@router.get("/buyer/{buyer_id}")
def get_reviews_buyer(buyer_id: int) -> dict:
    return review_service.get_reviews(buyer_id, False)
