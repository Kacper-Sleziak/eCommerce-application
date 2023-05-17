from app.auth.schema import UserSignUpSchema, UserLoginSchema
from app.models import CreateEngine, User
from argon2 import PasswordHasher


class AuthService:
    def __init__(self):
        self.engine = CreateEngine()
        self.ph = PasswordHasher()

    def add_user(self, user: UserSignUpSchema) -> dict | None:
        Session = self.engine.create_session()

        with Session() as session:
            user_in_db = session.query(User).filter(User.email == user.email).first()
            result = None
            if user_in_db is None:
                new_user = User(
                    role_id=user.role_id,
                    address_id=user.address_id,
                    username=user.username,
                    email=user.email,
                    password=self.ph.hash(user.password))
                session.add(new_user)
                session.commit()
                new_user_data = session.query(User).get(new_user.user_id)
                result = new_user_data.serialize()
        Session.remove()
        return result

    def get_user_by_email(self, email: str) -> dict | None:
        Session = self.engine.create_session()
        with Session() as session:
            user = session.query(User).filter(User.email == email).first()
        Session.remove()
        result = user.serialize()
        result["password"] = user.password
        return result
