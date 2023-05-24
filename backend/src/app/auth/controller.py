from fastapi import APIRouter, HTTPException
from src.app.auth.service import AuthService
from src.app.auth.schema import UserSignUpSchema, UserLoginSchema
from src.app.auth.utils import sign_jwt
from argon2 import PasswordHasher

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not found"}},
)
auth_service = AuthService()
ph = PasswordHasher()


@router.post("/signup")
def signup(user: UserSignUpSchema) -> dict:
    user = auth_service.add_user(user)
    if user is not None:
        return sign_jwt(user["email"], user["role"])
    else:
        raise HTTPException(status_code=400, detail="User already exists")


@router.post("/login")
def login(user_credentials: UserLoginSchema) -> dict:
    user = auth_service.get_user_by_email(user_credentials.email)
    if user is not None:
        if ph.verify(user["password"], user_credentials.password):
            return sign_jwt(user["email"], user["role"])
    raise HTTPException(status_code=400, detail="Invalid credentials")
