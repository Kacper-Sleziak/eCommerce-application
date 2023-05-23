from pydantic import BaseModel


class ChatMessageSchema(BaseModel):
    message: str
    seller_id: int
    buyer_id: int
    seller: bool
