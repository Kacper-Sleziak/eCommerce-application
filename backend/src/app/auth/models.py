from pydantic import BaseModel, EmailStr

class UserSignUp(BaseModel):
    username: str
    email: EmailStr
    password: str
    role_id: int
    address_id: int


class UserLogin(BaseModel):
    email: EmailStr
    password: str
