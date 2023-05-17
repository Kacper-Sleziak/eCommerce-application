from app.models import CreateEngine, Review
from sqlalchemy.dialects import postgresql
from app.review.schema import ReviewSchema


class ReviewService:
    def __init__(self):
        self.engine = CreateEngine()

    def get_reviews(self, user_id: int, for_seller: bool) -> dict:
        result = dict()
        Session = self.engine.create_session()

        with Session() as session:
            reviews = session.query(Review).filter(Review.seller_id == user_id) if for_seller \
                else session.query(Review).filter(Review.reviewer_id == user_id)
            for count, review in enumerate(reviews):
                result[count] = review.serialize()
        Session.remove()
        return result

    def get_review(self, review_id: int) -> dict:
        Session = self.engine.create_session()
        with Session() as session:
            review = session.query(Review).get(review_id)
            result = review.serialize()
        Session.remove()
        return result

    def post_review(self, review: ReviewSchema) -> dict:
        Session = self.engine.create_session()

        with Session() as session:
            new_review = Review(
                seller_id=review.seller_id,
                reviewer_id=review.reviewer_id,
                review=review.review,
                review_description=review.review_description
            )
            session.add(new_review)
            session.commit()
            new_id = new_review.review_id
        Session.remove()

        return self.get_review(new_id)
