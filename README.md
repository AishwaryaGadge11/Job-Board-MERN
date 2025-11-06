# 🧠 Job Board MERN - Full Stack Developer Task

This project is a full-stack **Job Board System** built as part of the Full Stack Developer (MERN) assignment.  
It fetches job data from live APIs, stores them in MongoDB, and provides an admin dashboard to view and manage import logs.

---

## 🚀 Live Links

- **Frontend (Next.js + Vercel):** [https://job-board-mern-two.vercel.app](https://job-board-mern-two.vercel.app)
- **Backend (Express + Render):** [https://job-board-mern-1.onrender.com](https://job-board-mern-1.onrender.com/api/logs)

---

## ⚙️ Tech Stack

**Frontend:**
- Next.js (React 18)
- Fetch API + Async/Await
- Tailwind CSS / ShadCN UI for styling

**Backend:**
- Node.js + Express
- MongoDB (Atlas)
- Redis (Redis Cloud)
- BullMQ for background jobs
- node-cron for hourly automatic imports

---

## 🧩 Features

✅ Fetch jobs from external APIs (Jobicy, Remotive, etc.)  
✅ Store data in MongoDB  
✅ Log every import (timestamp, new, updated, failed counts)  
✅ View logs in a frontend dashboard  
✅ Background processing using Redis queue  
✅ Hourly cron job to auto-import  
✅ Deployed backend on Render & frontend on Vercel

---

## 🗂️ Folder Structure
job-board-mern/
├── client/ # Next.js frontend
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── .env.local
└── server/ # Express backend
├── index.js
├── config/
├── models/
├── routes/
├── services/
├── workers/
└── .env
