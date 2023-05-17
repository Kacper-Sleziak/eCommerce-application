from pydantic import BaseModel


class UserSchema(BaseModel):
    role_id: int
    address_id: int
    username: str
    email: str
    password: str


class UserUpdateSchema(BaseModel):
    user_id: int
    role_id: int
    address_id: int
    username: str
    email: str
    password: str
