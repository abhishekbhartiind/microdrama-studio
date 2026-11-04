import re
from datetime import datetime, timezone
from typing import List, Optional, Protocol
from uuid import uuid4

from pymongo import DESCENDING, ReturnDocument

from app.db.mongo import MongoDatabase
from app.schemas.dramas import DramaRead, DramaWrite


class DramaRepository(Protocol):
    def list(
        self, query: str = "", status: Optional[str] = None, limit: int = 100, offset: int = 0
    ) -> List[DramaRead]: ...
    def get(self, drama_id: str) -> Optional[DramaRead]: ...
    def create(self, payload: DramaWrite) -> DramaRead: ...
    def update(self, drama_id: str, payload: DramaWrite) -> Optional[DramaRead]: ...
    def delete(self, drama_id: str) -> bool: ...


class MongoDramaRepository:
    def __init__(self, database: MongoDatabase) -> None:
        self._collection = database.dramas

    @staticmethod
    def _to_read(document: Optional[dict]) -> Optional[DramaRead]:
        if document is None:
            return None
        drama_id = str(document.pop("_id"))
        return DramaRead(id=drama_id, **document)

    @staticmethod
    def _to_document(payload: DramaWrite, created_at: datetime, updated_at: datetime) -> dict:
        return {
            **payload.model_dump(mode="json"),
            "created_at": created_at,
            "updated_at": updated_at,
        }

    def list(
        self, query: str = "", status: Optional[str] = None, limit: int = 100, offset: int = 0
    ) -> List[DramaRead]:
        filters: dict = {}
        if status:
            filters["status"] = status
        if query.strip():
            pattern = re.escape(query.strip())
            filters["$or"] = [
                {"title": {"$regex": pattern, "$options": "i"}},
                {"logline": {"$regex": pattern, "$options": "i"}},
                {"genre": {"$regex": pattern, "$options": "i"}},
            ]
        cursor = (
            self._collection.find(filters).sort("updated_at", DESCENDING).skip(offset).limit(limit)
        )
        return [self._to_read(document) for document in cursor]

    def get(self, drama_id: str) -> Optional[DramaRead]:
        return self._to_read(self._collection.find_one({"_id": drama_id}))

    def create(self, payload: DramaWrite) -> DramaRead:
        now = datetime.now(timezone.utc)
        document = self._to_document(payload, created_at=now, updated_at=now)
        document["_id"] = str(uuid4())
        self._collection.insert_one(document)
        drama = self._to_read(document)
        assert drama is not None
        return drama

    def update(self, drama_id: str, payload: DramaWrite) -> Optional[DramaRead]:
        existing = self._collection.find_one({"_id": drama_id}, {"created_at": 1})
        if existing is None:
            return None
        replacement = self._to_document(
            payload, created_at=existing["created_at"], updated_at=datetime.now(timezone.utc)
        )
        updated = self._collection.find_one_and_replace(
            {"_id": drama_id}, replacement, return_document=ReturnDocument.AFTER
        )
        return self._to_read(updated)

    def delete(self, drama_id: str) -> bool:
        return self._collection.delete_one({"_id": drama_id}).deleted_count == 1
