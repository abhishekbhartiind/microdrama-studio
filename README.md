# Reelcraft Studio

A responsive studio for planning and managing one-minute micro drama reels. The repository contains a Next.js + TypeScript + Tailwind frontend and a FastAPI backend.

## Product

Creators can browse their drama projects, search and filter them, start a new episode, and update a linked one-minute video reel and its structured script with scenes, dialogue, timing, and production notes. Video files are linked by URL in this MVP. The dashboard reads and writes dramas through the FastAPI service. The backend stores drama records in MongoDB.

## Run locally

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

### MongoDB

The app connects to `mongodb://localhost:27017`. On this Mac, start the installed local service with `brew services start mongodb-community`. Alternatively, run a local MongoDB container with Docker Compose:

```bash
docker compose up -d mongodb
```

### Backend

```bash
cd backend
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8010
```

See [docs/](docs/) for the PRD, high-level design, and low-level design.
