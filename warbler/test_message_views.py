"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""

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

    def test_add_message(self):
        """Can use add a message?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        # Cannot add message while not logged in

        resp = self.client.post("/messages/new", follow_redirects=True, data={"text": "Hello"})
        html = resp.get_data(as_text=True)
        self.assertIn("Access unauthorized.", html)
        
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")
    
    def test_show_message(self):
        """Can you view a message"""

        self.testmessage = Message(text="test message",
                                   user_id=self.testuser.id)

        db.session.add(self.testmessage)
        db.session.commit()

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        # you can see a message on it's page
        resp = c.get(f"/messages/{self.testmessage.id}")
        html = resp.get_data(as_text=True)
        self.assertIn("test message", html)

        # you can see a message on your home page
        resp = c.get(f"/users/{self.testuser.id}")
        html = resp.get_data(as_text=True)
        self.assertIn("test message", html)

    def test_message_modification(self):
        """Can messages be deleted"""
        self.testmessage = Message(text="modification test message",
                                   user_id=self.testuser.id)
        db.session.add(self.testmessage)
        db.session.commit()
        
        # Cannot delete message if not logged in
        resp = self.client.post(f"/messages/{self.testmessage.id}/delete", follow_redirects=True)
        html = resp.get_data(as_text=True)
        self.assertIn("Access unauthorized.", html)
        
        # Cannot delete message if not owner
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.dummyuser.id
        resp = self.client.post(f"/messages/{self.testmessage.id}/delete", follow_redirects=True)
        html = resp.get_data(as_text=True)
        self.assertIn("Access unauthorized.", html)


        # Can delete message if logged in as owner
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
        resp = self.client.post(f"/messages/{self.testmessage.id}/delete", follow_redirects=True)
        html = resp.get_data(as_text=True)
        self.assertNotIn("modification test message", html)

