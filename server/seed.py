from app import app
from models import db, User, List, GroceryList, GroceryItem

if __name__ == '__main__':

    with app.app_context():
        # User.query.delete()
        # db.session.commit()

        # List.query.delete()
        # GroceryList.query.delete()
        GroceryItem.query.delete()
        db.session.commit()