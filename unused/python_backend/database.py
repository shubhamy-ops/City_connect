import motor.motor_asyncio
from config import MONGO_URI

# Ensure we use the proper db name from the URI or default
db_name = MONGO_URI.split('/')[-1].split('?')[0] if '/' in MONGO_URI else "cityconnect"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[db_name]

def get_database():
    return db
