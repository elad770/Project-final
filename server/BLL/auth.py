from flask_jwt_extended import (create_access_token)
from flask import jsonify

class AuthBLL:
    def __init__(self, db):
        self.db_users = db.users
        
    def login(self, email, password):
        user = self.db_users.find_one({'email': email})

        if user:
            # encode password
            if password == user['password']:
                access_token = create_access_token(identity=email)
                user_data = {'firstName': user['firstName'], 
                             'lastName': user['lastName'], 
                             'email': user['email'],
                             'role': user['role'], 
                             'access_token': access_token}
                return jsonify(user_data)
            return {"msg": "Wrong password"}, 401
        return {"msg": "Wrong email"}, 401