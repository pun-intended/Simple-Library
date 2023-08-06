import os
from unittest import TestCase

from models import db, connect_db, Message, User



class MessageModelTestCase(TestCase):
    """Test message model"""

    def setup():
        # create user

    def test_message_model(self):
        
        # can create message

        # Model rejects messages with invalid values

        # model deletes message on deletion of user
    
    def test_likes_model(self):

        # can create like relations

        # Relation is deleted when user or message is deleted
