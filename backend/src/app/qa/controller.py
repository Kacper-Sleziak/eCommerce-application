from fastapi import APIRouter, HTTPException
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
    result = qa_service.get_qas_product(product_id)

    if result:
        return result
    else:
        raise HTTPException(status_code=404, detail="Not found")


@router.put("/{qa_id}")
def put_answer(qa_id: int, answer: str) -> dict:
    return qa_service.put_answer(qa_id, answer)
