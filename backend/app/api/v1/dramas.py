from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status

from app.api.v1.dependencies import get_drama_service
from app.schemas.dramas import DramaRead, DramaStatus, DramaWrite
from app.services.drama_service import DramaNotFoundError, DramaRuleError, DramaService

router = APIRouter(prefix="/dramas", tags=["dramas"])


def translate_service_error(error: Exception) -> HTTPException:
    if isinstance(error, DramaNotFoundError):
        return HTTPException(status_code=404, detail="Drama not found")
    if isinstance(error, DramaRuleError):
        return HTTPException(status_code=422, detail=str(error))
    return HTTPException(status_code=500, detail="Unexpected drama service error")


@router.get("", response_model=List[DramaRead], summary="List and search dramas")
def list_dramas(
    query: str = Query(default="", max_length=120),
    drama_status: Optional[DramaStatus] = Query(default=None, alias="status"),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    service: DramaService = Depends(get_drama_service),
) -> List[DramaRead]:
    return service.list_dramas(query=query, status=drama_status, limit=limit, offset=offset)


@router.get("/{drama_id}", response_model=DramaRead, summary="Get one drama")
def get_drama(drama_id: str, service: DramaService = Depends(get_drama_service)) -> DramaRead:
    try:
        return service.get_drama(drama_id)
    except DramaNotFoundError as error:
        raise translate_service_error(error) from error


@router.post(
    "", response_model=DramaRead, status_code=status.HTTP_201_CREATED, summary="Create a drama"
)
def create_drama(
    payload: DramaWrite, service: DramaService = Depends(get_drama_service)
) -> DramaRead:
    try:
        return service.create_drama(payload)
    except DramaRuleError as error:
        raise translate_service_error(error) from error


@router.put("/{drama_id}", response_model=DramaRead, summary="Replace a drama")
def update_drama(
    drama_id: str,
    payload: DramaWrite,
    service: DramaService = Depends(get_drama_service),
) -> DramaRead:
    try:
        return service.update_drama(drama_id, payload)
    except (DramaNotFoundError, DramaRuleError) as error:
        raise translate_service_error(error) from error


@router.delete("/{drama_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a drama")
def delete_drama(drama_id: str, service: DramaService = Depends(get_drama_service)) -> Response:
    try:
        service.delete_drama(drama_id)
    except DramaNotFoundError as error:
        raise translate_service_error(error) from error
    return Response(status_code=status.HTTP_204_NO_CONTENT)
