from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import DECIMAL
from config import db, bcrypt
from datetime import datetime

day = db.Table('days',
               db.Column('event_id', db.Integer, db.ForeignKey('events.id')),
               db.Column('list_id', db.Integer, db.ForeignKey('lists.id'))
               )

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    lists = db.relationship('List', back_populates='user', cascade='all, delete')
    # grocery_lists = db.relationship('GroceryList', back_populates='user', cascade='all, delete')
    events = db.relationship('Event', back_populates='user', cascade='all, delete')
    # days = db.relationship('Day', back_populates='user')

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash =  bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
        
    @validates('username')
    def validate_username(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('Username must be non-empty string.')
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or not email:
           raise ValueError('Must provide email and be in the form of johnSMith@email.com')
        return email 
    

class List(db.Model, SerializerMixin):

    __tablename__ = 'lists'
    
    serialize_rules = ('-user', '-events',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    # day_id = db.Column(db.Integer, db.ForeignKey('days.id'))
    
    tasks = db.relationship('Task', back_populates='list', cascade='all, delete, delete-orphan')
    user = db.relationship('User', back_populates='lists')
    # day = db.relationship('Day', back_populates='lists')
    events = db.relationship('Event', secondary='days', back_populates='lists')
    

    @validates('name')
    def validate_name(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('List name must be non-empty string.')
        return name
    
class Task(db.Model, SerializerMixin):

    __tablename__ = 'tasks'

    serialize_rules = ('-list',)

    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String, nullable = False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'))

    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)
    status = db.Column(db.Integer, nullable=False, default=0)

    list = db.relationship('List', back_populates='tasks')

    @validates('description')
    def validate_description(self, key, description):
        if not description or not isinstance(description, str):
            raise ValueError('Task description must be non-empty string!')
        return description
    

# class GroceryList(db.Model, SerializerMixin):

#     __tablename__ = 'grocery_lists'

#     serialize_rules = ('-user', '-events', '-day',)

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String, nullable = False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
#     day_id = db.Column(db.Integer, db.ForeignKey('days.id'))
    
#     user = db.relationship('User', back_populates='grocery_lists')
#     grocery_items = db.relationship('GroceryItem', back_populates='grocery_list', cascade='all, delete, delete-orphan')
#     day = db.relationship('Day', back_populates='grocery_lists')

#     @validates('name')
#     def validate_name(self, key, name):
#         if not name or not isinstance(name, str):
#             raise ValueError('Grocery list name must be non-empty string.')
#         return name
    
# class GroceryItem(db.Model, SerializerMixin):

#     __tablename__ = 'grocery_items'

#     serialize_rules = ('-grocery_list',)

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String, nullable = False)
#     grocery_list_id = db.Column(db.Integer, db.ForeignKey('grocery_lists.id', ondelete='CASCADE'))
#     price = db.Column(db.DECIMAL(precision = 3, scale=2))
#     image = db.Column(db.String, nullable = False)    

#     grocery_list = db.relationship('GroceryList', back_populates='grocery_items')

#     @validates('name')
#     def validate_name(self, key, name):
#         if not name or not isinstance(name, str):
#             raise ValueError('Grocery item name must be non-empty string.')
#         return name
    
class Event(db.Model, SerializerMixin):

    __tablename__ = 'events'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.String)
    start = db.Column(db.String, nullable = False)
    end = db.Column(db.String, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # day_id = db.Column(db.Integer, db.ForeignKey('days.id'))

    user = db.relationship('User', back_populates='events')
    # day = db.relationship('Day', back_populates='events')
    lists = db.relationship('List', secondary='days', back_populates ='events')

    

    @validates('name')
    def validate_name(self, key, name):
        if not name or not isinstance(name, str):
            raise ValueError('Event name must be non-empty string.')
        return name