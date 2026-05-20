🚀 Team Task Manager — Full Stack SaaS Dashboard

A modern Full Stack Team Task Management Application built using React, Node.js, Express, MySQL, Sequelize, and JWT Authentication.

The platform enables teams to manage projects, assign tasks, monitor progress, and collaborate efficiently using a professional dashboard interface with Role-Based Access Control (RBAC).

✨ Features
🔐 Authentication & Security
User Signup & Login
JWT Authentication
Protected Routes
Password Hashing using bcrypt
Secure API Authorization
👥 Role Based Access Control (RBAC)
Admin

Admins have full management access.

They can:

Create Projects
View Projects
Delete Projects
Create Tasks
Assign Tasks to Team Members
View All Tasks
Update Task Status
Access Full Dashboard Analytics
Member

Members have restricted access.

They can:

View Assigned Tasks Only
Update Their Own Task Status
View Personal Dashboard Analytics
Access Project Listings

Members cannot:

Create Projects
Delete Projects
Create Tasks
📊 Dashboard Analytics

Interactive dashboard showing:

Total Tasks
Completed Tasks
Pending Tasks
Overdue Tasks

Dashboard data changes dynamically based on the user's role.

📁 Project Management
Create Projects
View All Projects
Delete Projects
Modern Project Card UI
✅ Task Management
Create Tasks
Assign Users to Tasks
Select Project from Dropdown
Due Date Tracking
Status Updates

Task Status Workflow:

Todo → In Progress → Completed
🎨 Modern SaaS UI

Built with a clean professional dashboard design.

Includes:

Premium Dark Sidebar
KPI Dashboard Cards
Task Search & Filters
Status Badges
Dark Mode Toggle
Responsive Design
Professional Login / Signup Screens
Dynamic User Profile Header
🛠️ Tech Stack

Frontend:
React | Vite | Tailwind CSS | Axios | React Router DOM | React Icons | React Hot Toast

Backend:
Node.js | Express.js | Sequelize ORM

JWT Authentication:
bcrypt

Database:
MySQL | MySQL Workbench

Deployment:
Railway
📂 Project Structure
TeamTaskManager
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── services
│
└── README.md

⚙️ Installation & Setup
1. Clone the Repository
git clone YOUR_GITHUB_REPO_URL
2. Backend Setup

Navigate to backend folder:

cd backend
npm install

Create a .env file:

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=teamtaskmanager

JWT_SECRET=YOUR_SECRET

Start backend server:

npm run dev
3. Frontend Setup

Navigate to frontend:

cd frontend
npm install
npm run dev

🔗 API Endpoints
Authentication
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/users
Projects
POST   /api/projects
GET    /api/projects
DELETE /api/projects/:id
POST   /api/projects/add-member
Tasks
POST   /api/tasks
GET    /api/tasks
PATCH  /api/tasks/:id/status
GET    /api/tasks/dashboard

🌐 Live Demo

Frontend:
Frontend URL Here
https://teamtaskmanager-frontend.netlify.app/
Backend:
Backend URL Here
https://teamtaskmanager-2gjg.onrender.com

👩‍💻 Author
Mehak Gupta

GitHub:
https://github.com/MehakGupta1725

🚀 Future Improvements

Potential enhancements:

Team Invitation System
Email Notifications
Activity Logs
Profile Management
Real-Time Updates using WebSockets