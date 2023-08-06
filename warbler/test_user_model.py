"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase

from models import db, User, Message, Follows


# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test User model."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD",
            bio="test bio",
            location="test location"
        )

        db.session.add(u)
        db.session.commit()

    def test_user_model(self):
        """Does basic model work?"""

        u = User.query.filter(User.username=="testuser").first()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)

        # Test defaults are added
        self.assertEqual(u.image_url, "/static/images/default-pic.png")
        self.assertEqual(u.header_image_url, "/static/images/warbler-hero.jpg")

        # Test repr method
        self.assertEqual(str(u), f"<User #{u.id}: testuser, test@test.com>")

        # -----------------------
        # issues testing signup method.
        # Testing failure cases resulted in errors that could not be caught.

        #  **** ATTEMPT 1
        #  Changed the backend to try/catch surrounding db.session.add(), excepting any error
        #  and returning false
        # 
        # self.assertFalse(User.signup( 
        #                     username="testuser",
        #                     email="email2@test.com",
        #                     password="password",
        #                     image_url="img_url/img.jpeg"))

        # ---------------------

        #  **** ATTEMPT 2
        # def signup_test():
        #     return User.signup(
                # "testuser",
                # "email2@test.com",
                # "password",
                # "img_url/img.jpeg"
        #     )
        
        # self.assertRaises(errors.UniqueViolation, signup_test)
        # # tried with exc.IntegrityError with same results

        # ---------------------
    
        # **** ATTEMPT 3

        # with self.assertRaises(exc.IntegrityError):
        #     User.signup("testuser",
        #     "email2@test.com",
        #     "password",
        #     "img_url/img.jpeg")
        # -----------------------

    def test_follow_methods(self):

        u = User.query.filter(User.username=="testuser").first()

        # Create test users
        followed_user = User(
            email="followed@test.com",
            username="followedUser",
            password="HASHED_PASSWORD"
        )

        following_user = User(
            email="following@test.com",
            username="followingUser",
            password="HASHED_PASSWORD"
        )

        db.session.add(followed_user)
        db.session.add(following_user)
        db.session.commit()

        # Create connection
        follow1 = Follows(user_being_followed_id=u.id, user_following_id=following_user.id)
        follow2 = Follows(user_being_followed_id=followed_user.id, user_following_id=u.id)


        db.session.add_all([follow1, follow2])
        db.session.commit()

        # Test accuracy of is_following method
        self.assertTrue(u.is_following(followed_user), f"{followed_user.id} not followed by main user {u.id}")
        self.assertFalse(u.is_following(following_user))

        # Test accuracy of is_followed_by method
        self.assertTrue(u.is_followed_by(following_user), f"main user {u.id} not followed by {following_user.id}")
        self.assertFalse(u.is_followed_by(followed_user))

    
    def test_authenticate_method(self):

        user = User.signup("auth_test_user", "generic@email.com", "password", "img")

        self.assertTrue(User.authenticate("auth_test_user", "password"), "Error in authenticating hashed password")
        self.assertFalse(User.authenticate("auth_test_user", "incorrect_password"), "Should prove false with incorrect password")
        self.assertFalse(User.authenticate("auth_test_user2", "password"), "Should prove false with incorrect username")
