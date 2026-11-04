from pymongo import ASCENDING, DESCENDING, MongoClient
from pymongo.collection import Collection

from app.core.config import Settings


class MongoDatabase:
    def __init__(self, settings: Settings) -> None:
        self._client = MongoClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=5000,
            tz_aware=True,
        )
        self._database = self._client[settings.mongodb_database]

    @property
    def dramas(self) -> Collection:
        return self._database["dramas"]

    def connect(self) -> None:
        self._client.admin.command("ping")
        self.dramas.create_index([("status", ASCENDING), ("updated_at", DESCENDING)])
        self.dramas.create_index([("updated_at", DESCENDING)])

    def close(self) -> None:
        self._client.close()

    def ping(self) -> bool:
        self._client.admin.command("ping")
        return True
