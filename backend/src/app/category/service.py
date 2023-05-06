from app.models import CreateEngine, Category
from app.utils import category_to_json
from sqlalchemy.dialects import postgresql


class CategoryService:
    def __init__(self):
        self.engine = CreateEngine()
        
    def get_categories(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            categories = session.query(Category).all()
            for category in categories:
                result[count] = category_to_json(category)
                count += 1
        Session.remove()
        return result