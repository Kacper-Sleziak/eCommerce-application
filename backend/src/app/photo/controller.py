from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List
import os

router = APIRouter(
    prefix="/photos",
    tags=["Photos"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def get_photo(path: str) -> dict:
    return FileResponse(path)