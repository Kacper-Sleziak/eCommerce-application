from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.router import router as api_router
from app.auth.utils import jwtAdminBearer, jwtUserBearer, jwtBearer

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

@app.get("/adminTest", dependencies=[Depends(jwtAdminBearer())])
async def welcome_admin() -> dict:
    return {"message": "You are admin!"}


@app.get("/userTest", dependencies=[Depends(jwtUserBearer())])
async def welcome_user() -> dict:
    return {"message": "You are user!"}


@app.get("/bothTest", dependencies=[Depends(jwtBearer())])
async def welcome_both() -> dict:
    return {"message": "You are admin or user!"}



