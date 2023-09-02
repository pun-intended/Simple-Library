from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String, nullable=False)
    username = db.Column(db.String(20), primary_key=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    user_mon = db.relationship("UserMon", backref="user", cascade="all, delete")

    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):
        hash = bcrypt.generate_password_hash(pwd)
        hash_decoded = hash.decode("utf8")
        return cls(username=username, password=hash_decoded, email=email, first_name=first_name, last_name=last_name)
    
    @classmethod
    def authenticate(cls, username, pwd):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, pwd):
            return user
        else:
            return False

class UserMon(db.Model):
    __tablename__ = "usermon"

    owns_id = db.Column(db.Integer, primary_key=True, nullable=False)
    pokemon_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

class Pokemon(db.Model):
    __tablename__ = "pokemon"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)