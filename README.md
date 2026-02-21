# CareerSetu

A full-stack job portal built with **React (Vite)** + **Node.js (Express)** + **MongoDB Atlas**.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, React Router DOM v6, Axios |
| Backend | Node.js, Express, JWT, bcryptjs |
| Database | MongoDB Atlas, Mongoose |

## Features

- User registration & login (JWT auth)
- Browse and apply to jobs (Easy Apply)
- Track application status
- Admin dashboard — post, edit, delete jobs
- Admin — view all applications & update status
- Role-based access control (user / admin)

## Project Structure

```
job-tracker/
├── backend/                  # Express API
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/               # User, Job, Application
│   ├── controllers/          # auth, job, application
│   ├── routes/               # auth, job, application
│   └── server.js
│
└── frontend/                 # React + Vite SPA
    └── src/
        ├── api/api.js        # Axios instance
        ├── context/AuthContext.jsx
        ├── components/       # Navbar, ProtectedRoute
        └── pages/            # Home, Jobs, Admin, etc.
```

## Getting Started

### 1. Backend

```bash
cd backend
cp .env.example .env    # fill in your values
npm install
npm run dev             # runs on http://localhost:5000
```

**Required `.env` variables:**
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/careersetu
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
PORT=5000
CLIENT_URL=http://localhost:5173
```

> Register with the email matching `ADMIN_EMAIL` to get admin access.

### 2. Frontend

```bash
cd frontend
cp .env.example .env    # already set for local dev
npm install
npm run dev             # runs on http://localhost:5173
```

**Required `.env` variables:**
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/jobs` | Public |
| POST | `/api/jobs` | Admin |
| PUT | `/api/jobs/:id` | Admin |
| DELETE | `/api/jobs/:id` | Admin |
| POST | `/api/applications/:jobId` | User |
| GET | `/api/applications/mine` | User |
| GET | `/api/applications` | Admin |
| PUT | `/api/applications/:id/status` | Admin |

## Deployment

| Service | Target |
|---|---|
| [Vercel](https://vercel.com) | `frontend/` (set `VITE_API_URL` env var) |
| [Render](https://render.com) | `backend/` (set all env vars) |
| [MongoDB Atlas](https://mongodb.com/atlas) | Database |
