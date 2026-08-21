# Ebodhi — Fullstack LMS Starter

A Coursera-style online learning platform built with:

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

## Features

- JWT auth (register / login) with `student` and `instructor` roles
- Course catalog with search + category filter
- Course detail page with syllabus (lessons, durations)
- Enroll in a course (one enrollment per user per course)
- Student dashboard ("My Learning") with progress tracking
- Seed script with demo instructor, student and 6 sample courses

## Project structure

```
web/
├── client/                 # Next.js frontend
│   └── src/
│       ├── app/            # pages: /, /courses, /courses/[slug], /login, /register, /dashboard
│       ├── components/     # Navbar, Footer, CourseCard
│       └── lib/            # api client, auth helpers, constants
└── server/                 # Express API
    └── src/
        ├── config/db.js
        ├── middleware/auth.js
        ├── models/         # User, Course, Enrollment
        ├── routes/         # auth, courses, enrollments
        └── seed/seed.js
```

## Getting started

**Prerequisites:** Node.js 18+, MongoDB running locally (or a connection string).

```bash
# 1. install everything
npm run install-all

# 2. configure env (defaults already work for local dev)
#    server/.env  -> PORT, MONGO_URI, JWT_SECRET
#    client/.env.local -> NEXT_PUBLIC_API_URL

# 3. seed demo data
npm run seed

# 4. run both apps
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:5000/api

## Demo accounts (after seeding)

| Role       | Email                  | Password    |
| ---------- | ---------------------- | ----------- |
| Student    | student@ebodhi.com     | password123 |
| Instructor | instructor@ebodhi.com  | password123 |

## API endpoints

| Method | Endpoint                      | Auth | Description                    |
| ------ | ----------------------------- | ---- | ------------------------------ |
| POST   | `/api/auth/register`          | –    | Create account                 |
| POST   | `/api/auth/login`             | –    | Login, returns JWT             |
| GET    | `/api/auth/me`                | ✅   | Current user                   |
| GET    | `/api/courses?q=&category=`   | –    | List/search courses            |
| GET    | `/api/courses/:slug`          | –    | Course detail                  |
| POST   | `/api/courses`                | ✅   | Create course (instructor)     |
| POST   | `/api/enrollments/:courseId`  | ✅   | Enroll in a course             |
| GET    | `/api/enrollments/my`         | ✅   | My enrolled courses            |
| PATCH  | `/api/enrollments/:id/progress` | ✅ | Update progress (0–100)        |

## Deployment (Netlify + Render)

1. **Push this folder to GitHub**

   ```bash
   cd web
   git init
   git add .
   git commit -m "Ebodhi fullstack app"
   git branch -M main
   git remote add origin https://github.com/<you>/ebodhi.git
   git push -u origin main
   ```

2. **API on Render** (https://dashboard.render.com → New → Blueprint, or New Web Service)
   - Select the repo; Render reads `render.yaml` (root dir `server`, start `node src/index.js`)
   - Add env var `MONGO_URI` = your Atlas connection string (same one as `server/.env`)
   - Deploy, then verify `https://<your-api>.onrender.com/api/health`
   - In MongoDB Atlas → Network Access, allow `0.0.0.0/0` so Render can connect

3. **Frontend on Netlify** (https://app.netlify.com → Add new site → Import from Git)
   - Pick the repo — `client/netlify.toml` already sets base/build/publish
   - Add environment variable `NEXT_PUBLIC_API_URL` = `https://<your-api>.onrender.com/api`
   - Deploy

4. **Notes**
   - Render free tier sleeps after ~15 min idle; first request takes ~50s to wake
   - The API uses the same Atlas database as local dev, so seeded data is already live

