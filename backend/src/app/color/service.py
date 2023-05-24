from src.app.models import CreateEngine, Color


class ColorService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_colors(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            colors = session.query(Color).all()
            for count, color in enumerate(colors):
                result[count] = color.serialize()
        Session.remove()
        return result
