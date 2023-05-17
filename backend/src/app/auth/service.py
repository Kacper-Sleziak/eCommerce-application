from app.auth.schema import UserSignUpSchema, UserLoginSchema
from app.models import CreateEngine, User
from app.utils import user_to_json
from argon2 import PasswordHasher


class AuthService:
    def __init__(self):
        self.engine = CreateEngine()
        self.ph = PasswordHasher()

    def add_user(self, user: UserSignUpSchema) -> dict:
        Session = self.engine.create_session()

        with Session() as session:
            try:
                user = session.query(User).filter(User.email == user.email).one()
                result = None
            except:
                new_user = User(
                    role_id=user.role_id,
                    address_id=user.address_id,
                    username=user.username,
                    email=user.email,
                    password=self.ph.hash(user.password))
                session.add(new_user)
                session.commit()
                result = user_to_json(session.query(User).filter(User.user_id == new_user.user_id).one())
        Session.remove()
        return result

    def get_user_by_email(self, email: str) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            user = session.query(User).filter(User.email == email).one()
        Session.remove()
        return user_to_json(user)
