from dotenv import load_dotenv
from fastapi import FastAPI
import psycopg2


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

        @self.backend_api.get("/database")
        def show_database() -> None:
            print("Start")
            conn = psycopg2.connect(database="leasing_shop",
                                    host="sql",
                                    user="postgres",
                                    password="postgres",
                                    port="5432")
            database = "database"
            return {"database": database}

