# Timelytics — Smart Classroom & Timetable Scheduler

Timelytics is a full-stack demo app for generating explainable timetables for schools and colleges. It includes a Node/Express backend, MongoDB, Redis + BullMQ worker for async processing, and a Tailwind + Vanilla JS frontend.

This repository is prepared for hackathon demos: beautiful UI, explainable scheduling, drag-and-drop timetables (prototype), export, and real-time notifications.

## Quick start (Docker Compose)

1. Copy `.env.example` to `.env` and edit if needed.

2. Start services with Docker Compose:

```powershell
docker compose up --build
```

3. Seed demo data (in another terminal):

```powershell
docker compose exec backend npm run seed
```

4. Open the frontend in your browser: http://localhost:3000
   - Landing page: `/index.html`
   - Login: `/login.html`
   - Admin demo: `/admin.html`

## API overview

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/schedule/generate (enqueues schedule generation)
- GET /api/schedule (list current timetable)
- POST /api/export/pdf, /api/export/docx (enqueue export jobs)
- POST /api/notifications (create notification)
- GET /api/notifications (recent notifications)
- Admin endpoints (require Bearer token):
  - POST /api/admin/faculty
  - POST /api/admin/classrooms
  - POST /api/admin/subjects
  - POST /api/admin/constraints
  - GET  /api/admin/dashboard

## Architecture notes

- Backend: Express + Mongoose models in `backend/models`
- Scheduler: `backend/services/scheduler.js` (greedy placement with explainability vector). Worker processes queue jobs at `worker/worker.js` using BullMQ.
- Frontend: static HTML + Tailwind for fast prototyping. Swap to SPA if needed.
- Docker Compose: services for `mongo`, `redis`, `backend`, `worker`, and `frontend`.

## Demo scenarios (hackathon)

1. Seed data.
2. Login as admin (use seeded admin user `admin@timely.local` with password `demo` if you created it during seed).
3. Generate timetable (Admin → Generate Timetable). Watch worker logs; SSE endpoint `/api/events` will stream notifications.
4. Export schedule (Admin → Export) — generates placeholder file and a notification when ready.

## Next steps / TODO

- Improve scheduler with local search (simulated annealing) and richer constraints.
- Add Drag & Drop timetable editor and explainability tooltips.
- Implement PDF/DOCX export using headless browser or jsPDF.
- Add unit tests and GitHub Actions CI.
# Timelytics — Smart Classroom & Timetable Scheduler

Timelytics is a hackathon-ready, explainable timetable scheduler built with vanilla frontend (HTML + Tailwind CSS + JS) and a Node.js (Express) backend with MongoDB and Redis (BullMQ) for background tasks.

Quickstart (Docker Compose):

```powershell
cd timelytics
docker-compose up --build
```

After services are up:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

See `README.md` in each folder for more details.
