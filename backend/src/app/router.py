from fastapi import APIRouter
from src.app.product.controller import router as product_router
from src.app.category.controller import router as category_router
from src.app.user.controller import router as user_router
from src.app.review.controller import router as review_router
from src.app.qa.controller import router as qa_router
from src.app.brand.controller import router as brand_router
from src.app.color.controller import router as color_router
from src.app.auth.controller import router as auth_router
from src.app.address.controller import router as address_router

router = APIRouter()
router.include_router(product_router)
router.include_router(category_router)
router.include_router(user_router)
router.include_router(review_router)
router.include_router(qa_router)
router.include_router(brand_router)
router.include_router(color_router)
router.include_router(auth_router)
router.include_router(address_router)
