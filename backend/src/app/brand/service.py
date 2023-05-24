from src.app.models import CreateEngine, Product


class BrandService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_brands(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        with Session() as session:
            brands = session.query(Product.brand).distinct(Product.brand)
            for count, brand in enumerate(brands):
                result[count] = brand
        Session.remove()
        return result
