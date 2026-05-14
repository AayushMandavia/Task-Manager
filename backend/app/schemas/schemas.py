from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.db.models import TaskStatus, TaskPriority

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TaskBase(BaseModel):
    title: str
    description: str | None = None
    priority: TaskPriority = TaskPriority.MEDIUM

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    status: TaskStatus
    created_at: datetime
    updated_at: datetime
    celery_task_id: str | None = None
    owner_id: int
    
    class Config:
        from_attributes = True

class TaskLogResponse(BaseModel):
    id: int
    task_id: int
    log_message: str
    created_at: datetime
    
    class Config:
        from_attributes = True
