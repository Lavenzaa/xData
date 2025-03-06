# xData Technical Test Attempt

I used vscode for my ide and bash for my terminal. All assumptions and considerations are listed in architecture.pdf to avoid cluttering the README.

## Run Locally (Backend)

How to Run the Backend with Docker (Remember to turn on docker desktop)

1. Build the Docker Image (Make sure to cd into the backend folder)

```bash
  docker build -t fastapi-backend .
```

2. Run the Container

```bash
  docker run -p 8000:8000 fastapi-backend
```

3. Access the API

```bash
  Open [http://localhost:8000/docs](http://localhost:8000/docs) to test the endpoints.
```

## Run Locally (Frontend)

How to Run the Frontend with Docker (Remember to turn on docker desktop)

1. Build the Docker Image (Make sure to cd into the frontend folder)

```bash
docker build -t react-frontend .
```

2. Run the Container

```bash
docker run -p 80:80 react-frontend
```

3. Access the frontend

```bash
http://localhost
```

## Running Tests

Backend:

First, make sure that another terminal is running the backend server currently.

Open a new terminal and cd into the backend folder of the project

Create and activate virtual environment

```bash
  python -m venv .venv
  source .venv/Scripts/activate
```

Install dependendencies if you haven't (optional)

```bash
  pip install -r requirements.txt
```

Run the tests

```bash
  pytest tests
```

Frontend:
