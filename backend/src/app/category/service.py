from app.models import CreateEngine, Category
from app.utils import category_to_json
from sqlalchemy.dialects import postgresql


class CategoryService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_categories(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            categories = session.query(Category).all()
            for count, category in enumerate(categories):
                result[count] = category_to_json(category)
        Session.remove()
        return result
