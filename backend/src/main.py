from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import router as api_router

from app.product.service import ProductService

app = FastAPI()
origins = ["http://localhost:8000"]
product_service = ProductService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

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
