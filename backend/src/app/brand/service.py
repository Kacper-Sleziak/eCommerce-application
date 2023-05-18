from app.models import CreateEngine, Product
from sqlalchemy.dialects import postgresql


class BrandService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_brands(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            brands = session.query(Product.brand).distinct(Product.brand)
            for brand in brands:
                result[count] = brand
                count += 1
        Session.remove()
        return result
