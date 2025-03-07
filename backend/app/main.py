import os
import logging
from fastapi import FastAPI, Request
from datetime import datetime
from starlette.responses import Response
from app.api.routes.health import router as health_router
from app.api.routes.transcribe import router as transcribe_router
from app.db.database import init_db
from fastapi.middleware.cors import CORSMiddleware

CONST_PORT = os.getenv("CONST_PORT")

# Initialize database on startup
init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CONST_PORT],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="")
app.include_router(transcribe_router, prefix="")


#For logging endpoint calls
logging.basicConfig(
    level=logging.INFO,  # Log level set to INFO
    format="%(asctime)s - %(levelname)s - %(message)s",  # Log format
)

logger = logging.getLogger(__name__)

# Middleware to log request details
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = datetime.now()
    
    # Process the request
    response: Response = await call_next(request)
    
    # Log details
    logger.info(
        f"Endpoint: {request.url.path} | "
        f"Method: {request.method} | "
        f"Time: {start_time.strftime('%Y-%m-%d %H:%M:%S')} | "
        f"Status: {response.status_code}"
    )
    
    return response