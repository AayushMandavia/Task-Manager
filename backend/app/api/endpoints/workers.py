from fastapi import APIRouter
from app.workers.celery_app import celery_app

router = APIRouter()

@router.get("/")
def get_workers():
    # Simple introspection for celery workers
    try:
        i = celery_app.control.inspect()
        active = i.active()
        registered = i.registered()
        return {
            "active_workers": active if active else {},
            "registered_tasks": registered if registered else {}
        }
    except Exception as e:
        return {"error": str(e), "message": "Celery workers may not be running"}
