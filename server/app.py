#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, jsonify, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Prompt, Entry, Story

# class CRUDOperation:
#     def __init__(self, operation, fields=None):
#         self.operation = operation
#         self.attributes = None

#     def __call__(self):


# def make_get(self, fields):
#     def get(self):
#         for 
#     return get

class Users(Resource):

    def get(self):
        #this might work to exclude passwords
        users = [user.to_dict(rules=("-password",)) for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                name = data['name'],
                password = data['password']
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

class Prompts(Resource):

    def get(self):
        prompts = [prompt.to_dict() for prompt in Prompt.query.all()]
        return make_response(jsonify(prompts), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_prompt = Prompt(
                title = data['title'],
                content = data['content'],
                user_id = data['user_id']
            )
        except:
            error = {"errors": ["validation errors"]}
            return make_response(jsonify(error), 400)
        
        db.session.add(new_prompt)
        db.session.commit()

        return make_response(new_prompt.to_dict(), 201)
    
api.add_resource(Prompts, '/prompts')

class PromptByID(Resource):

    def get(self, id):
        prompt = Prompt.query.filter_by(id=id).first()
        return make_response(jsonify(prompt), 200)

    def patch(self, id):
        prompt = Prompt.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(prompt, attr, request.json[attr])

        db.session.add(prompt)
        db.session.commit()

        return make_response(prompt.to_dict(), 202)

api.add_resource(PromptByID, '/prompts/<int:id>')

class Entries(Resource):

    def get(self):
        entries = [entry.to_dict() for entry in Entry.query.all()]
        return make_response(jsonify(entries), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_entry = Entry(
                content = data['content'],
                user_id = data['user_id']
            )
        except:
            error = {"errors": ["validation errors"]}
            return make_response(jsonify(error), 400)
        
        db.session.add(new_entry)
        db.session.commit()

        return make_response(new_entry.to_dict(), 201)
    
api.add_resource(Entries, '/entries')
    
class EntryByID(Resource):

    def get(self, id):
        entry = Entry.query.filter_by(id=id).first()
        return make_response(jsonify(entry), 200)

    def patch(self, id):
        entry = Entry.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(entry, attr, request.json[attr])

        db.session.add(entry)
        db.session.commit()

        return make_response(entry.to_dict(), 202)
    
api.add_resource(EntryByID, '/entries/<int:id>')

class Stories(Resource):
# !!! need to have post create the entries too
    def get(self):
        stories = [story.to_dict() for story in Story.query.all()]
        return make_response(jsonify(stories), 200)
    
    def post(self):
        data = request.get_json()

        try:
            new_story = Story(
                prompt_id = data['prompt_id']
            )
        except:
            error = {"errors": ["validation errors"]}
            return make_response(jsonify(error), 400)
        
        db.session.add(new_story)
        db.session.commit()

        return make_response(new_story.to_dict(), 201)
    
api.add_resource(Stories, '/stories')
    
class StoryByID(Resource):

    def get(self, id):
        story = Story.query.filter_by(id=id).first()
        return make_response(jsonify(story), 200)

    def patch(self, id):
        story = Story.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(story, attr, request.json[attr])

        db.session.add(story)
        db.session.commit()

        return make_response(story.to_dict(), 202)
    
api.add_resource(StoryByID, '/stories/<int:id>')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)