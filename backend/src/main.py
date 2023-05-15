from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.router import router as api_router
from app.auth.utils import jwtAdminBearer

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/", dependencies=[Depends(jwtAdminBearer())])
async def welcome() -> dict:
    return {"message": "Hello World!"}



