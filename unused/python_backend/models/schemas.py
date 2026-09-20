from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str = "citizen"
    avatar: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    token: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Location(BaseModel):
    address: str
    lat: float
    lng: float

class TimelineEvent(BaseModel):
    status: str
    title: str
    note: str
    timestamp: datetime
    actor: str

class IssueCreate(BaseModel):
    title: str
    description: str
    category: str
    priority: str = "Medium"
    location: Location
    image: str

class IssueStatusUpdate(BaseModel):
    status: Optional[str] = None
    assignedDepartment: Optional[str] = None
    priority: Optional[str] = None
    note: Optional[str] = None
    afterImage: Optional[str] = None

class IssueVerify(BaseModel):
    action: str  # 'verify' or 'reopen'
    feedbackNote: Optional[str] = None

class IssueResponse(BaseModel):
    id: str # Usually populated with customId or str(_id)
    customId: str
    title: str
    description: str
    category: str
    priority: str
    status: str
    assignedDepartment: str
    location: Location
    image: str
    beforeAfterImage: Optional[dict] = None
    reporter: dict
    upvotes: int
    upvotedBy: List[str]
    aiDetection: Optional[dict] = None
    slaDueDate: datetime
    createdAt: datetime
    updatedAt: datetime
    timeline: List[TimelineEvent]
