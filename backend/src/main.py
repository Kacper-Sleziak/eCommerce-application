from fastapi import FastAPI

from app.product.service import ProductService

app = FastAPI()
product_service = ProductService()


@app.get("/")
async def welcome() -> dict:
    return {"message": "Hello World!"}


@app.get("/product/{query}")
def get_products_filter(query: str) -> dict:
    return product_service.get_products_filter(query)


@app.get("/product/")
def get_products_all() -> dict:
    return product_service.get_products_all()
