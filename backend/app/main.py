from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.dramas import router as dramas_router
from app.api.v1.health import router as health_router
from app.core.config import Settings
from app.db.mongo import MongoDatabase
from app.repositories.drama_repository import MongoDramaRepository
from app.services.drama_service import DramaService

load_dotenv()
settings = Settings.from_environment()


@asynccontextmanager
async def lifespan(app: FastAPI):
    database = MongoDatabase(settings)
    database.connect()
    app.state.mongo_database = database
    app.state.drama_service = DramaService(MongoDramaRepository(database))
    try:
        yield
    finally:
        database.close()


app = FastAPI(
    title="Reelcraft Studio API",
    version="1.0.0",
    description="Manage one-minute micro drama reels and their timed scene scripts.",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_origins),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)
app.include_router(health_router, prefix=settings.api_prefix)
app.include_router(dramas_router, prefix=settings.api_prefix)
