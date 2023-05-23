from src.app.models import CreateEngine, Chat


class ChatService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_colors(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            colors = session.query(Chat).all()
            for count, color in enumerate(colors):
                result[count] = color.serialize()
        Session.remove()
        return result
