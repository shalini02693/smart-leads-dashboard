# Smart Leads Dashboard (MERN + TypeScript)

A full-stack Lead Management Dashboard built using MERN stack with TypeScript, featuring authentication, role-based access, filtering, pagination, CSV export, and a modern responsive UI.

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Role-Based Access Control (Admin / Sales)

## Leads Management
- Create Lead
- Update Lead
- Delete Lead
- View All Leads
- View Single Lead

## Filtering & Search
- Filter by Status
- Filter by Source
- Search by Name or Email
- Sort by Latest / Oldest

## Pagination
- Backend Pagination
- 10 Records Per Page

## Additional Features
- Debounced Search
- CSV Export
- Dark Mode
- Responsive UI
- Docker Setup

---

# Tech Stack

## Frontend
- React.js
- TypeScript
- TailwindCSS
- Axios
- React Hook Form
- Zustand

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

## DevOps
- Docker
- Docker Compose

---

# Project Structure

smart-leads-dashboard/
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
cd smart-leads-dashboard
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

## backend/.env

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_secret_key
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## frontend/.env

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Docker Setup

Run project using Docker:

```bash
docker-compose up --build
```

---

# API Endpoints

## Authentication

### Register
POST /api/auth/register

### Login
POST /api/auth/login

---

## Leads

### Get All Leads
GET /api/leads

### Create Lead
POST /api/leads

### Get Single Lead
GET /api/leads/:id

### Update Lead
PUT /api/leads/:id

### Delete Lead
DELETE /api/leads/:id

---

# Query Parameters

```txt
?page=1
&search=rahul
&status=Qualified
&source=Instagram
&sort=latest
```

---

# Sample Accounts

## Admin

Email:
admin@test.com

Password:
123456

## Sales

Email:
sales@test.com

Password:
123456

---

# Docker Commands

## Start Containers

```bash
docker-compose up --build
```

## Stop Containers

```bash
docker-compose down
```

---

# Important Notes

- Fully built using TypeScript
- Clean architecture
- Reusable components
- RESTful API design
- Proper validation and error handling
- Responsive dashboard UI
- Professional folder structure

---

# Author

Smart Leads Dashboard Project