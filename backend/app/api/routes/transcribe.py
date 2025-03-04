from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status, Query
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.transcription_model import Transcription
from app.schemas.transcription_scehma import TranscriptionResponse, TranscriptionCreate
from app.services.whisper_service import transcribe_audio
from datetime import datetime
from typing import List

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Transcribes one or multiple audio files using Whisper and saves results to the database.
@router.post("/transcribe",response_model=TranscriptionCreate, status_code=status.HTTP_201_CREATED)
async def transcribe_endpoint(
    files: List[UploadFile] = File(...), 
    db: Session = Depends(get_db)
):
    transcriptions = []
    ignored_files = []

    for file in files:
        try:
            # Check if file already exists in the database
            existing = db.query(Transcription).filter(Transcription.file_name == file.filename).first()
            if existing:
                ignored_files.append(file.filename)
                continue  # Skip processing duplicate files


            # Read file content
            audio_data = await file.read()
            file_size = len(audio_data)

            # Ensure file is within allowed size (25MB max)
            if file_size > 25 * 1024 * 1024:
                raise HTTPException(status_code=413, detail=f"File {file.filename} is too large (Max: 25MB)")

            # Transcribe the audio
            text = transcribe_audio(audio_data)

            # Save transcription to the database
            new_transcription = Transcription(
                file_name=file.filename,
                transcribed_text=text,
                created_at=datetime.utcnow()
            )
            db.add(new_transcription)
            db.commit()
            db.refresh(new_transcription)

            # Append response
            transcriptions.append(file.filename)

        except HTTPException as http_err:
            raise http_err  # Forward HTTP exceptions
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error processing {file.filename}: {str(e)}"
            )

    return {"transcribed":transcriptions, 
            "exists":ignored_files}

# Retrieves all saved transcriptions from the database.
@router.get("/transcriptions", response_model=List[TranscriptionResponse], status_code=status.HTTP_200_OK)
async def get_transcriptions(db: Session = Depends(get_db)):
    try:
        transcriptions = db.query(Transcription).all()

        if not transcriptions:
            return []

        return transcriptions

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving transcriptions: {str(e)}"
        )


# Searches for transcriptions based on a partial filename match.
@router.get("/search", response_model=List[TranscriptionResponse], status_code=status.HTTP_200_OK)
async def search_transcriptions(
    filename: str = Query(..., min_length=1, description="Part of the filename to search for"),
    db: Session = Depends(get_db)
):
    try:
        # Ensure filename is a valid non-empty string before querying
        if not filename.strip():
            raise HTTPException(status_code=400, detail="Filename query cannot be empty")

        results = db.query(Transcription).filter(Transcription.file_name.ilike(f"%{filename}%")).all()

        if not results:
            raise HTTPException(status_code=404, detail= "No file found")

        return results

    except HTTPException as http_err:
        raise http_err  # Forward HTTP exceptions
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error searching transcriptions: {str(e)}"
        )
