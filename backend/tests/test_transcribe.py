import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Tests that a text file is rejected by the Post/transcribe endpoint.
def test_reject_text_file():
    # Create a fake text file
    fake_txt = io.BytesIO(b"This is a text file, not audio.")
    fake_txt.name = "fake.txt"

    response = client.post("/transcribe", files={"files": ("fake.txt", fake_txt, "text/plain")})

    print(response.json())

    assert response.status_code == 500
    assert "Error processing fake.txt" in response.json()["detail"]
