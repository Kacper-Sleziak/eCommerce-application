from fastapi import APIRouter
from app.chat.service import ChatService
from app.chat.schema import ChatMessageSchema

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
    responses={404: {"description": "Not found"}},
)
chat_service = ChatService()


@router.post("/")
def post_message(
        message: str,
        first_user_id: int,
        second_user_id: int,
        user_id: int
) -> dict:
    chat_message = ChatMessageSchema(
        message=message,
        first_user_id=first_user_id,
        second_user_id=second_user_id,
        user_id=user_id,
    )
    return chat_service.post_message(chat_message)


@router.get("/{user_id}")
def get_chats(
        user_id: int
) -> dict:
    return chat_service.get_chats(user_id)


@router.get("/")
def get_chat(
        user_id: int,
        chat_id: int
) -> dict:
    return chat_service.get_chat(user_id, chat_id)


@router.put("/")
def block_chat(
        chat_id: int
) -> dict:
    return chat_service.block_chat(chat_id)
