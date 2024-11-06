
# Task Manager Application

## Overview

The Task Manager application is a simple and effective tool for managing tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. Users can mark tasks as completed or incomplete, filter tasks by their status, and optionally manage their own tasks with user authentication (sign up and login).

The application is built using **Node.js**, **Express**, and **MongoDB**, following best practices for RESTful API development. It uses JWT for secure authentication and data validation with Joi.

## Features

- **Create a Task**: Add a new task with a description.
- **Read Tasks**: View a list of tasks, with the option to filter by status (completed/incomplete).
- **Update Tasks**: Mark tasks as completed or incomplete.
- **Delete Tasks**: Remove tasks from the list.
- **User Authentication** (Optional): Users can sign up, log in, and manage their own tasks.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Data Validation**: Joi

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-manager-app.git
```

### 2. Install dependencies:

```bash
cd task-manager-app
npm install
```

### 3. Set up your environment variables:

- Create a `.env` file in the root directory.
- Add your MongoDB connection URL and any other required variables (e.g., JWT secret).
  
Example `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_secret_key
```

### 4. Run the server:

```bash
npm start
```

The application will be running on `http://localhost:5000`.

## API Endpoints

### Authentication 

- **POST /User/SignUp**  
  Register a new user.
  - Request Body:
    ```json
    {
      "username": "user123",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response: 201 Created with the user data.

- **POST/User /SignIn**  
  Log in a user and receive a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - Response: 200 OK with the JWT token.

- **POST /User/SignOut**  
  Log out a user by Setting Status to Offline.
  - Response: 200 OK with a message confirming the logout.

### Task Management

- **GET /Task/**  
  Get a list of tasks for the authenticated user.
  - Query Params: `Status` (optional, filter tasks by Status - "completed" or "incomplete").
  - Response:
    ```json
    [
      {
        "id": "task_id",
        "description": "Task description",
        "completed": false
      }
    ]
    ```

- **POST /Task**  
  Create a new task.
  - Request Body:
    ```json
    {
      "description": "New task description"
      "Title": "New task description"
      "DeadLine": "New task description"
    }
    ```
  - Response: 201 Created with the task data.

- **PUT /Task/:taskId**  
  Update an existing task (e.g., mark as completed).
  - Request Body:
    ```json
    {
      "Status": Completed
    }
    ```
  - Response: 200 OK with updated task data.

- **DELETE /Task/:taskId**  
  Delete a task.
  - Response: 200 OK with a message indicating the task was deleted.

- **GET /Task/GetAll**  
  Get a list of tasks for the authenticated user.
  - Response:
    ```json
    [
      {
        "id": "task_id",
        "description": "Task description",
        "completed": false
      }
    ]
    ```

## Data Validation

- The application uses **Joi** to validate the data before interacting with the database. For example:
  - Task description must be a string with a minimum length of 3 characters.



## Contribution

Feel free to open issues or submit pull requests if you’d like to contribute to the project.
