from app.auth.models import UserSignUp, UserLogin
from app.models import CreateEngine, User
from app.utils import user_to_json

class AuthService:
    def __init__(self):
        self.engine = CreateEngine()
        
    def add_user(self, user: UserSignUp) -> dict:
        Session = self.engine.create_session()
        
        with Session() as session:
            new_user = User(
                role_id = user.role_id,
                address_id = user.address_id,
                username = user.username,
                email = user.email,
                password = user.password)
            session.add(new_user)
            session.commit()
            result = session.query(User).filter(User.user_id == new_user.user_id).one()
        Session.remove()
        return user_to_json(result)
    
    def check_user(self, user: UserLogin) -> bool:
        Session = self.engine.create_session()
        with Session() as session:
            try:
                user = session.query(User).filter(User.email == user.email).one()
            except:
                return False
            if user.password == user.password:
                return True
            else:
                return False