from dotenv import load_dotenv
from fastapi import FastAPI


class MainApi:
    def __init__(self) -> None:
        self.backend_api = FastAPI()
        load_dotenv('.env')

        @self.backend_api.get("/")
        def root() -> None:
            return {"message": "Hello World"}

        @self.backend_api.get("/hello/{name}")
        def say_hello(name: str) -> None:
            return {"message": f"Hello {name}"}
