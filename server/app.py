#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from datetime import datetime
# Add your model imports
from models import User, List, Task, Event
# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'

class Signup(Resource):

    def post(self):
        username = request.get_json().get('username')
        image = request.get_json().get('image')
        email = request.get_json().get('email')
        password = request.get_json().get('password')

        if username and password and not User.query.filter(User.username == username).first():
            new_user = User(
                username = username,
                image = image,
                email = email
                )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        
        return {'error': '422 Unprocessable Entity'}, 422
    

class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                if session['user_id']:
                    return user.to_dict(), 200
                return {'error': 'session could not be established'}, 400 
        
        return {'error': "Unauthorized"}, 401

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': 'Unauthorized'}, 401
    
class Lists(Resource):
    
    def get(self):
        if session.get('user_id'):
            lists = List.query.filter(List.user_id == session['user_id']).all()
            if lists:
                return [l.to_dict(rules=('tasks',)) for l in lists], 200
            return {'error': 'No lists found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def post(self):

        if session.get('user_id'):
            try:
                new_list = List(
                    user_id = session['user_id'],
                    name = request.get_json()['name']
                )
                db.session.add(new_list)
                db.session.commit()
                return new_list.to_dict(), 201
            except IntegrityError:
                return {'error': 'could not create List'}, 422
        return {'error': 'Unauthorized'}, 401
    
class ListByID(Resource):

    def get(self, id):
        if session.get('user_id'):
            tasks = Task.query.filter(Task.list_id == id).all()
            if tasks:
                return [task.to_dict() for task in tasks], 200
            return {'error': 'No tasks found'}, 404
        return {'error': 'Unauthorized'}, 401  
    
    def post(self, id):
        if session.get('user_id'):
            try:
                new_task = Task(
                    description = request.get_json()['description'],
                    list_id = id
                )
                db.session.add(new_task)
                db.session.commit()
                return new_task.to_dict(), 201
            except IntegrityError:
                return {'error': 'could not create List'}, 422
        return {'error': 'Unauthorized'}, 401
    
    def delete(self, id):
        if session.get('user_id'):
            list = List.query.filter(List.id == id).first()
            if list:
                db.session.delete(list)
                db.session.commit()
                return {'Message': 'List deleted'}, 204
            return {'error': 'List not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def patch(self, id):
        if session.get('user_id'):
            list = List.query.filter(List.id == id).first()
            if list:
                setattr(list, 'name', request.get_json()['name'])
                db.session.add(list)
                db.session.commit()
                return list.to_dict(), 202
            return {'error': 'List not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
class TasksById(Resource):
    
    def patch(self, task_id):
        if session.get('user_id'):
            task = Task.query.filter(Task.id == task_id).first()
            if task:
                setattr(task, 'description', request.get_json()['description'])
                setattr(task, 'status', request.get_json()['status'])
                db.session.add(task)
                db.session.commit()
                return task.to_dict(), 202
            return {'error': 'Task not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def delete(self, task_id):
        if session.get('user_id'):
            task = Task.query.filter(Task.id == task_id).first()
            if task:
                db.session.delete(task)
                db.session.commit()
                return {'Message': 'Task deleted'}, 204
            return {'error': 'Task not found'}, 404
        return {'error': 'Unauthorized'}, 401

    
# class GroceryLists(Resource):

#     def get(self):
#         if session.get('user_id'):
#             grocery_lists = GroceryList.query.filter(GroceryList.user_id == session['user_id']).all()
#             if grocery_lists:
#                 return [g.to_dict(rules=('grocery_items'),) for g in grocery_lists], 200
#             return {'error': 'No grocery lists found'}, 404
#         return {'error': 'Unauthorized'}, 401
    
#     def post(self):

#         if session.get('user_id'):
#             try:
#                 new_grocery_list = GroceryList(
#                     user_id = session['user_id'],
#                     name = request.get_json()['name']
#                 )
#                 db.session.add(new_grocery_list)
#                 db.session.commit()
#                 return new_grocery_list.to_dict(), 201
#             except IntegrityError:
#                 return {'error': 'could not create grocery List'}, 422
#         return {'error': 'Unauthorized'}, 401

# class GroceryListByID(Resource):

#     def get(self, id):
#         if session.get('user_id'):
#             grocery_items = GroceryItem.query.filter(GroceryItem.grocery_list_id == id).all()
#             if grocery_items:
#                 return [grocery_item.to_dict() for grocery_item in grocery_items], 200
#             return {'error': 'No grocery items found'}, 404
#         return {'error': 'Unauthorized'}, 401  
    
#     def post(self, id):
#         if session.get('user_id'):
#             try:
#                 new_grocery_item = GroceryItem(
#                     grocery_list_id = id,
#                     name = request.get_json()['name'],
#                     price = request.get_json()['price'],
#                     image = request.get_json()['image']
#                 )
#                 db.session.add(new_grocery_item)
#                 db.session.commit()
#                 return new_grocery_item.to_dict(), 201
#             except IntegrityError:
#                 return {'error': 'could not create grocery item'}, 422
#         return {'error': 'Unauthorized'}, 401
    
#     def delete(self, id):
#         if session.get('user_id'):
#             grocery_list = GroceryList.query.filter(GroceryList.id == id).first()
#             if grocery_list:
#                 db.session.delete(grocery_list)
#                 db.session.commit()
#                 return {'Message': 'Grocery list deleted'}, 204
#             return {'error': 'Grocery list not found'}, 404
#         return {'error': 'Unauthorized'}, 401
    
#     def patch(self, id):
#         if session.get('user_id'):
#             grocery_list = GroceryList.query.filter(GroceryList.id == id).first()
#             if grocery_list:
#                 setattr(grocery_list, 'name', request.get_json()['name'])
#                 db.session.add(grocery_list)
#                 db.session.commit()
#                 return grocery_list.to_dict(), 202
#             return {'error': 'grocery_list not found'}, 404
#         return {'error': 'Unauthorized'}, 401

# class GroceryItemByID(Resource):

#     def delete(self, id):
#         if session.get('user_id'):
#             grocery_item = GroceryItem.query.filter(GroceryItem.id == id).first()
#             if grocery_item:
#                 db.session.delete(grocery_item)
#                 db.session.commit()
#                 return {'Message': 'Grocery item deleted'}, 204
#             return {'error': 'Grocery item not found'}, 404
#         return {'error': 'Unauthorized'}, 401

class Events(Resource):

    def get(self):
        if session.get('user_id'):
            events = Event.query.filter(Event.user_id == session['user_id']).all()
            if events:
                return [event.to_dict() for event in events], 200
            return {'error': 'No days found'}, 404
        return {'error': 'Unaruthorized'}, 401      
    
    def post(self):
        if session.get('user_id'):
            try:
                new_event = Event(
                    user_id = session['user_id'],
                    date = request.get_json()['date'],
                    name = request.get_json()['name'],
                    start = request.get_json()['start'],
                    end = request.get_json()['end']
                )
                db.session.add(new_event)
                db.session.commit()
                return new_event.to_dict(), 201
            except IntegrityError:
                return {'error': 'could not create Day'}, 422
        return {'error': 'Unauthorized'}, 401

class EventsByID(Resource):
    
    def patch(self, event_id):
        if session.get('user_id'):
            event = Event.query.filter(Event.id == event_id).first()
            if event:
                action = request.get_json()['action']
                if action and action == 'remove':
                    list_id = request.get_json()['list_id']
                    if any(list.id == list_id for list in event.lists):
                        event.lists = [list for list in event.lists if list.id != list_id]
                        db.session.add(event)
                        db.session.commit()
                        return event.to_dict(), 202
                setattr(event, 'name', request.get_json()['name'])
                setattr(event, 'start', request.get_json()['start'])
                setattr(event, 'end', request.get_json()['end'])
                addList = List.query.filter(List.id == request.get_json()['list_id']).first()
                event.lists.append(addList)
                db.session.add(event)
                db.session.commit()
                return event.to_dict(), 202
            return {'error': 'Event not found'}, 404
        return {'error': 'Unauthorized'}, 401
    
    def delete(self, event_id):
        if session.get('user_id'):
            event = Event.query.filter(Event.id == event_id).first()
            if event:
                db.session.delete(event)
                db.session.commit()
                return {'Message': 'Event deleted'}, 204
            return {'error': 'Event not found'}, 404
        return {'error': 'Unauthorized'}, 401
    

class Days(Resource):

    def get(self):
        if session.get('user_id'):
            days = Day.query.all()
            if days:
                return [day.to_dict() for day in days], 200
            return {'error': 'No days found'}, 404
        return {'error': 'Unaruthorized'}, 401   

    def post(self):
        if session.get('user_id'):
            try:
                new_day = Day(
                    user_id = session['user_id'],
                    date = request.get_json()['date']
                )
                if not Day.query.filter(Day.date == request.get_json()['date']).first():
                    db.session.add(new_day)
                    db.session.commit()
                    return new_day.to_dict(), 201
                return {'error': '422 Unprocessable Entity'}, 422
            except IntegrityError:
                return {'error': 'could not create Day'}, 422
        return {'error': 'Unauthorized'}, 401
    
class DaysByID(Resource):
    def delete(self, id):
        if session.get('user_id'):
            day = Day.query.filter(Day.id == id).first()
            if day:
                db.session.delete(day)
                db.session.commit()
                return {'Message': 'Day deleted'}, 204
            return {'error': 'Day not found'}, 404
        return {'error': 'Unauthorized'}, 401

# basic user paths
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

# task list views
api.add_resource(Lists, '/lists', endpoint='lists')
api.add_resource(ListByID, '/lists/<int:id>')
api.add_resource(TasksById, '/tasks/<int:task_id>')

# grocery list views
# api.add_resource(GroceryLists, '/grocery_lists', endpoint='grocery_lists')
# api.add_resource(GroceryListByID, '/grocery_lists/<int:id>')
# api.add_resource(GroceryItemByID, '/grocery_item/<int:id>')

# api.add_resource(Days, '/days', endpoint='days')
# api.add_resource(DaysByID, '/days/<int:id>')

api.add_resource(Events, '/events', endpoint='events')
api.add_resource(EventsByID, '/events/<int:event_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)