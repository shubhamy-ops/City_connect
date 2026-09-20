from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from database import get_database
from models.schemas import IssueCreate, IssueStatusUpdate, IssueVerify
from utils.auth import get_current_user
from datetime import datetime, timedelta
import random

router = APIRouter(prefix="/api/issues", tags=["issues"])

def serialize_issue(issue):
    issue["id"] = str(issue["_id"])
    return issue

@router.get("")
async def get_issues(status: Optional[str] = None, category: Optional[str] = None):
    db = get_database()
    query = {}
    if status:
        query["status"] = status
    if category:
        query["category"] = category
        
    cursor = db.issues.find(query).sort("createdAt", -1)
    issues = await cursor.to_list(length=100)
    return {"success": True, "data": [serialize_issue(i) for i in issues]}

@router.post("")
async def create_issue(issue_in: IssueCreate, current_user: dict = Depends(get_current_user)):
    db = get_database()
    now = datetime.utcnow()
    
    # Generate customId
    count = await db.issues.count_documents({})
    custom_id = f"CITY-{101 + count}"
    
    sla_due = now + timedelta(days=1)
    if issue_in.priority == "Urgent":
        sla_due = now + timedelta(hours=4)
    elif issue_in.priority == "High":
        sla_due = now + timedelta(hours=12)
        
    # Mock AI Detection
    confidence = round(random.uniform(0.88, 0.98), 2)
    ai_detection = {
        "category": issue_in.category,
        "confidence": confidence,
        "detectedObject": f"Detected {issue_in.category} Pattern"
    }

    issue_doc = {
        "customId": custom_id,
        "title": issue_in.title,
        "description": issue_in.description,
        "category": issue_in.category,
        "priority": issue_in.priority,
        "location": issue_in.location.dict(),
        "image": issue_in.image,
        "status": "Reported",
        "assignedDepartment": "Pending Allocation",
        "beforeAfterImage": {"before": issue_in.image, "after": None},
        "reporter": {
            "name": current_user["name"],
            "avatar": current_user.get("avatar"),
            "role": current_user["role"]
        },
        "upvotes": 1,
        "upvotedBy": [str(current_user["_id"])],
        "aiDetection": ai_detection,
        "slaDueDate": sla_due,
        "createdAt": now,
        "updatedAt": now,
        "timeline": [{
            "status": "Reported",
            "title": "Issue Submitted",
            "note": f"Report registered by {current_user['name']}. Auto-routing initiated.",
            "timestamp": now,
            "actor": current_user["name"]
        }]
    }
    
    result = await db.issues.insert_one(issue_doc)
    created_issue = await db.issues.find_one({"_id": result.inserted_id})
    
    return {"success": True, "data": serialize_issue(created_issue)}

@router.get("/{issue_id}")
async def get_issue(issue_id: str):
    db = get_database()
    # Support lookup by customId or _id
    query = {"customId": issue_id}
    issue = await db.issues.find_one(query)
    if not issue:
        try:
            from bson import ObjectId
            issue = await db.issues.find_one({"_id": ObjectId(issue_id)})
        except:
            pass
            
    if not issue:
        return {"success": False, "message": "Issue not found"}
    return {"success": True, "data": serialize_issue(issue)}

@router.patch("/{issue_id}/status")
async def update_status(issue_id: str, update_in: IssueStatusUpdate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "admin":
        return {"success": False, "message": "Not authorized as admin"}
        
    db = get_database()
    query = {"customId": issue_id}
    issue = await db.issues.find_one(query)
    if not issue:
        return {"success": False, "message": "Issue not found"}
        
    now = datetime.utcnow()
    update_data = {"updatedAt": now}
    
    if update_in.status: update_data["status"] = update_in.status
    if update_in.assignedDepartment: update_data["assignedDepartment"] = update_in.assignedDepartment
    if update_in.priority: update_data["priority"] = update_in.priority
    
    if update_in.afterImage:
        update_data["beforeAfterImage"] = issue.get("beforeAfterImage", {})
        update_data["beforeAfterImage"]["after"] = update_in.afterImage
        
    timeline_event = {
        "status": update_in.status or issue["status"],
        "title": f"Status updated to {update_in.status or issue['status']}",
        "note": update_in.note or "System status update",
        "timestamp": now,
        "actor": current_user["name"]
    }
    
    await db.issues.update_one(
        {"_id": issue["_id"]},
        {
            "$set": update_data,
            "$push": {"timeline": timeline_event}
        }
    )
    
    updated_issue = await db.issues.find_one({"_id": issue["_id"]})
    return {"success": True, "data": serialize_issue(updated_issue)}

@router.post("/{issue_id}/upvote")
async def upvote(issue_id: str, current_user: dict = Depends(get_current_user)):
    db = get_database()
    issue = await db.issues.find_one({"customId": issue_id})
    if not issue:
        return {"success": False, "message": "Issue not found"}
        
    user_id_str = str(current_user["_id"])
    upvoted_by = issue.get("upvotedBy", [])
    
    if user_id_str in upvoted_by:
        upvoted_by.remove(user_id_str)
        upvoted = False
    else:
        upvoted_by.append(user_id_str)
        upvoted = True
        
    new_count = len(upvoted_by)
    
    await db.issues.update_one(
        {"_id": issue["_id"]},
        {"$set": {"upvotedBy": upvoted_by, "upvotes": new_count}}
    )
    
    return {"success": True, "upvotes": new_count, "upvoted": upvoted}

@router.post("/{issue_id}/verify")
async def verify(issue_id: str, verify_in: IssueVerify, current_user: dict = Depends(get_current_user)):
    db = get_database()
    issue = await db.issues.find_one({"customId": issue_id})
    if not issue:
        return {"success": False, "message": "Issue not found"}
        
    if issue["reporter"]["name"] != current_user["name"]:
        return {"success": False, "message": "Only the reporter can verify this issue"}
        
    now = datetime.utcnow()
    new_status = "Verified" if verify_in.action == "verify" else "In Progress"
    title = "Verified by Citizen" if verify_in.action == "verify" else "Reopened by Citizen"
    default_note = "Resolution confirmed." if verify_in.action == "verify" else "Incomplete fix flagged."
    
    timeline_event = {
        "status": new_status,
        "title": title,
        "note": verify_in.feedbackNote or default_note,
        "timestamp": now,
        "actor": f"{current_user['name']} (Citizen)"
    }
    
    await db.issues.update_one(
        {"_id": issue["_id"]},
        {
            "$set": {"status": new_status, "updatedAt": now},
            "$push": {"timeline": timeline_event}
        }
    )
    
    updated_issue = await db.issues.find_one({"_id": issue["_id"]})
    return {"success": True, "data": serialize_issue(updated_issue)}
