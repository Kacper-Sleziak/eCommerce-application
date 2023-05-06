from fastapi import APIRouter
from app.user.service import UserService
from app.user.model import User, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)
category_service = UserService()

@router.post("/register")
def register_user(user: User) -> dict:
    #todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}


@router.get("/login")
def login_user(username: str, password: str) -> dict:
    #todo: call to service
    return {"user_id": 1}


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
def update_user(user: UserUpdate) -> dict:
    #todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}