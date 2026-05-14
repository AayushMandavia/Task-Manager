from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.database import get_db
from app.db.models import Task, User
from app.schemas.schemas import TaskCreate, TaskResponse
from app.api.endpoints.auth import get_current_user
from app.workers.tasks import process_data_task

router = APIRouter()

@router.post("/", response_model=TaskResponse)
async def create_task(task_in: TaskCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = Task(
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority,
        owner_id=current_user.id
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    
    # Dispatch Celery Task
    celery_task = process_data_task.delay(task.id, 10)
    task.celery_task_id = celery_task.id
    await db.commit()
    await db.refresh(task)
    
    return task

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.owner_id == current_user.id).order_by(Task.created_at.desc()))
    return result.scalars().all()

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.owner_id == current_user.id))
    task = result.scalars().first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Task).where(Task.id == task_id, Task.owner_id == current_user.id))
    task = result.scalars().first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await db.delete(task)
    await db.commit()
    return {"message": "Task deleted successfully"}
