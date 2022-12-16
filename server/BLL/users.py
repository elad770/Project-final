from flask_jwt_extended import (create_access_token)
from bson import ObjectId
from flask import jsonify


class UsersBLL:
    def __init__(self, db):
        self.users = db.users

    def get_all_users(self):
        users = list(self.users.find({}))
        return users

    def get_user(self, id):
        user = self.users.find_one({"_id": ObjectId(id)})
        return user

    def get_user_by_email(self, email):
        user = self.users.find_one({"email": email})
        return user

    def add_user(self, obj):
        user = self.users.find_one({'email': obj['email']})

        if not user:
            obj['role'] = "User"
            self.users.insert_one(obj)

            obj['access_token'] = create_access_token(identity=obj['email'])

            return jsonify(obj)
        return jsonify({"msg": "This email is already in use"}), 401

    def update_user(self, id, obj):
        self.users.update_one({"_id": ObjectId(id)}, {"$set": obj})
        return 'Updated!'

    def update_user_by_email(self, email, obj):
        self.users.update_one({"email": email}, {"$set": obj})
        return 'Updated!'

    def delete_user(self, id):
        self.users.delete_one({"_id": ObjectId(id)})
        return 'Deleted!'
