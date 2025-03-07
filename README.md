# xData Technical Test Attempt

I used vscode for my ide and bash for my terminal. All assumptions and considerations are listed in architecture.pdf to avoid cluttering the README.

## Run the backend and frontend (Docker Compose)

Clone the project using github desktop or git clone

Ensure Docker Destop is open and cd into the **PROJECT** folder (xData)

1. Run docker compose and wait until both containers start (backend takes longer to start)

```bash
  docker-compose up --build
```

2. To access the webpage

```bash
  Open http://localhost:5173/
```

3. To access the endpoints directly

```bash
  Open http://localhost:8000/docs
```

## Running Tests

**BACKEND**:

Open a new terminal and cd into the **BACKEND** folder of the project

1. Build the Docker Image for testing (Remember to turn on docker desktop)

```bash
  docker build -f Dockerfile.test -t fastapi-backend-tests .
```

2. Run the Container to run the tests

```bash
  docker run --rm fastapi-backend-tests
```

**FRONTEND**:

Open a new terminal and cd into the **FRONTEND** folder of the project

1. Build the Docker Image for testing (Remember to turn on docker desktop)

```bash
  docker build -f dockerfile.test -t react-frontend-tests .
```

2. Run the Container to run the tests

```bash
  docker run --rm react-frontend-tests

```
