import time
import asyncio
from app.workers.celery_app import celery_app
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.db.models import Task, TaskLog, TaskStatus
from app.core.config import settings
import socketio

# Setup sync Redis manager to emit events from synchronous Celery worker
socket_mgr = socketio.RedisManager(settings.CELERY_BROKER_URL)

engine = create_async_engine(settings.DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def _update_task_status(task_id: int, status: TaskStatus):
    async with AsyncSessionLocal() as session:
        task = await session.get(Task, task_id)
        if task:
            task.status = status
            session.add(task)
            await session.commit()
            # Emit socket event
            socket_mgr.emit('task_update', {'task_id': task_id, 'status': status.value})

async def _add_task_log(task_id: int, message: str):
    async with AsyncSessionLocal() as session:
        log = TaskLog(task_id=task_id, log_message=message)
        session.add(log)
        await session.commit()

def run_async(coro):
    loop = asyncio.get_event_loop()
    return loop.run_until_complete(coro)

@celery_app.task(bind=True, name="app.workers.tasks.process_data_task")
def process_data_task(self, task_id: int, duration: int = 10):
    try:
        run_async(_update_task_status(task_id, TaskStatus.IN_PROGRESS))
        run_async(_add_task_log(task_id, "Worker started processing task."))
        
        # Simulate work
        for i in range(duration):
            time.sleep(1)
            self.update_state(state='PROGRESS', meta={'current': i, 'total': duration})
            if i % 2 == 0:
                run_async(_add_task_log(task_id, f"Processing... {i}/{duration} steps complete."))
                
        run_async(_update_task_status(task_id, TaskStatus.COMPLETED))
        run_async(_add_task_log(task_id, "Task completed successfully."))
        return {'status': 'completed', 'total': duration}
    except Exception as e:
        run_async(_update_task_status(task_id, TaskStatus.FAILED))
        run_async(_add_task_log(task_id, f"Task failed: {str(e)}"))
        raise e
