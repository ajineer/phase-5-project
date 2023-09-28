from app import app
from models import db, User, List, Event, day

if __name__ == '__main__':

    with app.app_context():

        session = db.session
        # session.query(day).delete()
        User.query.delete()
        # db.session.commit()
        # Event.query.delete()
        # List.query.delete()
        # db.session.commit()
        # Mark = User(username = 'Mark', _password_hash = 'idgaf123', image ='youtube.com', email='ajineer@outlook.com')
        # db.session.add(Mark)
        db.session.commit()