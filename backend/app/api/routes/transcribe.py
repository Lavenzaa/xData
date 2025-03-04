from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    return {"message": f"Received {file.filename}"}
