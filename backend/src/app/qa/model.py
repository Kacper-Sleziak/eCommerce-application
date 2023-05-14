from pydantic import BaseModel


class QuestionTs(BaseModel):
    product_id: int
    question: str
