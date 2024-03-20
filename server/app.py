#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, jsonify, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Prompt, Entry, Story

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                name = data['name'],
            )
        except:
            error = {"errors": ["validation errors"]}
            return make_response(jsonify(error), 400)
        
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)
    
api.add_resource(Users, '/users')

class UserByID(Resource):
        
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        if user:
            return make_response(jsonify(user), 200)
        error = {"error": "User not found"}
        return make_response(jsonify(error), 404)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(user, attr, request.json[attr])

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict(), 202)

api.add_resource(UserByID, '/users/<int:id>')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

