from pydantic import BaseModel

class User(BaseModel):
    role_id: int
    address_id: int
    username: str
    email: str
    password: str


class UserUpdate(BaseModel):
    user_id: int
    role_id: int
    address_id: int
    username: str
    email: str
    password: str