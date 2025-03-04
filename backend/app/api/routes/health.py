from fastapi import APIRouter

router = APIRouter()

@router.get("/transcriptions")
def get_all_transcriptions():
    return "Here ya go"

@router.get("/search")
def search_transcriptions():
    return "Searching"

@router.get("/health")
def health_check():
    return {"status": "OK"}
