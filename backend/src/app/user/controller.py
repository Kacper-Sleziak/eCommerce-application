from fastapi import APIRouter
from app.user.service import UserService
from app.user.schema import UserSchema, UserUpdateSchema

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)
user_service = UserService()

@router.get("/{user_id}")
def get_user(user_id: int) -> dict:
    # todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}


@router.put("/")
def update_user(user: UserUpdateSchema) -> dict:
    # todo: call to service
    return {"user_id": 1,
            "role_id": 2,
            "address_id": 1,
            "username": "test",
            "email": "test@tst.com"}
