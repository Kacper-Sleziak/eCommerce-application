from fastapi import APIRouter, HTTPException
from app.auth.service import AuthService
from app.auth.models import UserSignUp, UserLogin
from app.auth.utils import sign_JWT
from argon2 import PasswordHasher

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses={404: {"description": "Not found"}},
)
auth_service = AuthService()
ph = PasswordHasher()

@router.post("/signup")
def signup(user: UserSignUp) -> dict:
    user = auth_service.add_user(user)
    if user:
        return sign_JWT(user["email"], user["role"])
    raise HTTPException(status_code=400, detail="User already exists")

@router.post("/login")
def login(userCredentials: UserLogin) -> dict:
    try:
        user = auth_service.get_user_by_email(userCredentials.email)
    except:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    try:
        if ph.verify(user["password"], userCredentials.password):
            return sign_JWT(user["email"], user["role"])
    except:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    raise HTTPException(status_code=400, detail="Invalid credentials")
