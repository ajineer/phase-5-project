from app import app
from models import db, User, List, Event

if __name__ == '__main__':

    with app.app_context():
        # User.query.delete()
        # db.session.commit()
        Event.query.delete()
        # List.query.delete()
        # GroceryList.query.delete()
        # GroceryItem.query.delete()
        # Day.query.delete()
        # db.session.commit()
        # d1 = Day(user_id = 1, date='Thu Sep 07 2023')
        # d2 = Day(user_id = 1, date='Wed Sep 06 2023')
        # db.session.add(d1)
        # db.session.add(d2)
        #Day.query.delete()
        # Mark = User(username = 'Mark', _password_hash = 'idgaf123', image ='youtube.com', email='ajineer@outlook.com')
        # db.session.add(Mark)
        db.session.commit()