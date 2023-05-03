from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router as api_router


app = FastAPI()
origins = ["http://localhost:8000"]

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



