from fastapi import APIRouter
from app.review.service import ReviewService
from app.review.model import Review

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
    responses={404: {"description": "Not found"}},
)
review_service = ReviewService()

@router.post("/")
def create_review(review: Review) -> dict:
    #todo: call to service
    return {
        "review_id": 1,
        "seller_id": 1,
        "reviewer_id": 1,
        "review": 3,
        "review_description": "test"
    }


@router.get("/")
def get_reviews_all() -> dict:
    return {}

@router.get("/logout")
def logout_user() -> dict:
    #todo: call to service
    return {"message": "User logged out"}


@router.get("/{user_id}")
def get_user(user_id: int) -> dict:
    #todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}


@router.put("/")
def update_user(user: Review) -> dict:
    #todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}