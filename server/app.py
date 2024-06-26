#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, jsonify, request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Prompt, Entry, Story, story_entries

# need to prevent posting
# @app.before_request
# def check_if_logged_in():
#     if not db.session['user_id'] and request.endpoint

# there is a lot of returning {key: obj.to_dict} when just obj.to_dict would suffice

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
    def post(self):
        data = request.get_json()
        # return make_response(data, 200)

        try:
            new_user = User(
                name = data['name'],
                email = data['email'], 
                password = data['password']
            )
        except:
            error = {"errors": ["validation errors"]}
            return make_response(jsonify(error), 400)
        
        db.session.add(new_user)
        db.session.commit()

        return make_response({'user': new_user.to_dict()}, 201)
    
api.add_resource(Users, '/users')

class UserByID(Resource):
        
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        if user:
            return make_response(jsonify(user), 200)
        error = {"error": "User not found"}
        return make_response(jsonify(error), 404)

    # maybe should make require a cookie with the right id
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(user, attr, request.json[attr])

        db.session.add(user)
        db.session.commit()

        return make_response({'user': user.to_dict()}, 202)

api.add_resource(UserByID, '/users/<int:id>')

class Prompts(Resource):

    def get(self):
        prompts = [prompt.to_dict() for prompt in Prompt.query.all()]
        return make_response(jsonify(prompts), 200)
    
    def post(self):
        if not db.session['user_id']: 
            if not db.session['user_id'] in User.query.filter_by(id=db.session['user_id']):
                return make_response(jsonify({'error': 'Unauthorized'}, 401))
            
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

        return make_response({'prompt': new_prompt.to_dict()}, 201)
    
api.add_resource(Prompts, '/prompts')

class PromptByID(Resource):

    def get(self, id):
        prompt = Prompt.query.filter_by(id=id).first()
        return make_response(prompt.to_dict(), 200)

    def patch(self, id):
        # if not db.session['user_id']: 
        #     if db.session['user_id'] != 
        prompt = Prompt.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(prompt, attr, request.json[attr])

        db.session.add(prompt)
        db.session.commit()

        return make_response({'prompt': prompt.to_dict()}, 202)

api.add_resource(PromptByID, '/prompts/<int:id>')

class Entries(Resource):

    def get(self):
        entries = [entry.to_dict() for entry in Entry.query.all()]
        return make_response(jsonify(entries), 200)
    
    def post(self):
        if not session['user_id']: 
            if not User.query.filter_by(id=session['user_id']):
                return make_response(jsonify({'error': 'Unauthorized'}, 401))
            
        data = request.get_json()

        # try:
        new_entry = Entry(
            content = data['content'],
            user_id = session['user_id'] #posts will only happen if logged in
        )
        if data.get('story_id'):
            new_entry.stories.append(Story.query.filter_by(id=data['story_id']).first())
        # except:
        #     error = {"errors": ["validation errors"]}
        #     return make_response(jsonify(error), 400)
        
        db.session.add(new_entry)
        db.session.commit()

        return make_response({'entry': new_entry.to_dict()}, 201)
    
api.add_resource(Entries, '/entries')
    
class EntryByID(Resource):

    def get(self, id):
        entry = Entry.query.filter_by(id=id).first()
        return make_response(entry.to_dict(), 200)

    def patch(self, id):
        entry = Entry.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(entry, attr, request.json[attr])

        db.session.add(entry)
        db.session.commit()

        return make_response({'entry': entry.to_dict()}, 202)
    
api.add_resource(EntryByID, '/entries/<int:id>')

class Stories(Resource):
# !!! need to have post create the entries too
    def get(self):
        stories = [story.to_dict() for story in Story.query.all()]
        return make_response(jsonify(stories), 200)
    
    def post(self):
        if not session['user_id']: 
            if not session['user_id'] in User.query.filter_by(id=db.session['user_id']):
                return make_response(jsonify({'error': 'Unauthorized'}, 401))
            
        data = request.get_json()

        if data.get('copy'):
            if data['copy'] == True:
                orig = Story.query.filter_by(id=data['orig_id']).first()
                diverged = data['diverged']
                new_story = Story(
                    title = data['title'],
                    user_id = session['user_id'], #logged in
                    prompt_id = orig.id,
                    entries = orig.entries[:diverged]
                )

                db.session.add(new_story)
                db.session.commit()

                return make_response({'story': new_story.to_dict()}, 201)

        # try:
        new_story = Story(
            title = data['title'],
            user_id = session['user_id'], #logged in
            prompt_id = data['prompt_id']
        )
        # except:
        #     error = {"errors": ["validation errors"]}
        #     return make_response(jsonify(error), 400)
        
        db.session.add(new_story)
        db.session.commit()

        return make_response({'story': new_story.to_dict()}, 201)
    
api.add_resource(Stories, '/stories')
    
class StoryByID(Resource):

    def get(self, id):
        story = Story.query.filter_by(id=id).first()
        return make_response(jsonify(story.to_dict()), 200)

    def patch(self, id):
        story = Story.query.filter_by(id=id).first()
        for attr in request.json:
            setattr(story, attr, request.json[attr])

        db.session.add(story)
        db.session.commit()

        return make_response({'story': story.to_dict()}, 202)
    
api.add_resource(StoryByID, '/stories/<int:id>')

class Login(Resource):

    def post(self):
        # this takes "{user:{fields of user as keys and values as values}}"
        # return make_response(request.get_json(), 200)
        # user = User.query.filter(User.name == request.get_json()['username']).first()
        if request.get_json()['plaintext']:
            # return make_response('plaintext', 200)
            user = User.query.filter_by(name = request.get_json()['name']).first()
            password = request.get_json()['password']
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
            return make_response({'error': 'Invalid username or password'}, 401)
        else:
            # user = User.query.filter_by(name = request.get_json()['user']['name']).first()
            user = User.query.filter_by(name = request.get_json()['name']).first()
            # password = User.query.filter_by(id = request.get_json()['user']['password_hash']).first()
            # password = request.get_json(['user']['password'])
            password_hash = request.get_json()['password']
            # if user.authenticate(password):
            if password_hash == user._password_hash:
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
            return make_response({'error': 'Invalid username or password'}, 401)
    
api.add_resource(Login, '/login')

class checkProfile(Resource):
    # this will first see if the user exists, then see if it is the current user

    def post(self):
        # having <int:id> in the path didnt work so I'm using the request body
        username = request.json.get('username')
        user = User.query.filter_by(name=username).first()
        if not user:
            return make_response({'exists': False, 'is_own': False}, 404)
        if 'user_id' in session:
            # could probably use session.get instead of two if statements
            if session['user_id'] == user.id:
                return make_response({'exists': True, 'is_own': True, 'user': user.to_dict()}, 200)
        return make_response({'exists': True, 'is_own': False, 'user': user.to_dict()}, 200)
    
api.add_resource(checkProfile, '/check_profile')

class CheckSession(Resource):

    def get(self):
        # user = User.query.filter(User.id == db.session.get('user_id')).first()
        # return session.get('user_id')
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict()
        return make_response({'message': '401: Not Authorized'}, 401)
    
api.add_resource(CheckSession, '/check_session')

class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    
api.add_resource(Logout, '/logout')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)