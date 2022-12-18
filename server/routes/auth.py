from flask import Blueprint, jsonify, request
from BLL.auth import AuthBLL

auth = Blueprint('auth', __name__)


class AuthRoute:
    def __init__(self, db):
        self.auth_blp = self.create_blp()
        self.auth_bll = AuthBLL(db)

    def create_blp(self):
        auth = Blueprint('auth', __name__)

        @auth.route("/login", methods=["POST"])
        def login():
            email = request.json.get("email", None)
            password = request.json.get("password", None)

            return self.auth_bll.login(email, password)

        @auth.route("/loginGoogle", methods=['POST'])
        def login_google():
            new_obj = {}
            obj = request.json
            #split_name = str(obj['name']).split()
            new_obj['firstName'] = str(obj['name'])
            # new_obj['firstName'] = split_name[0]
            # new_obj['lastName'] = split_name[1]
            new_obj['email'] = obj['email']
            new_obj['avatarUrl'] = obj['imageUrl']
            new_obj["access_token"] = ""
            return self.auth_bll.login_google(new_obj)

        return auth
