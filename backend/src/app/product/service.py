from app.models import CreateEngine, Product, ProductCategory, Category, Photo
from app.utils import query_to_dict, product_to_json, category_to_json
from sqlalchemy import or_, and_


class ProductService:

    def __init__(self):
        self.engine = CreateEngine()

    def get_products_filter(self, query: str) -> dict:
        result = dict()
        params = query_to_dict(query)
        Session = self.engine.create_session()
        count = 0

        with Session() as session:
            filters = list()
            if "search" in params:
                filters.append(Product.name.like("%{}%".format(params["search"][0])))
            if "price" in params:
                filters.append(Product.total_price < params["price"][0])
            if "quantity" in params:
                filters.append(Product.quantity > params["quantity"][0])
            if "category" in params:
                categories = list()
                for category in params["category"]:
                    categories.append(ProductCategory.category_id == category)
                filters.append(or_(*categories))
            statement = session.query(Product).filter(and_(*filters))
            print(str(statement))
            products = statement.all()
            for product in products:
                categories = self.get_product_categories(product.product_id)
                photo = self.get_product_photo(product.product_id)
                result[count] = product_to_json(product, categories, photo)
                count += 1
        Session.remove()
        return result

    def get_products_all(self) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            products = session.query(Product).all()
            for product in products:
                categories = self.get_product_categories(product.product_id)
                photo = self.get_product_photo(product.product_id)
                result[count] = product_to_json(product, categories, photo)
                count += 1
        Session.remove()
        return result

    def get_product_categories(self, product_id) -> dict:
        result = dict()
        Session = self.engine.create_session()
        count = 0
        with Session() as session:
            categories = session.query(Category).join(ProductCategory).filter(ProductCategory.product_id == product_id).all()
            for category in categories:
                result[count] = category_to_json(category)
                count += 1
        Session.remove()
        return result

    def get_product_photo(self, product_id) -> str:
        result = ""
        Session = self.engine.create_session()
        with Session() as session:
            photo = session.query(Photo).filter(Photo.product_id == product_id).one()
            result = photo.photo_url
        Session.remove()
        return result
