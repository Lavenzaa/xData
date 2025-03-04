from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Test ensuring empty search is invalid for Get/search endpoint
def test_empty_search_parameter():
    response = client.get("/search?filename= ")

    print(response.json())

    assert response.status_code == 400
    assert response.json() == {'detail': 'Filename query cannot be empty'}