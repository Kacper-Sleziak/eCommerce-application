from fastapi import APIRouter
from src.app.color.service import ColorService

router = APIRouter(
    prefix="/colors",
    tags=["Colors"],
    responses={404: {"description": "Not found"}},
)
color_service = ColorService()


@router.get("/")
def get_colors() -> dict:
    return color_service.get_colors()
