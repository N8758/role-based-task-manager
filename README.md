# 🚀 TaskFlow: Team Task Manager

TaskFlow is a premium, full-stack web application designed for seamless team collaboration. It empowers HR/Admins to create projects, assign tasks to specific staff members, and track progress, all wrapped in a stunning, modern glassmorphic UI.

## 🌟 Key Features

*   **Secure Authentication:** Full JWT-based Signup and Login system with encrypted passwords using `bcrypt`.
*   **Role-Based Access Control (RBAC):**
    *   **👔 HR / Admin Role (Strict Isolation):** HR users can create projects and tasks. Multi-tenant isolation ensures that an HR user *only* sees projects they created, tasks belonging to their projects, and can *only* assign tasks to "Staff" members (not other HRs).
    *   **👨‍🔧 Staff / Member Role:** Staff members have a focused view. They only see tasks explicitly assigned to them. They cannot view the Projects dashboard or create new tasks. Their primary capability is updating the status of their assigned tasks.
*   **Dynamic Dashboard:** Real-time statistics showing Total Tasks, Completed, In-Progress, and Pending metrics.
*   **Beautiful UI/UX:** Built with React and Tailwind CSS featuring a modern "glassmorphism" aesthetic, sleek gradients, responsive design, and smooth hover animations.
*   **Task Status Tracking:** Easily move tasks between `Pending`, `In-Progress`, and `Done` states.

---

## 🛠️ Technology Stack

**Frontend (Client)**
*   **React.js** (Functional components, Hooks, Context)
*   **Tailwind CSS** (Premium styling, Glassmorphism, Animations)
*   **React Router DOM** (Navigation and guarded routes)
*   **Axios** (API requests and interceptors)

**Backend (Server)**
*   **Node.js & Express.js** (RESTful API architecture)
*   **PostgreSQL** (Relational Database)
*   **JSON Web Tokens (JWT)** (Stateless authentication)
*   **Bcrypt** (Password hashing)

---

## ⚙️ Database Schema

The PostgreSQL database relies on three core relational tables:
1.  **`users`**: `id`, `name`, `email`, `password`, `role` (admin/member)
2.  **`projects`**: `id`, `name`, `created_by` (Foreign Key -> users.id)
3.  **`tasks`**: `id`, `title`, `description`, `status`, `project_id` (FK), `assigned_to` (FK), `deadline`, `created_at`

---

## 🚀 Running the Project Locally

### Prerequisites
*   Node.js installed
*   PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database and configure the tables. Update the `backend/.env` file with your database credentials:
```env
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanager
JWT_SECRET=your_super_secret_key
```

### 2. Start the Backend
```bash
cd backend
npm install
node server.js
```
*The backend will run on `http://localhost:5000`*

### 3. Start the Frontend
```bash
cd frontend
npm install
npm start
```
*The frontend will run on `http://localhost:3000`*

---

## 🌐 Deployment (Railway)

This project is fully ready to be deployed on [Railway](https://railway.app/).

1.  **Database:** Provision a PostgreSQL database on Railway and copy the connection credentials.
2.  **Backend:** Create a new Web Service from your GitHub repo (select the `backend` folder as the root directory). Add all environment variables (including the Railway DB URL) to the service settings.
3.  **Frontend:** Create another Web Service from your GitHub repo (select the `frontend` folder). Add an environment variable `REACT_APP_API_URL` pointing to your deployed backend URL.

---

