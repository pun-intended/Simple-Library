from models import User, db

def seed_users():
    print("seeding Users")
    db.drop_all()
    db.create_all()

    u1 = User.register("test1", "testpass")
    u2 = User.register("test2", "testpass")

    allUsers = [u1, u2]

    db.session.add_all(allUsers)
    db.session.commit()
    user = User.query.filter_by(username="test1").first
    print(user)