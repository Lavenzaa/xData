import sqlite3
from fastapi import APIRouter, HTTPException
import torch
from transformers import WhisperProcessor, WhisperForConditionalGeneration

# Pre-loaded whisper model
processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
forced_decoder_ids = processor.get_decoder_prompt_ids(language="english", task="transcribe")
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

router = APIRouter()

@router.get("/health", summary="Health Check", description="Returns the status of the service including dependencies (sqlite and whisper-tiny)")
async def health_check():
    errors = {}

     # Check SQLite database connectivity and table existence
    try:
        conn = sqlite3.connect("transcriptions.db")
        cursor = conn.cursor()
        # Check that the 'transcriptions' table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='transcriptions';")
        if not cursor.fetchone():
            raise Exception("Required table 'transcriptions' does not exist")
        conn.close()
    except Exception as e:
        errors["database"] = f"Database connectivity check failed: {e}"

    # Check Whisper-tiny model and processor availability
    try:
        # Check that the processor and model are not None
        if processor is None:
            raise Exception("Processor not loaded")
        if model is None:
            raise Exception("Model not loaded")
    except Exception as e:
        errors["whisper-tiny"] = f"Whisper-tiny connectivity failed: {e}"

    if errors:
        # Return a detailed error message specifying which dependency failed.
        raise HTTPException(status_code=503, detail=errors)

    return {"status": "OK"}
