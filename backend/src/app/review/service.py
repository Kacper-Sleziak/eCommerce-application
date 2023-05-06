from app.models import CreateEngine
from sqlalchemy.dialects import postgresql


class ReviewService:
    def __init__(self):
        self.engine = CreateEngine()
        