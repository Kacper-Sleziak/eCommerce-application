from fastapi import FastAPI

from app.product.service import ProductService

app = FastAPI()
product_service = ProductService()


@app.get("/")
async def welcome() -> dict:
    return {"message": "Hello World!"}


@app.get("/products/{query}")
def get_products_filter(query: str) -> dict:
    return product_service.get_products_filter(query)


@app.get("/products/")
def get_products_all() -> dict:
    return product_service.get_products_all()


@app.get("/product/{product_id}")
def get_product_id(product_id: int) -> dict:
    return product_service.get_product(product_id)


@app.get("/categories")
def get_categories() -> dict:
    return product_service.get_categories()
