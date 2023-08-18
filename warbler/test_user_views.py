import os
from unittest import TestCase

from models import db, User, Message, Follows

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

from app import app, CURR_USER_KEY, session, g

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
        
        self.dummyuser = User.signup(username="dummyuser",
                                    email="dummy@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()
    
    def test_login(self):
        print(f"-------- TEST_LOGIN -------")
         
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
        print(f"-------- TEST_LOGOUT -------")
        
        user = User.query.filter(User.username=="testuser").first()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

        resp = self.client.get("/logout")

        # Page redirects
        self.assertEqual(resp.status_code, 302)


    def test_signup(self):
        print(f"-------- TEST_SIGNUP -------")
         
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

        self.assertEqual(new_resp.status_code, 302)

    def test_show_user(self):
        print(f"-------- TEST_SHOW_USER -------")

        user = User.query.filter(User.username=="testuser").first() 
        
        # returns 404 id user does not exist
        resp = self.client.get(f"/users/0")
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 404)

        # returns correct user data
        resp = self.client.get(f"/users/{user.id}")
        html = resp.get_data(as_text=True)

        self.assertIn(f"@{user.username}", html)


# ---------------------
# test for valid responses and light html
# ---------------------
    def test_show_following(self):
        print(f"-------- TEST_SHOW_FOLLOWING -------")

        user = User.query.filter(User.username=="testuser").first()
        dummy = User.query.filter(User.username=="dummyuser").first()

        # Disallow and redirect if not logged in
        resp = self.client.get(f"/users/0/following")
        self.assertEqual(resp.status_code, 302)

        # Displays following users if logged in
        user = user = User.query.filter(User.username=="testuser").first()
        user.following.append(dummy)
        db.session.commit()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id
                resp = self.client.get(f"/users/{user.id}/following", follow_redirects=True, data={"user": user})
                html = resp.get_data(as_text=True)
                self.assertIn("dummyuser", html)

        # Returns 404 if user doesnt exist
        resp = self.client.get(f"/users/0/following")

        self.assertEqual(resp.status_code, 404)



    def test_show_followers(self):
        print(f"-------- TEST_SHOW_FOLLOWERS -------")

        # Disallow and Redirect if not logged in
        user = User.query.filter(User.username=="testuser").first()
        resp = self.client.get(f"/users/{user.id}/followers")

        self.assertEqual(resp.status_code, 302)

        # Displays follower users if logged in
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

                resp = self.client.get(f"/users/{user.id}/followers", follow_redirects=True)
                html = resp.get_data(as_text=True)

                # TODO - FIX: Redirecting to main page without flashing message
                self.assertIn(f"<h4 id='sidebar-username'>@{user.username}</h4>", html)
        
                # Returns 404 if user doesnt exist
                resp = self.client.get(f"/users/0/followers")
                html = resp.get_data(as_text=True)

                self.assertEqual(resp.status_code, 404)


    def test_add_follow(self):
        print(f"-------- TEST_ADD_FOLLOW -------")

        user = User.query.filter(User.username=="testuser").first()
        dummy = User.query.filter(User.username=="dummyuser").first()        
     # Disallow follow if not logged in
        resp_no_login = self.client.post(f"/users/follow/{dummy.id}", follow_redirects=True)
        html = resp_no_login.get_data(as_text=True)

        # self.assertIn("Access unauthorized", html)

    #   Redirects if not logged in
        resp_no_login = self.client.post(f"/users/follow/{dummy.id}")
        self.assertEqual(resp_no_login.status_code, 302)
        
    def test_add_follow_no_user(self):
    #   Returns 404 if user doesnt exist
        print(f"-------- TEST_ADD_FOLLOW_NO_USER -------")
        user = User.query.filter(User.username=="testuser").first()
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id
                resp_no_user = self.client.post("/users/follow/0")

                """
                ---------<User #2070: testuser, test@test.com>
                    ---------2070       
                
                """

# TODO - FIX - Returning redirect, not 404
        self.assertEqual(resp_no_user.status_code, 404)

    #   Redirects on completion
        resp_ok = self.client.post(f"/users/follow/{dummy.id}", follow_redirects=True)
        html = resp_ok.get_data(as_text=True)
        self.assertIn(f"<h4 id='sidebar-username'>@{user.username}</h4>", html)

    #   Followed user appears on following page
        self.assertIn("dummyuser", html)
        print(f"-------- {sess[CURR_USER_KEY]} -------")

    def test_stop_following(self):
        print(f"-------- TEST_STOP_FOLLOWING -------")
        
        user = User.query.filter(User.username=="testuser").first()
        dummy = User.query.filter(User.username=="dummyuser").first()        
   
   #   Disallow follow if not logged in
        resp_no_login = self.client.post(f"/users/stop-following/{dummy.id}", follow_redirects=True)
        html = resp_no_login.get_data(as_text=True)

        self.assertIn("Access unauthorized", html)

    #   Redirects if not logged in
        resp_no_login = self.client.post(f"/users/stop-following/{dummy.id}")
        self.assertEqual(resp_no_login.status_code, 302)
        
    #   Returns 404 of user doesnt exist
        user = user = User.query.filter(User.username=="testuser").first()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id
                resp_no_user = self.client.post(f"/users/stop-following/0")
                
                # TODO - FIX: redirecting instead of 404
                self.assertEqual(resp_no_user.status_code, 404)

                # Redirects on completion
                resp_ok = self.client.post(f"/users/stop-following/{dummy.id}", follow_redirects=True)
                html = resp_ok.get_data(as_text=True)
                self.assertIn(f"<h4 id='sidebar-username'>@{user.username}</h4>", html)

                # User no longer appears on following page
                self.assertNotIn("dummyuser", html)

    def test_profile(self):
        print(f"-------- TEST_PROFILE -------")
         
        #  Disallow if not logged in
        resp_no_login = self.client.get("/users/profile", follow_redirects=True)
        html = resp_no_login.get_data(as_text=True)

        self.assertIn("Access unauthorized", html)

        # Shows form for data update
        user = User.query.filter(User.username=="testuser").first()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

                resp_ok = self.client.get("/users/profile", follow_redirects=True)
                html = resp_ok.get_data(as_text=True)
                self.assertIn("<form", html)

        # Disallow if credentials incorrect
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id
                print(f"-------- {sess[CURR_USER_KEY]} -------")
                resp_wrong_pass = self.client.post("/users/profile", follow_redirects=True, 
                                                   data={"username": "testuser", 
                                                         "password": "pass", 
                                                         "email": "test@test.com"})
                html = resp_wrong_pass.get_data(as_text=True)

                # TODO - FIX: Redirecting to main page without flashing message
                self.assertIn("Invalid Password", html)

        # Apply changes and redirect if authenticated
                resp_ok = self.client.post("/users/profile", follow_redirects=True, 
                                                   data={"username": "updatedusername", 
                                                         "password": "testuser", 
                                                         "email": "test@test.com"})
                html = resp_ok.get_data(as_text=True)

                self.assertIn("updatedusername", html)
         
    def test_delete_user(self):
        print(f"-------- TEST_DELETE_PROFILE -------")
         
        #  Disallowed if not logged in
        resp_no_login = self.client.post("/users/delete", follow_redirects=True)
        html = resp_no_login.get_data(as_text=True)

        self.assertIn("Access unauthorized", html)

        # User removed from database on deletion
        user = User.query.filter(User.username=="testuser").first()
        user_id = user.id
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

                resp = self.client.post("/users/delete")
                self.assertEqual(resp.status_code, 302)
         
    def test_add_like(self):
        print(f"-------- TEST_ADD_LIKE -------")
         
        #  Disallow if not logged in
        resp_no_login = self.client.get("/users/profile", follow_redirects=True)
        html = resp_no_login.get_data(as_text=True)

        self.assertIn("Access unauthorized", html)

        # If message currently not liked, add like
        user = user = User.query.filter(User.username=="testuser").first()
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = user.id

        # If message currently liked, remove from liked

        # Redirect on success

        # Like button changes class when toggled