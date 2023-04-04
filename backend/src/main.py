import logging
import time
import traceback
from threading import Thread

import uvicorn
from fastapi import FastAPI
from api.main_api import MainApi


def run_fastapi_thread(api: FastAPI) -> None:
    while True:
        try:
            time.sleep(1)
            uvicorn.run(api, host="0.0.0.0", port=9999)
        except Exception:
            logging.critical("Fast API exception %s", traceback.format_exc())


def run_fast_api() -> None:
    api = MainApi()

    fast_api_thread = Thread(
        name="Fast API thread", target=run_fastapi_thread, args=(api.backend_api,)
    )

    fast_api_thread.start()


if __name__ == "__main__":
    run_fast_api()
    print("Successfully running")
