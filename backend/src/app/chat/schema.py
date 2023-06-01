from pydantic import BaseModel


class ChatMessageSchema(BaseModel):
    message: str
    first_user_id: int
    second_user_id: int
    user_id: int
