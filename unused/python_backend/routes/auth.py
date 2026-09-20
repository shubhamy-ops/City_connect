from fastapi import APIRouter, HTTPException, status, Depends
from models.schemas import UserCreate, UserResponse, LoginRequest
from utils.auth import get_password_hash, verify_password, create_access_token, get_current_user
from database import get_database
from bson import ObjectId

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=dict)
async def register(user_in: UserCreate):
    db = get_database()
    if await db.users.find_one({"email": user_in.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_dict = user_in.dict()
    user_dict["password"] = get_password_hash(user_dict.pop("password"))
    
    new_user = await db.users.insert_one(user_dict)
    
    created_user = await db.users.find_one({"_id": new_user.inserted_id})
    
    # Generate token
    token = create_access_token({"id": str(created_user["_id"]), "role": created_user["role"]})
    created_user["id"] = str(created_user["_id"])
    created_user["token"] = token
    
    return {"success": True, "data": created_user}

@router.post("/login", response_model=dict)
async def login(login_data: LoginRequest):
    db = get_database()
    user = await db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password"]):
        # Keep same message as node backend
        return {"success": False, "message": "Invalid email or password"}
    
    token = create_access_token({"id": str(user["_id"]), "role": user["role"]})
    user["id"] = str(user["_id"])
    user["token"] = token
    
    # Exclude password
    del user["password"]
    
    return {"success": True, "data": user}

@router.get("/me", response_model=dict)
async def get_me(current_user: dict = Depends(get_current_user)):
    del current_user["password"]
    return {"success": True, "data": current_user}
