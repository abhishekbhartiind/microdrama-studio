# Product Requirements Document — Reelcraft Studio

## 1. Summary
Reelcraft Studio helps independent creators develop short-form, vertical micro dramas with a clear story arc inside a one-minute runtime. It is a responsive web application for discovering, drafting, editing, and organizing drama reels.

## 2. Problem
Creators often develop short episodes across notes, documents, and editing tools. They need a single place to manage concepts and turn a premise into a tightly timed, shootable script without losing track of the hook, emotional turn, or ending.

## 3. Users
- **Solo creator:** develops and manages their own series and episodes.
- **Writer/producer:** collaborates on a story and prepares production-ready scene notes.

## 4. Goals and measures
- A creator can find a project quickly by title, status, or genre.
- A new one-minute drama can be drafted using a guided structure.
- A script stays within 60 seconds, with visible timing feedback.
- Editing is fast on desktop and usable on mobile.

Initial product measures: time to first draft, percentage of drafts reaching 60 seconds or less, and weekly active creators. Targets will be set after baseline usage.

## 5. Scope
### MVP
- Dashboard with project list, search, status/genre filters, and summary counts.
- Create and edit drama metadata: title, logline, genre, status, cover, video URL, and episode number. Preview linked video reels in the dashboard.
- Structured scene editor with scene duration, visual action, dialogue, and notes.
- 60-second runtime meter and scene timing adjustments.
- Save draft and mark ready for production.
- Responsive layout and accessible keyboard/focus states.
- FastAPI REST endpoints for health, listing, reading, creating, and updating dramas.

### Out of scope
- Video hosting/upload, editing/rendering, publishing to social platforms, payments, team permissions, AI script generation, and real-time collaboration.

## 6. Core flows
1. **Browse:** open dashboard → search/filter projects → open a drama.
2. **Create:** select New drama → enter premise and metadata → add timed scenes → save draft.
3. **Update:** open a drama → edit fields or scene beats → review runtime → save or mark ready.

## 7. Functional requirements
- Project cards show title, genre, episode count, status, and updated time.
- Empty, loading, error, and populated states are designed.
- A new drama starts with an editable hook/opening beat and a final-turn beat.
- Scene durations are positive integers; the interface totals them and indicates whether the episode fits 60 seconds.
- Save preserves the current draft; ready status requires a title and at least one scene.
- Mobile layouts keep primary actions available and avoid horizontal scrolling.

## 8. Quality requirements
- Frontend: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui conventions.
- Backend: Python FastAPI with Pydantic validation and OpenAPI docs.
- API versioned under `/api/v1`; CORS origins configured by environment.
- Do not upload or transcode video in MVP; creators can save and preview a direct video URL. The MVP API persists records in MongoDB.
- Accessibility: semantic controls, visible focus, labels, adequate contrast, and reduced-motion support.

## 9. Assumptions and risks
- The initial workflow is for organizing a one-minute reel and its scene script, with optional playback from a direct video URL; it does not generate or edit video files.
- The supplied YouTube references could not be retrieved in this environment; the first version follows common vertical micro-drama storytelling patterns and the explicit user brief.
- The FastAPI service requires a reachable MongoDB deployment; local development can use the provided Docker Compose service.

## 10. Acceptance criteria
- User can browse demo dramas and search by title.
- User can create a drama, add/edit scenes, see runtime totals, and save.
- User can reopen and update a drama.
- FastAPI exposes documented CRUD endpoints and validates request fields.
- Desktop and mobile screens remain usable at narrow widths.
