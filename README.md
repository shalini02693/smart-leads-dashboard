✨ Smart Leads Dashboard (MERN + TypeScript)

A full-stack Lead Management Dashboard built using MERN stack with TypeScript, featuring authentication, role-based access, filtering, pagination, CSV export, and a modern responsive UI.

🚀 Features
🔐 Authentication
JWT-based login & registration
Password hashing using bcrypt
Protected routes
Role-based access (Admin / Sales)
📊 Leads Management
Create / Read / Update / Delete leads
Lead fields: Name, Email, Status, Source
View single lead details
🔎 Advanced Features
Search by name/email (debounced)
Filter by status & source
Sort by latest / oldest
Backend pagination (10 per page)
📁 Export
Export leads as CSV file
🎨 UI/UX
Responsive dashboard
Dark mode support
Loading & empty states
Reusable components
🐳 DevOps
Dockerized frontend, backend & MongoDB
docker-compose setup
🛠 Tech Stack
Frontend
React.js
TypeScript
TailwindCSS
React Hook Form
Axios
Backend
Node.js
Express.js
TypeScript
MongoDB + Mongoose
JWT Authentication
bcrypt
DevOps
Docker
Docker Compose
📁 Project Structure
smart-leads-dashboard/
│
├── backend/
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── middleware/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── api/
│
├── docker-compose.yml
└── README.md