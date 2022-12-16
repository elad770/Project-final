from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

ACCESS_EXPIRES = timedelta(hours=1)

MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
# JWT_SECRET_KEY = os.getenv("SECRET_KEY")
JWT_ACCESS_TOKEN_EXPIRES = ACCESS_EXPIRES
