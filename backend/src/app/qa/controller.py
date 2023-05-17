from fastapi import APIRouter
from app.qa.service import QAService
from app.qa.schema import QuestionSchema

router = APIRouter(
    prefix="/qa",
    tags=["Q&A"],
    responses={404: {"description": "Not found"}},
)
qa_service = QAService()


@router.post("/")
def create_question(qa: QuestionSchema) -> dict:
    return qa_service.post_question(qa)


@router.get("/{product_id}")
def get_qas_product(product_id: int) -> dict:
    return qa_service.get_qas_product(product_id)


@router.put("/{qa_id}")
def put_answer(qa_id: int, answer: str) -> dict:
    return qa_service.put_answer(qa_id, answer)
