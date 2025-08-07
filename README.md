# Task Manager API (Backend)

This is the backend API for the **Task Manager Application**, a simple yet secure system that allows users to manage their personal tasks. Users can register, log in, and perform all basic task operations such as creating, updating, deleting, and marking tasks as completed. All task-related APIs are protected using JWT-based authentication to ensure that users can only access their own data.

## Tech Stack

- **Backend Framework**: Express.js (with TypeScript)
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Token)
- **Testing**: Postman (Collection & Environment included)

## Features

### Auth APIs
- POST /api/auth/signup — Register a new user
- POST /api/auth/signin — Log in and receive JWT token

### Task APIs (Protected)
- GET /api/tasks — Get all tasks for the current user
- POST /api/tasks/create — Create a new task
- PATCH /api/tasks/:id — Edit a task
- DELETE /api/tasks/:id — Delete a task
- PATCH /api/tasks/:id/toggle — Toggle task completion

⚠️ All task routes are protected and require a valid JWT token

## Prerequisites

Make sure you have the following installed before running the project:

- **[Node.js](https://nodejs.org/en/download/)** (version 18 or higher)
- **[MySQL](https://dev.mysql.com/downloads/)** (make sure it's running locally)
- **[Postman](https://www.postman.com/downloads/)** (for testing the API)
- **npm** (comes with Node.js)

Optional:
- A MySQL GUI like **HeidiSQL**, **phpMyAdmin**, or **MySQL Workbench** to manage your DB
- Git (to clone the repo)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/NardineWilliam/task-manager-backend.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory using the provided `.env.example`:

```bash
cp .env.example .env
```
Fill it with your values:

```bash
PORT=5000  
DB_HOST=localhost  
DB_PORT=3306  
DB_USERNAME=root  
DB_PASSWORD=your_mysql_password  
DB_NAME=task_manager  
JWT_SECRET=your_secret_key  
```

### 4. Create the database

Use your MySQL GUI or terminal and run:

```bash
CREATE DATABASE task_manager;
```
✅ No need to create any tables manually. TypeORM will handle that on server start.

### 5. Start the development server

```bash
npm run dev
```
App will run at http://localhost:5000

## Testing with Postman

### Included Files:
Open the directory *src/postman*:
- TaskManager.postman_collection.json
- TaskManagerEnvironment.postman_environment.json

### Steps:
1. Open Postman
2. Import the collection and the environment files
3. Select "Task Manager" environment from the top right
4. Run `Signup` then `Signin` to save the token
5. Proceed to test all task routes (token will be used automatically)

✅ Tests check for successful status codes and handled error cases (like duplicate emails) are still counted as valid test responses.


##  Project Structure

```bash
src/
├── config/              # TypeORM data-source configuration
├── controllers/         # Route controllers (AuthController, TaskController)
├── dtos/                # Data Transfer Objects (with validation rules)
├── entities/            # TypeORM models (User, Task)
├── interfaces/          # Global typings 
├── middlewares/         # Authentication middleware
├── postman/             # Postman collection and environment for testing  
├── repositories/        # Repository layer for DB access  
├── routes/              # Route definitions
├── services/            # Business logic layer 
├── utils/               # JWT, password hashing, validation
└── index.ts             # App entry point
```

##  Decisions & Rationale

- Used DTOs and centralized validation logic using class-validator and a shared utility 
- Applied Repository Design Pattern to cleanly separate database logic from service layer
- Applied layered architecture: Controller → Service → Repository 
- Authentication using JWT with middleware to protect routes
- Expected error cases are caught and returned with proper messages without breaking flow  
- All API flows are covered with Postman tests (including error cases)

      
