#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User
# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Signup(Resource):

    def post(self):
        username = request.get_json().get('username')
        password = request.get_json().get('password')

        if username and password and not User.query.filter(User.username == username).first():
            new_user = User(username = username)
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
                print(session['user_id'])
                return user.to_dict(), 200
        
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