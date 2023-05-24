from fastapi import HTTPException
from src.app.models import CreateEngine, QuestionAnswer, Product
from src.app.qa.schema import QuestionSchema


class QAService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_qas_product(self, product_id: int) -> dict:
        result = dict()
        Session = self.engine.create_session()

        with Session() as session:
            qas = session.query(QuestionAnswer).filter(
                QuestionAnswer.product_id == product_id
            )
            for count, qa in enumerate(qas):
                result[count] = qa.serialize()
        Session.remove()
        return result

    def get_qa(self, qa_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            qa = session.query(QuestionAnswer).get(qa_id)
            if qa is None:
                raise HTTPException(status_code=422, detail="No Q&A with given id")
            result = qa.serialize()
        Session.remove()
        return result

    def post_question(self, question: QuestionSchema) -> dict:
        Session = self.engine.create_session()

        with Session() as session:

            product = session.query(Product).get(question.product_id)
            if product is None:
                raise HTTPException(status_code=400, detail="No product with given id")

            new_question = QuestionAnswer(
                product_id=question.product_id, question=question.question, answer=""
            )
            session.add(new_question)
            session.commit()
            new_id = new_question.qa_id
        Session.remove()

        return self.get_qa(new_id)

    def put_answer(self, qa_id: int, answer: str) -> dict:
        Session = self.engine.create_session()

        with Session() as session:
            update_qa = session.query(QuestionAnswer).get(qa_id)
            if update_qa is None:
                raise HTTPException(status_code=422, detail="No Q&A with given id")
            update_qa.answer = answer
            session.commit()
        Session.remove()

        return self.get_qa(qa_id)
