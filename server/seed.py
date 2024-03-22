#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Prompt, story_entries, Entry, Story

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        print("Deleting data...")
        User.query.delete()
        Prompt.query.delete()
        Entry.query.delete()
        Story.query.delete()

        print("Creating users...")
        gibran = User(name='Khalil Gibran', password='1234')
        hesse = User(name='Hermann Hesse', password='password')
        melville = User(name='Herman Melville', password='4321')
        marquez = User(name='Gabriel García Márquez', password='5678')
        users = [gibran, hesse, melville, marquez]
        db.session.add_all(users)
        db.session.commit()


        print("Creating prompts...")
        prophet = Prompt(title='The Prophet',
               content='The prophet Al Mustafa has lived in the city of Orphalese for 12 years and is about to board a ship which will carry him home. He is stopped by a group of people, with whom he discusses topics such as life and the human condition.',
               user_id=gibran.id)
        narcissus = Prompt(title='Narcissus and Goldmund',
               content='A young man, Goldmund, who wanders aimlessly throughout Medieval Germany after leaving a Catholic monastery school in search of what could be described as "the meaning of life".',
               user_id=hesse.id)
        moby = Prompt(title='Moby-Dick',
               content='the sailor Ishmael\'s narrative of the maniacal quest of Ahab, captain of the whaling ship Pequod, for vengeance against Moby Dick, the giant white sperm whale that bit off his leg on the ship\'s previous voyage.',
               user_id=melville.id)
        solitude = Prompt(title='One Hundred Years of Solitude',
               content='the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the fictitious town of Macondo.',
               user_id=marquez.id)
        prompts = [prophet, narcissus, moby, solitude]
        db.session.add_all(prompts)
        
        print('Creating entries...')
        Entry()

        db.session.commit()
        print('Seeding done!')