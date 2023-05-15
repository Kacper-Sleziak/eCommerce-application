from fastapi import APIRouter
from app.auth.service import AuthService
from app.auth.models import UserSignUp, UserLogin
from app.auth.utils import sign_JWT


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not found"}},
)
auth_service = AuthService()

@router.post("/signup")
def signup(user: UserSignUp) -> dict:
    user = auth_service.add_user(user)
    return sign_JWT(user["email"])


@router.post("/login")
def login(user: UserLogin) -> dict:
    if auth_service.check_user(user):
        return sign_JWT(user.email)
    return {"message": "Invalid credentials"}

@router.post("/refresh_token")

@router.post("/logout")
def logout_user() -> dict:
    #todo: call to service
    return {"message": "User logged out"}
