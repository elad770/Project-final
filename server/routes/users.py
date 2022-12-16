from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from BLL.users import UsersBLL


class UsersRoute:
    def __init__(self, db):
        self.users_blp = self.create_blp()
        self.user_bll = UsersBLL(db)

    def create_blp(self):
        users = Blueprint('users', __name__)

        # Get all users
        @users.route("/", methods=['GET'])
        @jwt_required()
        def get_all_users():
            return jsonify(self.user_bll.get_all_users())

        # Get user by id
        @users.route("/<id>", methods=['GET'])
        @jwt_required()
        def get_user(id):
            return jsonify(self.user_bll.get_user(id))

        # Create a new user
        @users.route("/", methods=['POST'])
        def add_user():
            obj = request.json
            return self.user_bll.add_user(obj)

        # Update user

        @users.route("/update", methods=['put'])
        @jwt_required()
        def update_user():
            # # print((request.json))
            # print(request.data)

            obj = request.form
            print(obj, "data of update")
            # get_jwt_identity contains email of user current
            email = get_jwt_identity()
            self.user_bll.update_user_by_email(email, obj)
            user = self.user_bll.get_user_by_email(obj['email'])

            del user["_id"]
            del user["password"]
            # create token new
            user["access_token"] = create_access_token(identity=obj['email'])
            return jsonify(user)

        # Delete user

        @users.route("/<id>", methods=['DELETE'])
        @jwt_required()
        def delete_user(id):
            return jsonify(self.user_bll.delete_user(id))

        return users
