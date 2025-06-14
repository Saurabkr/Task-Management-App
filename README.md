# 📝 Task Management App

A modern, full-stack task management application designed to help users create, update, delete, and export their daily tasks with a sleek, responsive UI and Excel integration.

## 🚀 Features

- ✅ User Authentication (Register/Login)
- 🗂️ Add, Edit, Delete Tasks
- 📅 Task Due Dates & Effort Estimation
- 📤 Export Tasks to Excel
- 📥 Import Tasks from Excel
- 🔍 Form Validations & Alerts
- 🌐 Modern UI using Tailwind CSS
- 🔒 Secure routes with token-based auth

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Multer (for Excel uploads)
- JWT (for auth)

## 🖥️ Folder Structure

```bash
backend/
├── config/                           # Configuration files
│   └── db.js                         # Database connection setup
├── middleware/                       # Custom middleware
│   └── authMiddleware.js             # Authentication/authorization logic
├── models/                           # Database models (Sequelize/Mongoose)
│   ├── index.js                      # Model associations or initialization
│   ├── task.model.js                 # Task schema/model
│   └── user.model.js                 # User schema/model
├── routes/                           # API route definitions
│   ├── auth.routes.js                # Routes for login/register
│   └── task.routes.js                # Routes for task CRUD operations
├── uploads/                          # Uploaded Excel files (if storing temporarily)
├── .env                              # Environment variables
├── .gitignore                        # Git ignored files
├── package.json                      # Backend dependencies and scripts
├── package-lock.json                 # Exact versions of installed packages
├── server.js                         # Entry point and server setup


frontend/
├── public/                           # Static files and assets
│   └── index.html                    # Main HTML file
├── src/                              # Source files
│   ├── components/                   # Reusable UI components
│   │   ├── Navbar.jsx                # Navigation bar component
│   │   └── Navbar.css                # Styles for Navbar
│   ├── pages/                        # Page-level React components (views)
│   │   ├── Dashboard.jsx             # Main task management UI
│   │   ├── Login.jsx                 # Login screen
│   │   └── Register.jsx              # Registration screen
│   │   ├── Dashboard.css             # Main task management styling
│   │   ├── Login.css                 # Login screen styling
│   │   └── Register.css              # Registration screen styling
│   ├── App.jsx                       # Root component with routing
│   ├── App.css                       # Global styles
│   ├── index.css                     # Tailwind and custom base styles
│   └── main.jsx                      # Application entry point

```

# Here's how the flow works:

## 🔐 User Authentication

User registers or logs in via the frontend (/register or /).

Auth credentials are sent to the backend (/auth/register or /auth/).

Backend validates credentials, issues JWT token, and returns it to the frontend.

Token is stored in localStorage and attached to all protected API requests.

## 📋 Task Management

After login, the user is redirected to the dashboard.

The dashboard displays the list of tasks fetched from the /tasks API.

Users can:

Add a task

Edit a task

Delete a task

Each action sends a corresponding POST/PUT/DELETE request to the backend.

## 📤 Excel Export

Users can click "Export Excel" to download all tasks.

Backend generates and returns a .xlsx file via /tasks/export/excel.

## 📥 Excel Import

Users upload an Excel file to add tasks in bulk.

File is sent via multipart form to /tasks/upload/excel.

Backend parses and inserts tasks into the database.

## 💾 Database Layer

All task and user data is stored in a PostgreSQL (SQL) database.

Sequelize ORM is used for model definitions and DB interaction.
