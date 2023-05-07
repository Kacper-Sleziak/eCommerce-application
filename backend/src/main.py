from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router as api_router

app = FastAPI()
origins = ["http://146.59.95.181:8080",
           "http://146.59.95.181:8080", 
           "https://146.59.95.181:8081",
           "https://vps-7bcd8bcd.vps.ovh.net:8081" 
           ]


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



