from fastapi import APIRouter
from controllers import users_controller as user

router = APIRouter()
router.include_router(user.router)