from app.models import CreateEngine
from sqlalchemy.dialects import postgresql


class UserService:
    def __init__(self):
        self.engine = CreateEngine()
        