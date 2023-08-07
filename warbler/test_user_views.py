import os
from unittest import TestCase

from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY, session

# Create DB
db.create_all()

# Disable CSRF for ease of testing
app.config['WTF_CSRF_ENABLED'] = False


class UserViewTest(TestCase):
    """Test views for user"""

    def setUp(self):
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
        resp = self.client.get("/login")
        html = resp.get_data(as_text=True)

        self.assertIn("<form", html)


        # Invalid credentials are rejected and message flashed
        resp = self.client.post("/login", data={"username": "testuser", "password": "wrongpass"})
        html = resp.get_data(as_text=True)

        self.assertIn("Invalid credentials", html)

        # Page redirects on failed login
        resp = self.client.post("/login", data={"username": "testuser", "password": "wrongpass"})
        
        self.assertEqual(resp.status_code, 200)
        
        # Page loads correctly on successful login
        user = User.query.filter(User.username=="testuser").first()
        resp = self.client.post("/login", follow_redirects=True, data={"username": "testuser", "password": "testuser"})
        html = resp.get_data(as_text=True)

        self.assertIn(f'<a href="/users/{user.id}"', html)


    def test_logout(self):
        
        resp = self.client.get("/logout")

        # CURR_USER_KEY removed from session on logout
        # TODO - Fix - get session variable

        # Page redirects
        self.assertEqual(resp.status_code, 302)


    def test_signup(self):
         
        # Form displayed on get method
        resp = self.client.get("/signup")
        html = resp.get_data(as_text=True)

        self.assertIn("<form", html)

        # Page catches IntegrityError, flashes message
        resp = self.client.post("/signup", data={
            "username": "testuser",
            "password": "password",
            "email": "email@email.com",
            "image_url": "image"
            })
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn("Username already taken", html)

        # Redirects on validated credentials
        new_resp = self.client.post("/signup", data={
            "username": "fakeuser",
            "password": "password",
            "email": "fake@email.com",
            "image_url": "image.jpg"
            })
        # TODO - Throwing 500 error, check in flask
        print(new_resp.get_data(as_text=True))

        # self.assertEqual(resp.status_code, 302)

    def test_show_user(self):

        user = User.query.filter(User.username=="testuser").first() 
        
        # returns 404 id user does not exist
        resp = self.client.get(f"/users/0")
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 404)

        # returns correct user data
        resp = self.client.get(f"/users/{user.id}")
        html = resp.get_data(as_text=True)

        self.assertIn(f"@{user.username}", html)

    # def test_show_following(self):
         
        #  Returns 404 if user doesnt exist

        # Disallow viewing if not logged in

        # Redirects if not logged in

        # Displays following users if logged in

    # def test_show_followers(self):
         
        #  Returns 404 if user doesnt exist

        # Disallow viewing if not logged in

        # Redirects if not logged in

        # Displays follower users if logged in

    # def test_add_follow(self):
        
        # Disallow follow if not logged in

        # Redirects if not logged in
        
        # Returns 404 of user doesnt exist

        # Redirects on completion

        # Followed user appears on following page

    # def test_stop_following(self):
        
        # Disallow if not logged in

        # Redirects if not logged in
        
        # Returns 404 of user doesnt exist

        # Redirects on completion

        # User no longer appears on following page

    # def test_profile(self):
         
        #  Disallow if not logged in

        # Show user data

        # Disallow and redirect if credentials incorrect

        # Apply changes and redirect if authenticated
         
    # def test_delete_user(self):
         
        #  Disallowed if not logged in

        # User removed from database on deletion

        # user logged out after deletion

        # Redirect on success
         
    # def test_add_like(self):
         
        #  Disallow and redirect if not logged in

        # If message currently not liked, add like

        # If message currently liked, remove from liked

        # flash message, redirect if message doesn't exist

        # Redirect on success

        # Like button changes class when toggled