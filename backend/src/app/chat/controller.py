from fastapi import APIRouter
from src.app.chat.service import ChatService
from src.app.chat.schema import ChatMessageSchema

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
    responses={404: {"description": "Not found"}},
)
chat_service = ChatService()


@router.post("/")
def post_message(
        message: str,
        seller_id: int,
        buyer_id: int,
        seller: bool
) -> dict:
    chat_message = ChatMessageSchema(
        message=message,
        seller_id=seller_id,
        buyer_id=buyer_id,
        seller=seller,
    )
    return chat_service.post_message(chat_message)
