from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from app.websockets.socket_server import sio
from app.db.database import engine, Base
from app.api.endpoints import tasks, auth, workers

app = FastAPI(title="Distributed Task Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Socket.IO to FastAPI app
socket_app = socketio.ASGIApp(sio)
app.mount("/ws", socket_app)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(workers.router, prefix="/api/workers", tags=["workers"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Create tables
        await conn.run_sync(Base.metadata.create_all)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
