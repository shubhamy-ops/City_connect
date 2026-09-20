import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGO_URI
from utils.auth import get_password_hash
from datetime import datetime

async def seed_db():
    # Use proper db name
    db_name = MONGO_URI.split('/')[-1].split('?')[0] if '/' in MONGO_URI else "cityconnect"
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[db_name]

    # Clear existing data
    await db.users.delete_many({})
    await db.issues.delete_many({})
    print("Cleared existing data")

    # Insert Users
    admin_user = {
        "name": "Supervisor Chief Miller",
        "email": "miller@citygov.org",
        "password": get_password_hash("password123"),
        "role": "admin",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
    citizen_user = {
        "name": "Alex Rivera",
        "email": "alex.rivera@civicnet.org",
        "password": get_password_hash("password123"),
        "role": "citizen",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }

    await db.users.insert_one(admin_user)
    await db.users.insert_one(citizen_user)
    print("Users seeded!")

    # Insert Sample Issue
    now = datetime.utcnow()
    issues = [
        {
            "customId": "CITY-101",
            "title": "Severe Pothole on Main St",
            "description": "Large pothole causing traffic issues.",
            "category": "Roads & Infrastructure",
            "priority": "High",
            "location": {"address": "Main St", "lat": 37.77, "lng": -122.41},
            "image": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "status": "Reported",
            "assignedDepartment": "Public Works",
            "reporter": {"name": citizen_user["name"], "avatar": citizen_user["avatar"], "role": "citizen"},
            "upvotes": 0,
            "upvotedBy": [],
            "slaDueDate": now,
            "createdAt": now,
            "updatedAt": now,
            "timeline": [{
                "status": "Reported",
                "title": "Issue Submitted",
                "note": "Report registered",
                "timestamp": now,
                "actor": citizen_user["name"]
            }]
        }
    ]

    await db.issues.insert_many(issues)
    print("Issues seeded!")

if __name__ == "__main__":
    asyncio.run(seed_db())
