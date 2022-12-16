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

        return auth
