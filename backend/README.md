# Timelytics Backend

This folder contains the backend server for Timelytics (Express + MongoDB + BullMQ).

Quick start (requires MongoDB and Redis):

```bash
cd backend
npm install
# start MongoDB + Redis (docker-compose is included in repo root)
npm run dev
```

APIs of interest:
- GET /api/schedule - list timetable
- POST /api/schedule/generate - enqueue generation job
- POST /api/schedule/generate-sync - synchronous generation (demo)
- GET /api/schedule/subjects/list, /classrooms/list, /faculty/list
- POST /api/admin/faculty, /api/admin/classrooms, /api/admin/subjects

The scheduler implementation is in `backend/services/scheduler.js` (greedy placer).

Firebase integration
--------------------

This project can optionally verify Firebase Authentication ID tokens using the Firebase Admin SDK.

Environment options (one of):

- Set `FIREBASE_SERVICE_ACCOUNT_PATH` to the relative or absolute path of a Firebase service account JSON file.
- Or set `FIREBASE_SERVICE_ACCOUNT_JSON` to the raw JSON contents of the service account (useful in CI/CD or container secrets).

When set, the backend initializes the Firebase Admin SDK and exposes middleware `backend/middleware/firebaseAuth.js` which verifies `Authorization: Bearer <idToken>` headers, upserts a minimal local `User` document, and attaches `req.user` and `req.firebase.decoded` for downstream handlers.

Example usage in routes:

```js
const firebaseAuth = require('./middleware/firebaseAuth');
app.get('/api/me', firebaseAuth, (req, res) => {
	res.json({ user: req.user, tokenInfo: req.firebase.decoded });
});
```

Notes:
- The middleware is defensive: if no service account is provided it will attempt to use Application Default Credentials and will log a warning if none found.
- You still keep the existing JWT-based auth endpoints; Firebase is optional and coexists with current auth flows.
