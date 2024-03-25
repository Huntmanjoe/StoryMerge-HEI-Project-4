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
       db.session.query(story_entries).delete()
       db.session.commit()
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
       p1 = Entry(content="""Almustafa, the chosen and the beloved, who was a dawn unto his own day, had waited twelve years in the city of Orphalese for his ship that was to return and bear him back to the isle of his birth.

And in the twelfth year, on the seventh day of Ielool, the month of reaping, he climbed the hill without the city walls and looked seaward; and he beheld his ship coming with the mist.

Then the gates of his heart were flung open, and his joy flew far over the sea. And he closed his eyes and prayed in the silences of his soul.""",
                   user_id=gibran.id)
       p2 = Entry(content="""But as he descended the hill, a sadness came upon him, and he thought in his heart:

How shall I go in peace and without sorrow? Nay, not without a wound in the spirit shall I leave this city. Long were the days of pain I have spent within its walls, and long were the nights of aloneness; and who can depart from his pain and his aloneness without regret?

Too many fragments of the spirit have I scattered in these streets, and too many are the children of my longing that walk naked among these hills, and I cannot withdraw from them without a burden and an ache.

It is not a garment I cast off this day, but a skin that I tear with my own hands.

Nor is it a thought I leave behind me, but a heart made sweet with hunger and with thirst.""",
                   user_id=gibran.id)
       n1 = Entry(content="""
Outside the entrance of the Mariabronn cloister, whose rounded
arch rested on slim double columns, a chestnut tree stood close to
the road. It was a sweet chestnut, with a sturdy trunk and a full
round crown that swayed gently in the wind, brought from Italy
many years earlier by a monk who had made a pilgrimage to
Rome. In the spring it waited until all the surrounding trees were
green, and even the hazel and walnut trees were wearing ruddy
foliage, before sprouting its own first leaves; then, during the
shortest nights of the year, it drove the delicate white-green rays of
its exotic blossoms out through tufts of leaves, filling the air with an
admonishing and pungent fragrance. In October, after the grape
and apple harvests, the autumn wind shook the prickly chestnuts
out of the tree's burnished gold crown; the cloister students would
scramble and fight for the nuts, and Prior Gregory, who came from
the south, roasted them in the fireplace in his room. The beautiful
treetop—secret kin to the portal's slender sandstone columns and
the stone ornaments of the window vaults and pillars, loved by the
Savoyards and Latins—swayed above the cloister entrance, a
conspicuous outsider in the eyes of the natives.""",
                     user_id=hesse.id)
       entries = [p1, p2, n1]
       db.session.add_all(entries)

       print('Creating stories...')
       p_orig = Story(prompt=prophet)
       p_orig.entries.append(p1)
       p_orig.entries.append(p2)
       #could do appending in either direction (appending stories to entries)
       n_orig = Story(prompt=narcissus)
       n_orig.entries.append(n1)
       stories = [p_orig, n_orig]
       db.session.add_all(stories)

       db.session.commit()
       print('Seeding done!')