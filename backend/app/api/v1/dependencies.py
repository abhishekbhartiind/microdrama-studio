from fastapi import Request

from app.services.drama_service import DramaService


def get_drama_service(request: Request) -> DramaService:
    return request.app.state.drama_service
