from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from BLL.users import UsersBLL
from pathlib import Path
import os
import random


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

            obj = request.form
            print(obj)

            # get_jwt_identity contains email of user current
            email = get_jwt_identity()
            self.user_bll.update_user_by_email(email, obj)
            user = self.user_bll.get_user_by_email(obj['email'])

            del user["_id"]
            if "password" in obj.keys():
                del user["password"]
            # create token new
            user["access_token"] = create_access_token(identity=obj['email'])
            return jsonify(user)

        # upload image

        @users.route("/uploadImage", methods=['post'])
        @jwt_required()
        def upload_image():
            try:
                file = request.files['file']
                email = get_jwt_identity()
                user = self.user_bll.get_user_by_email(email)
                UPLOAD_FOLDER = "{0}{1}".format(
                    Path(__file__).parent.parent, "/static/ImagesUsers")
                print("Path UPLOAD_FOLDER ", not os.path.isdir(UPLOAD_FOLDER))
                if not os.path.isdir(UPLOAD_FOLDER):
                    os.mkdir(UPLOAD_FOLDER)
                print("Path folder current ", Path(__file__).parent.parent)
                print("UPLOAD_FOLDER {}".format(UPLOAD_FOLDER))
                target = os.path.join(
                    UPLOAD_FOLDER, 'user{0}'.format(user['_id']))
                print("target {}".format(target))
                print("is not folder {}  & {}".format(not os.path.isdir(
                    UPLOAD_FOLDER), not os.path.isdir(target)))
                print(file.filename)
                if not os.path.isdir(target):
                    os.mkdir(target)
                print(users.root_path)
                # split file name In order to create a new name
                splitat = file.filename.rfind('.')
                left, right = file.filename[:splitat], file.filename[splitat:]
                #file_name_rand = str(random.randint(100000000, 500000000))
                #tr = 'http://192.168.199.1:8080/user_{0}'.format(user['_id'])
                # A concatenation of the original file name with the user id
                new_name_file = left + "_" + str(user['_id']) + right
                print(new_name_file)

                destination = "/".join([
                                       target, new_name_file])
                # destination2 = "/".join([
                #     tr, new_name_file])
                print(destination)
                file.save(destination)
                self.user_bll.update_user_by_email(
                    email, {"avatarUrl": destination})

            except Exception as e:
                print("error", e)
                return "error"
            print("succes")
            return "succes"

        # Delete user

        @users.route("/<id>", methods=['DELETE'])
        @jwt_required()
        def delete_user(id):
            return jsonify(self.user_bll.delete_user(id))

        return users
