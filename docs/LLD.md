# Low-Level Design

## Domain model
- `Drama`: `id`, `title`, `logline`, `genre`, `status` (`draft | ready | archived`), `cover_url`, `video_url`, `episode_number`, `scenes[]`, `created_at`, `updated_at`.
- `Scene`: `id`, `label`, `duration_seconds`, `visual`, `dialogue`, `production_note`, `sort_order`.
- Runtime is derived as the sum of scene durations. Target runtime is 60 seconds.

## Frontend structure
- `app/page.tsx`: dashboard, search/filtering, project cards, video preview, create/edit dialog, and runtime feedback.
- `lib/types.ts`: UI-facing drama and scene types.
- `lib/api.ts`: API client and adapters between UI camel-case fields and API fields.
- `NEXT_PUBLIC_API_URL`: FastAPI base URL, defaulting to `http://localhost:8010/api/v1`.

## Backend structure
- `app/main.py`: FastAPI routes, Pydantic request/response schemas, MongoDB persistence helpers, and CORS setup.
- MongoDB database name is configured with `MONGODB_DATABASE` (default `reelcraft`); documents are stored in the `dramas` collection. `MONGODB_URI` selects local MongoDB or Atlas.

## API
- `GET /api/v1/health` → `{status: "ok"}`
- `GET /api/v1/dramas?query=&status=` → `Drama[]`
- `GET /api/v1/dramas/{id}` → `Drama`
- `POST /api/v1/dramas` → `Drama` (201)
- `PUT /api/v1/dramas/{id}` → `Drama`
- `DELETE /api/v1/dramas/{id}` → 204

Errors use FastAPI's standard `detail` payload. Unknown IDs return 404. Pydantic constrains title length, status values, and positive scene durations.

## Validation and behavior
- Title is required; logline is optional up to 280 characters.
- Runtime may exceed 60 while drafting; the UI shows the overage.
- Transition to `ready` requires at least one scene.
- Scene ordering is explicit and stable.
- Dashboard list and save operations use the FastAPI service; records persist in MongoDB.
