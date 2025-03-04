# Stores SQLAlchemy models (table structures)
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Transcription(Base):
    __tablename__ = "transcriptions"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    transcribed_text = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)