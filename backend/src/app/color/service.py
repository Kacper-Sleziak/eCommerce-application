from app.models import CreateEngine, Color
from app.utils import color_to_json
from sqlalchemy.dialects import postgresql


class ColorService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_colors(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            colors = session.query(Color).all()
            for color in colors:
                result[count] = color_to_json(color)
                count += 1
        Session.remove()
        return result
