# Stores Pydantic models for request validation and API responses
from typing import List
from pydantic import BaseModel
from datetime import datetime

class TranscriptionBase(BaseModel):
    file_name: str
    transcribed_text: str

class TranscriptionCreate(BaseModel):
    transcribed: List[str]
    exists: List[str]

class TranscriptionResponse(TranscriptionBase):
    id: int
    created_at: datetime