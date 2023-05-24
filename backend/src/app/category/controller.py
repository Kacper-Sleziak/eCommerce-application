from fastapi import APIRouter
from src.app.category.service import CategoryService

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
    responses={404: {"description": "Not found"}},
)
category_service = CategoryService()


@router.get("/")
def get_categories() -> dict:
    return category_service.get_categories()
