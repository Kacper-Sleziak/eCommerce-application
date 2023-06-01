import datetime

from app.models import CreateEngine, Chat, ChatMessage, User
from app.chat.schema import ChatMessageSchema
from fastapi import HTTPException
from sqlalchemy import or_, and_


class ChatService:
    def __init__(self):
        self.engine = CreateEngine()

    def post_message(self, chat_message: ChatMessageSchema) -> dict:
        Session = self.engine.create_session()

        with Session() as session:

            first_user = session.query(User).get(chat_message.first_user_id)
            if first_user is None:
                raise HTTPException(status_code=422, detail="No first_user with given id")
            second_user = session.query(User).get(chat_message.second_user_id)
            if second_user is None:
                raise HTTPException(status_code=422, detail="No second_user with given id")
            user = session.query(User).get(chat_message.user_id)
            if user is None:
                raise HTTPException(status_code=422, detail="No user with given id")

            chat = session.query(Chat).filter(and_(Chat.first_user_id == chat_message.first_user_id,
                                                   Chat.second_user_id == chat_message.second_user_id)).first()
            if chat is None:
                new_chat = Chat(
                    first_user_id=chat_message.first_user_id,
                    second_user_id=chat_message.second_user_id,
                    blocked=False
                )
                session.add(new_chat)
                session.commit()
                chat_id = new_chat.chat_id
            else:
                if chat.blocked:
                    raise HTTPException(status_code=404, detail="Chat is blocked")
                chat_id = chat.chat_id

            new_message = ChatMessage(
                chat_id=chat_id,
                user_id=chat_message.user_id,
                time=datetime.datetime.now(),
                seen=False,
                message=chat_message.message
            )
            session.add(new_message)
            session.commit()
            result = new_message.serialize()
        Session.remove()

        return result

    def get_chats(self, user_id: int) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            chats = session.query(Chat).filter(or_(Chat.first_user_id == user_id, Chat.second_user_id == user_id)).all()
            for count, chat in enumerate(chats):
                result[count] = chat.serialize()
        Session.remove()
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="Not found")

    def get_chat(self, user_id: int, chat_id: int) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:

            chat = session.query(Chat).get(chat_id)
            if chat is None:
                raise HTTPException(status_code=422, detail="No chat with given id")
            user = session.query(User).get(user_id)
            if user is None:
                raise HTTPException(status_code=422, detail="No user with given id")

            messages_read = session.query(ChatMessage).filter(
                and_(ChatMessage.chat_id == chat_id, ChatMessage.user_id != user_id)).all()
            for message_read in messages_read:
                message_read.seen = True
            session.commit()

            messages = session.query(ChatMessage).filter(ChatMessage.chat_id == chat_id).all()
            for count, message in enumerate(messages):
                result[count] = message.serialize()
        Session.remove()
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="Not found")

    def block_chat(self, chat_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            chat = session.query(Chat).get(chat_id)
            if chat is None:
                raise HTTPException(status_code=422, detail="No chat with given id")
            else:
                chat.blocked = not chat.blocked
                session.commit()
                result = chat.serialize()
        Session.remove()
        return result
