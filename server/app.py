from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo
import json
from bson import ObjectId
from routes.users import UsersRoute
from routes.auth import AuthRoute


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)

app.config.from_object('config')
jwt = JWTManager(app)
app.json_encoder = JSONEncoder
CORS(app)
app.url_map.strict_slashes = False
mongo = PyMongo(app)

users = UsersRoute(mongo.db)
auth = AuthRoute(mongo.db)
app.register_blueprint(users.users_blp, url_prefix="/users")
app.register_blueprint(auth.auth_blp, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
