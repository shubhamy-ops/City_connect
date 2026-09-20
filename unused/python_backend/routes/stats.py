from fastapi import APIRouter
from database import get_database
from datetime import datetime

router = APIRouter(prefix="/api/stats", tags=["stats"])

@router.get("")
async def get_stats():
    db = get_database()
    total = await db.issues.count_documents({})
    reported = await db.issues.count_documents({"status": "Reported"})
    in_progress = await db.issues.count_documents({"status": {"$in": ["In Progress", "Assigned"]}})
    resolved = await db.issues.count_documents({"status": {"$in": ["Fixed", "Verified"]}})
    
    now = datetime.utcnow()
    overdue_count = await db.issues.count_documents({
        "status": {"$nin": ["Fixed", "Verified"]},
        "slaDueDate": {"$lt": now}
    })
    
    resolution_rate = round((resolved / total) * 100) if total > 0 else 0
    
    # Calculate avgResolutionHours and weeklyResolutionData
    cursor = db.issues.find({"status": {"$in": ["Fixed", "Verified"]}})
    resolved_issues = await cursor.to_list(length=1000)
    
    total_hours = 0
    resolved_count = 0
    weekly_counts = {"Sun": 0, "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0}
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    for issue in resolved_issues:
        timeline = issue.get("timeline", [])
        reported_event = next((t for t in timeline if t["status"] == "Reported"), None)
        fixed_event = next((t for t in timeline if t["status"] == "Fixed"), None)
        
        if reported_event and fixed_event:
            diff_ms = fixed_event["timestamp"].timestamp() - reported_event["timestamp"].timestamp()
            total_hours += diff_ms / 3600
            resolved_count += 1
            
        if fixed_event:
            # Python weekday() gives 0 for Monday. My days array maps 0 to Mon.
            day_name = days[fixed_event["timestamp"].weekday()]
            weekly_counts[day_name] += 1
            
    avg_resolution_hours = round(total_hours / resolved_count, 1) if resolved_count > 0 else 0
    max_count = max(max(weekly_counts.values()), 1)
    
    weekly_resolution_data = []
    for day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']:
        count = weekly_counts[day]
        weekly_resolution_data.append({
            "day": day,
            "count": count,
            "height": f"{round((count / max_count) * 100)}%"
        })
        
    return {
        "success": True,
        "stats": {
            "total": total,
            "reported": reported,
            "inProgress": in_progress,
            "resolved": resolved,
            "overdueCount": overdue_count,
            "resolutionRate": resolution_rate,
            "avgResolutionHours": avg_resolution_hours,
            "weeklyResolutionData": weekly_resolution_data
        }
    }
