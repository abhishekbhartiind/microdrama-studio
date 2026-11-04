# FastAPI service

Start the local MongoDB service (on this Mac: `brew services start mongodb-community`; alternatively use `docker compose up -d mongodb` from the repository root), then start the API from this directory with `uvicorn app.main:app --reload --port 8010`. Interactive API docs are available at `/docs`.

The service uses the `reelcraft` database and `dramas` collection by default. Configure `MONGODB_URI`, `MONGODB_DATABASE`, and `CORS_ORIGINS` in `.env`; a MongoDB Atlas connection string can be used for a hosted deployment. The API checks the MongoDB connection on startup and creates indexes for drama IDs and update time.
