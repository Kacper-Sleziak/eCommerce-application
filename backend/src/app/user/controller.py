from fastapi import APIRouter, Depends, Request
from app.user.service import UserService
from app.user.schema import UserSchema, UserUpdateSchema
from app.auth.utils import JwtUserBearer
from app.auth.service import AuthService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)
user_service = UserService()
auth_service = AuthService()

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


@router.get("/me", dependencies=[Depends(JwtUserBearer)])
def get_user_me(request: Request) -> dict:
    user_id = request.token_payload.get("user_id")
    user = user_service.get_user_by_id(user_id)
    return user