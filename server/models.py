from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, metadata

#the current setup removes all prompts and entries associated with a user if they delete their acct
#might make more sense to just mark it as having a deleted acct?
#might have overdone it on nullable=False foreign keys for similar reasons
#maybe give User a "deleted" field that will allow their prompts/entries to persist

#as of now, users each have entries and prompts, all of which show a redundant user_id
#similarly, entries and prompts have a list of stories, which each have a prompt_id 

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    prompts = db.relationship('Prompt', back_populates='user', cascade='all, delete-orphan')
    entries = db.relationship('Entry', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-prompts.user', '-entries.user', '-prompts.stories.entries', 
                       '-prompts.stories.prompt', '-entries.stories.entries',
                       '-entries.stories.prompt')

    def __repr__(self):
        return f'<User {self.id}, name {self.name}>'

class Prompt(db.Model, SerializerMixin):
    __tablename__ = "prompts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='prompts')
    stories = db.relationship('Story', back_populates='prompt', cascade='all, delete-orphan')

    serialize_rules = ('-user.prompts',)

    def __repr__(self):
        return f'<Prompt {self.id}, User id {self.user_id}, title {self.title}, content {self.content}>'
    
    @validates('title')
    def validate_title(self, key, title):
        if len(title) <= 100:
            return title
        raise ValueError('Prompt title must be 100 characters at most')
    
    @validates('content')
    def validate_content(self, key, content):
        if len(content) <= 3000:
            return content
        raise ValueError('Prompt content must be 3000 characters at most')

# should be able to use entry id to sort them for ui
story_entries = db.Table(
    'story_entries',
    metadata,
    db.Column('story_id', db.Integer, db.ForeignKey(
        'stories.id'), primary_key=True),
    db.Column('entry_id', db.Integer, db.ForeignKey(
        'entries.id'), primary_key=True)
)

class Entry(db.Model, SerializerMixin):
    __tablename__ = "entries"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='entries')
    stories = db.relationship('Story', secondary=story_entries, back_populates='entries')

    serialize_rules = ('-user.entries',)

    def __repr__(self):
        return f'<Entry {self.id}, user ID {self.user_id}, content {self.content if len(self.content) <= 200 else self.content[:201]}>'

class Story(db.Model, SerializerMixin):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'), nullable=False)

    prompt = db.relationship('Prompt', back_populates='stories')
    entries = db.relationship('Entry', secondary=story_entries, back_populates='stories')

    serialize_rules = ('-prompt.stories', '-prompt.entries', '-entries.stories', '-entries.prompts')

    def __repr__(self):
        return f'<Story {self.id}, prompt ID {self.prompt_id}>'