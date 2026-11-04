from fastapi import APIRouter, Request

router = APIRouter(tags=["health"])


@router.get("/health", summary="Check API and database connectivity")
def health(request: Request) -> dict[str, str]:
    request.app.state.mongo_database.ping()
    return {"status": "ok", "database": "connected"}
