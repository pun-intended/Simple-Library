import os
from unittest import TestCase

from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY

# Create DB
db.create_all()

# Disable CSRF for ease of testing
app.config['WTF_CSRF_ENABLED'] = False


class UserViewTest(TestCase):
    """Test views for user"""

    def setup(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()
    
    def test_login(self):
         
        # Form is shown on get request

        # Invalid credentials are rejected and message flashed

        # Page redirects on successful signup

        # Validation works for all fields

        # Default values applied to image

    def test_logout(self):
        
        # CURR_USER_KEY removed from session on logout 

    def test_signup(self):
         
        # Form displayed on get method

        # Page catches IntegrityError, flashes message

    def test_show_user(self):
         
        # returns 404 id user does not exist

        # returns correct user data

    def test_show_following(self):
         
        #  Returns 404 of user doesnt exist

        # Disallow viewing if not logged in

        # Redirects if not logged in

        # Displays following users if logged in

    def test_show_followers(self):
         
        #  Returns 404 if user doesnt exist

        # Disallow viewing if not logged in

        # Redirects if not logged in

        # Displays follower users if logged in

    def test_add_follow(self):
        
        # Disallow follow if not logged in

        # Redirects if not logged in
        
        # Returns 404 of user doesnt exist

        # Redirects on completion

        # Followed user appears on following page

    def test_stop_following(self):
        
        # Disallow if not logged in

        # Redirects if not logged in
        
        # Returns 404 of user doesnt exist

        # Redirects on completion

        # User no longer appears on following page

    def test_profile(self):
         
        #  Disallow if not logged in

        # Show user data

        # Disallow and redirect if credentials incorrect

        # Apply changes and redirect if authenticated
         
    def test_delete_user(self):
         
        #  Disallowed if not logged in

        # User removed from database on deletion

        # user logged out after deletion

        # Redirect on success
         
    def test_add_like(self):
         
        #  Disallow and redirect if not logged in

        # If message currently not liked, add like

        # If message currently liked, remove from liked

        # flash message, redirect if message doesn't exist

        # Redirect on success

        # Like button changes class when toggled