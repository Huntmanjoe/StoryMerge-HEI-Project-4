# Standard library imports

# Remote library imports
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# before deploying, this key will have to be hidden in a config file or environment variable
app.secret_key = b':\x85\\\xce\xc7\x1b\x05\xe4E\xe5k\xc3d\x06\x9f\x9d'
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db, render_as_batch=True) # added to see if alter table will work
db.init_app(app)

# Instantiate REST API
api = Api(app)
bcrypt = Bcrypt(app)

# Instantiate CORS
CORS(app)
