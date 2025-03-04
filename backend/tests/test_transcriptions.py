from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Test checking that the endpoint Get/transcriptions is working, ensures that a list is returned
def test_get_transcriptions():
    response = client.get("/transcriptions")

    print(response.json())
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)