import logging
import time
import traceback
from threading import Thread

import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv


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


def run_fastapi_thread(api: FastAPI) -> None:
    while True:
        try:
            time.sleep(1)
            uvicorn.run(api, host="0.0.0.0", port=9999)
        except Exception:
            logging.critical("Fast API exception %s", traceback.format_exc())


def run_fast_api() -> MainApi:
    api = MainApi()

    fast_api_thread = Thread(
        name="Fast API thread",
        target=run_fastapi_thread,
        args=(api.backend_api,)
    )

    fast_api_thread.start()

    return api


if __name__ == "__main__":
    run_fast_api()
