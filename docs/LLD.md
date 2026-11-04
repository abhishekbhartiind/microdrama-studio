# Low-Level Design

## Domain model
- `Drama`: `id`, `title`, `logline`, `series_title`, `genre`, `status` (`draft | ready | archived`), `cover_url`, `video_url`, `episode_number`, `scenes[]`, `created_at`, `updated_at`.
- `Scene`: `id`, `label`, `duration_seconds`, `visual`, `dialogue`, `production_note`, `sort_order`.
- Runtime is derived as the sum of scene durations. Target runtime is 60 seconds.

## Frontend structure
- `app/(marketing)/*`: landing page and public feature, workflow, stories, pricing, about, and FAQ pages.
- `app/studio/page.tsx` and `components/studio/*`: dashboard, series directory, drama cards, video preview, and create/edit dialog.
- `app/providers.tsx`: browser-scoped TanStack Query client.
- `hooks/queries/*`: list/detail queries and stable query keys.
- `hooks/mutations/*`: separate create/update/delete mutations with targeted cache invalidation.
- `lib/api/http.ts` and `lib/api/dramas.ts`: transport errors and mapping between UI camel-case fields and API fields.
- `lib/types.ts`: UI-facing drama and scene types. Scene production notes are persisted as part of the scene document.
- `NEXT_PUBLIC_API_URL`: FastAPI base URL, defaulting to `http://127.0.0.1:8010/api/v1` for local development.

## Backend structure
- `app/main.py`: application lifecycle, middleware, and router registration.
- `app/api/v1`: versioned route handlers and request dependencies.
- `app/schemas`: Pydantic request/response models and field validation.
- `app/services`: story-state business rules.
- `app/repositories`: persistence protocol and MongoDB implementation.
- `app/db/mongo.py`: Mongo client lifecycle, health check, and indexes.
- MongoDB uses the `reelcraft` database and `dramas` collection by default; configure with `MONGODB_DATABASE` and `MONGODB_URI`. Indexes support status/date sorting and series/episode grouping.

## API
- `GET /api/v1/health` → `{status: "ok", database: "connected"}`
- `GET /api/v1/dramas?query=&status=&limit=50&offset=0` → `Drama[]`
- `GET /api/v1/dramas/{id}` → `Drama`
- `POST /api/v1/dramas` → `Drama` (201)
- `PUT /api/v1/dramas/{id}` → `Drama`
- `DELETE /api/v1/dramas/{id}` → 204

Errors use FastAPI's standard `detail` payload. Unknown IDs return 404. Pydantic constrains title length, status values, and positive scene durations.

## Validation and behavior
- Title is required; logline is optional up to 280 characters.
- Runtime may exceed 60 while drafting; the UI shows the overage. Marking a drama ready requires at least one scene and a total runtime of 60 seconds or less.
- Scene ordering is explicit and stable.
- Dashboard list and save operations use the FastAPI service; records persist in MongoDB.
