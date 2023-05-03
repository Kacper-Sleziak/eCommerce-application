from fastapi import APIRouter
from app.product.controller import router as product_router
from app.category.controller import router as category_router
from app.user.controller import router as user_router

router = APIRouter()
router.include_router(product_router)
router.include_router(category_router)
router.include_router(user_router)