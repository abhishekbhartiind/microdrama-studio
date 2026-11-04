import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    mongodb_uri: str
    mongodb_database: str
    cors_origins: tuple[str, ...]
    api_prefix: str = "/api/v1"

    @classmethod
    def from_environment(cls) -> "Settings":
        origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
        return cls(
            mongodb_uri=os.getenv("MONGODB_URI", "mongodb://localhost:27017"),
            mongodb_database=os.getenv("MONGODB_DATABASE", "reelcraft"),
            cors_origins=tuple(origin.strip() for origin in origins.split(",") if origin.strip()),
        )
