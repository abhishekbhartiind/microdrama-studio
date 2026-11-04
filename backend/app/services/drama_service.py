from typing import List, Optional

from app.repositories.drama_repository import DramaRepository
from app.schemas.dramas import DramaRead, DramaStatus, DramaWrite


class DramaNotFoundError(Exception):
    pass


class DramaRuleError(Exception):
    pass


class DramaService:
    def __init__(self, repository: DramaRepository) -> None:
        self._repository = repository

    def list_dramas(
        self, query: str, status: Optional[DramaStatus], limit: int, offset: int
    ) -> List[DramaRead]:
        return self._repository.list(
            query=query, status=status.value if status else None, limit=limit, offset=offset
        )

    def get_drama(self, drama_id: str) -> DramaRead:
        drama = self._repository.get(drama_id)
        if drama is None:
            raise DramaNotFoundError(drama_id)
        return drama

    def create_drama(self, payload: DramaWrite) -> DramaRead:
        self._validate_transition(payload)
        return self._repository.create(payload)

    def update_drama(self, drama_id: str, payload: DramaWrite) -> DramaRead:
        self._validate_transition(payload)
        drama = self._repository.update(drama_id, payload)
        if drama is None:
            raise DramaNotFoundError(drama_id)
        return drama

    def delete_drama(self, drama_id: str) -> None:
        if not self._repository.delete(drama_id):
            raise DramaNotFoundError(drama_id)

    @staticmethod
    def _validate_transition(payload: DramaWrite) -> None:
        if payload.status == DramaStatus.ready and not payload.scenes:
            raise DramaRuleError("Ready dramas need at least one scene.")
        runtime = sum(scene.duration_seconds for scene in payload.scenes)
        if payload.status == DramaStatus.ready and runtime > 60:
            raise DramaRuleError("Ready dramas must fit the 60-second target.")
