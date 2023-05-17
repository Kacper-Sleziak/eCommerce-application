from pydantic import BaseModel, EmailStr


class UserSignUpSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    role_id: int
    address_id: int


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
