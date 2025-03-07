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

1. Build the Docker Image for testing (Remember to turn on docker desktop)

```bash
  docker build -f Dockerfile.test -t fastapi-backend-tests .
```

2. Run the Container to run the tests

```bash
  docker run --rm fastapi-backend-tests
```

Frontend:

First, make sure that another terminal is running the frontend server currently.

Open a new terminal and cd into the frontend folder of the project

1. Build the Docker Image for testing (Remember to turn on docker desktop)

```bash
  docker build -f dockerfile.test -t react-frontend-tests .
```

2. Run the Container to run the tests

```bash
  docker run --rm react-frontend-tests

```
