# Project Management Frontend

A frontend application for a **Project Management System** built using **React.js, TypeScript, and modern frontend technologies**.

This project is currently under development. The frontend is being built alongside a Node.js, Express.js, and MongoDB backend.

The current focus is on building the **authentication system, protected routing, and role-based access control** for three types of users:

* `admin`
* `manager`
* `developer`

---

## 🚀 Tech Stack

* **React.js** — Frontend library
* **TypeScript** — Type-safe JavaScript
* **Vite** — Frontend build tool
* **React Router** — Client-side routing
* **Axios** — API communication
* **Context API** — Authentication state management
* **CSS / Tailwind CSS** — UI styling
* **JWT** — Authentication
* **REST API** — Backend communication

---

## 📌 Current Features

### 🔐 Authentication

The authentication module is currently being implemented.

Current functionality includes:

* Admin login
* Manager login
* Developer login
* JWT-based authentication
* Token storage
* User information storage
* Logout
* Authentication state management
* Axios authentication interceptor

### 👥 Role-Based Access Control

The application supports three roles:

| Role        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `admin`     | Manages users and has access to administrative functionality |
| `manager`   | Manages projects, developers, and project-related activities |
| `developer` | Works on assigned projects and tasks                         |

---

## 🛡️ Protected Routing

The application uses protected routes to prevent unauthenticated users from accessing private pages.

### Public Routes

Currently available public routes:

```text
/login
```

### Protected Routes

Authenticated users can access routes based on their role:

```text
/admin
/manager
/developer
```

### Admin-Only Routes

Only users with the `admin` role can access:

```text
/admin
/admin/register
```

The `/admin/register` page is used by an administrator to create new users.

Managers and developers cannot access the registration page.

---

## 👤 User Registration

User registration is restricted to administrators.

The registration flow is:

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Create User
     ↓
/admin/register
     ↓
Select Role
     ├── Manager
     └── Developer
```

The public application does **not** expose a registration page.

Admins can create:

* Manager accounts
* Developer accounts

Admin accounts are intended to be created and controlled through the backend.

---

## 🔑 Authentication Flow

The current authentication flow works approximately as follows:

```text
User
 │
 ▼
Login Page
 │
 ▼
React Frontend
 │
 ▼
POST /api/auth/login
 │
 ▼
Express Backend
 │
 ▼
MongoDB
 │
 ▼
JWT + User Data
 │
 ▼
React Auth Context
 │
 ▼
Protected Routes
 │
 ▼
Role-Based Dashboard
```

---

## 🧩 Project Structure

```text
src/
├── components/
│   ├── ProtectedRoute.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── AdminDashboard.tsx
│   ├── ManagerDashboard.tsx
│   ├── DeveloperDashboard.tsx
│   └── Unauthorized.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── auth.ts
│
├── App.tsx
└── main.tsx
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/aniketvermadev/project-management-frontend.git
```

Move into the project directory:

```bash
cd project-management-frontend
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

The frontend uses this URL to communicate with the backend API.

---

# ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The application should be available at:

```text
http://localhost:5173
```

Make sure the backend server is also running.

---

# 🔗 Backend

This frontend application communicates with the Project Management backend built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

The backend provides authentication, user management, authorization, and future project/task APIs.

---

# 🛣️ Roadmap

The frontend will gradually evolve into a complete project management application.

## Phase 1 — Authentication & User Management

* [x] Login page
* [x] Register page
* [x] Admin-only registration
* [x] Admin role
* [x] Manager role
* [x] Developer role
* [x] JWT authentication
* [x] Authentication context
* [x] Protected routes
* [x] Role-based routes
* [x] Unauthorized page
* [x] Logout
* [x] Axios API configuration

### Upcoming

* [ ] Authentication error handling improvements
* [ ] Token expiration handling
* [ ] Refresh token support
* [ ] User management dashboard
* [ ] Get users
* [ ] Get user by ID
* [ ] Update user
* [ ] Delete user

---

# 📁 Phase 2 — Project Management

### Admin / Manager

* [ ] Project dashboard
* [ ] Create project
* [ ] Update project
* [ ] Delete project
* [ ] Get projects
* [ ] Project details
* [ ] Assign developers to projects
* [ ] Project ownership

### Developer

* [ ] View assigned projects
* [ ] View project details
* [ ] Project progress

---

# 🎯 Phase 3 — Task Management

* [ ] Task dashboard
* [ ] Create task
* [ ] Assign task to developer
* [ ] Update task
* [ ] Delete task
* [ ] Task status
* [ ] Task priority
* [ ] Task deadlines
* [ ] Task filtering
* [ ] Task searching

---

# 📊 Phase 4 — Dashboard & Analytics

* [ ] Admin dashboard
* [ ] Manager dashboard
* [ ] Developer dashboard
* [ ] Project statistics
* [ ] Task statistics
* [ ] Developer workload
* [ ] Project progress
* [ ] Charts and visualizations

---

# 🔎 Phase 5 — Advanced Features

* [ ] Pagination
* [ ] Search
* [ ] Advanced filtering
* [ ] Notifications
* [ ] Activity logs
* [ ] Comments
* [ ] Real-time updates
* [ ] Responsive design improvements
* [ ] Dark mode
* [ ] Loading states
* [ ] Error boundaries
* [ ] Performance optimization

---

# 🔒 Security

Security is an important part of the application.

Current security-related functionality includes:

* JWT authentication
* Protected frontend routes
* Role-based route protection
* Admin-only user registration
* Authorization headers through Axios

The backend is responsible for the actual authorization and must validate the user's JWT and role for protected API requests.

Frontend route protection should **not** be considered a replacement for backend authorization.

---

# 🧪 API Testing

The backend API can be tested using:

* Postman
* Insomnia
* Thunder Client
* cURL

The React application communicates with these APIs through Axios.

Example:

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

After successful authentication, the backend returns a JWT and user information.

---

# 📈 Project Status

**Status: 🚧 In Development**

The frontend is currently focused on building the foundation of the application.

### Completed

```text
Authentication
    ↓
JWT
    ↓
Auth Context
    ↓
Protected Routes
    ↓
Role-Based Routes
    ↓
Admin / Manager / Developer
```

### Currently Building

```text
Admin Dashboard
    ↓
User Management
    ↓
Project Management
```

### Upcoming

```text
Projects
    ↓
Tasks
    ↓
Dashboard & Analytics
    ↓
Notifications
    ↓
Activity Logs
```

---

# 👨‍💻 Author

**Aniket Verma**
