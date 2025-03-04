# xData Technical Test Attempt

I used vscode for my ide and bash for my terminal.

## Run Locally (Backend)

Clone the project and go to the project directory

cd into the backend folder

Activate virtual environment

```bash
  source .venv/Scripts/activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  uvicorn app.main:app --reload
```

## Run Locally (Frontend)

## Running Tests

Backend:

First, make sure that another terminal is running the backend server currently.

Open a new terminal and cd into the backend folder of the project

Activate virtual environment

```bash
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
