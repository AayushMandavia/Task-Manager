import socketio
from app.core.config import settings

# Create a Socket.IO server with Redis manager
mgr = socketio.AsyncRedisManager(settings.CELERY_BROKER_URL)
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*', client_manager=mgr)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
