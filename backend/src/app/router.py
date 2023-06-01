from fastapi import APIRouter
from app.product.controller import router as product_router
from app.category.controller import router as category_router
from app.user.controller import router as user_router
from app.review.controller import router as review_router
from app.qa.controller import router as qa_router
from app.brand.controller import router as brand_router
from app.color.controller import router as color_router
from app.auth.controller import router as auth_router
from app.address.controller import router as address_router
from app.chat.controller import router as chat_router

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
router.include_router(chat_router)
