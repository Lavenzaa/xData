# Handles database connection and table creation
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.transcription_model import Base


# SQLite Database URL
DATABASE_URL = "sqlite:///./transcriptions.db"

# Create database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables in database
def init_db():
    Base.metadata.create_all(bind=engine)
