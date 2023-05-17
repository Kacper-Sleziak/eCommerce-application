from pydantic import BaseModel


class QuestionSchema(BaseModel):
    product_id: int
    question: str
