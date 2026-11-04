from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, computed_field, model_validator
from typing_extensions import Self


class DramaStatus(str, Enum):
    draft = "draft"
    ready = "ready"
    archived = "archived"


class SceneInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    id: str = Field(default_factory=lambda: str(uuid4()), min_length=1, max_length=64)
    label: str = Field(min_length=1, max_length=80)
    duration_seconds: int = Field(gt=0, le=600)
    visual: str = Field(default="", max_length=2000)
    dialogue: str = Field(default="", max_length=2000)
    production_note: str = Field(default="", max_length=2000)
    sort_order: int = Field(ge=0)


class DramaWrite(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1, max_length=120)
    logline: str = Field(default="", max_length=280)
    genre: str = Field(default="Drama", min_length=1, max_length=40)
    status: DramaStatus = DramaStatus.draft
    cover_url: Optional[HttpUrl] = None
    video_url: Optional[HttpUrl] = None
    episode_number: int = Field(default=1, ge=1)
    scenes: list[SceneInput] = Field(default_factory=list, max_length=30)

    @model_validator(mode="after")
    def validate_scene_order(self) -> Self:
        scene_ids = [scene.id for scene in self.scenes]
        sort_orders = [scene.sort_order for scene in self.scenes]
        if len(scene_ids) != len(set(scene_ids)):
            raise ValueError("Scene IDs must be unique within a drama.")
        if len(sort_orders) != len(set(sort_orders)):
            raise ValueError("Scene sort orders must be unique within a drama.")
        return self


class DramaRead(DramaWrite):
    id: str
    created_at: datetime
    updated_at: datetime

    @computed_field
    @property
    def runtime_seconds(self) -> int:
        return sum(scene.duration_seconds for scene in self.scenes)
