# Stores Pydantic models for request validation and API responses
from pydantic import BaseModel
from datetime import datetime

class TranscriptionBase(BaseModel):
    file_name: str
    transcribed_text: str

class TranscriptionCreate(TranscriptionBase):
    pass  # Used when creating a new transcription

class TranscriptionResponse(TranscriptionBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True  # Allows returning ORM objects as JSON
