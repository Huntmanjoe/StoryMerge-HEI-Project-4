from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, metadata

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    prompts = db.relationship('Prompt', back_populates='user', cascade='all, delete-orphan')
    entries = db.relationship('Entry', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-prompts.user', '-entries.user')

    def __repr__(self):
        return f'<User {self.id}, name {self.name}>'

class Prompt(db.Model, SerializerMixin):
    __tablename__ = "prompts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='prompts')

    serialize_rules = ('-user.prompts',)

    def __repr__(self):
        return f'<Prompt {self.id}, User id {self.user_id}, title {self.title}, content {self.content}>'

# should be able to use entry id to sort them for ui
stories_entries = db.Table(
    'stories_entries',
    metadata,
    db.Column('story_id', db.Integer, db.ForeignKey(
        'stories.id'), primary_key=True),
    db.Column('entry_id', db.Integer, db.ForeignKey(
        'entries.id'), primary_key=True)
)

class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='entries')

    serialize_rules = ('-user.entries',)

    def __repr__(self):
        return f'<Entry {self.id}, user ID {self.user_id}, content {self.content if len(self.content) <= 200 else self.content[:201]}>'

class Story(db.Model, SerializerMixin):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'))

    def __repr__(self):
        return f'<Story {self.id}, prompt ID {self.prompt_id}>'