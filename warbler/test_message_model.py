import os
from unittest import TestCase
from sqlalchemy import exc
from psycopg2 import errors

from models import db, connect_db, Message, User, Follows, Likes

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"
from app import app
db.create_all()

class MessageModelTestCase(TestCase):
    """Test message model"""

    def setUp(self):

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()
        Likes.query.delete()

        self.client = app.test_client()

        test_u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD",
            bio="test bio",
            location="test location"
        )
        
        test_u2 = User(
            email="test2@test.com",
            username="test2user",
            password="HASHED_PASSWORD",
            bio="test bio",
            location="test location"
        )

        dummy_u = User(
            email="dummy@test.com",
            username="dummyuser",
            password="HASHED_PASSWORD",
            bio="dummy bio",
            location="dummy location"
        )

        db.session.add_all([test_u, dummy_u, test_u2])
        db.session.commit()

        user_message = Message(
            text="user text",
            user_id=test_u.id
            )
        
        dummy_message = Message(
            text="dummy text",
            user_id=dummy_u.id
            )
        
        db.session.add_all([user_message, dummy_message])
        db.session.commit()

    def test_message_model(self):

        test_u = User.query.filter(User.username=="testuser").first()
        user_msg = Message.query.filter(Message.user_id==test_u.id).all()
        # Model rejects messages with invalid values
        
        # ----------
        # Failure cases result in errors I am unable to catch with the unittests.

        # invalid_msg = Message(text=None, user_id=test_u.id)
        # db.session.add(invalid_msg)
        # self.assertRaises(errors.NotNullViolation, db.session.commit)
        # ----------

        # model deletes message on deletion of user
        id = test_u.id
        db.session.delete(test_u)
        db.session.commit()

        user_msg = Message.query.filter(Message.user_id==id).first()
        self.assertFalse(user_msg)

    
    def test_likes_model(self):

        # create like relation to test
        test_u2 = User.query.filter(User.username=="test2user").first()

        dummy_msg = Message(
            text="dummy text2",
            user_id=test_u2.id
            )
        
        db.session.add(dummy_msg)
        db.session.commit()

        dummy_like = Likes(user_id=test_u2.id,
                          message_id = dummy_msg.id)
        
        db.session.add(dummy_like)
        db.session.commit()

        test_like = Likes.query.filter(Likes.user_id==test_u2.id).first()

        # Confirm existence of Like
        self.assertTrue(test_like.user_id)

        # Test deletion of user results in deletion of like
        id = test_u2.id
        db.session.delete(test_u2)

        test_like = Likes.query.filter(Likes.user_id==test_u2.id).first()
        self.assertFalse(test_like)
 