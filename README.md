
# Task Manager Application.

## Overview

The Task Manager application is a simple and effective tool for managing tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. Users can mark tasks as completed or incomplete, filter tasks by their status, and manage their own tasks with user authentication (sign up and login).

The application is built using **Node.js**, **Express**, and **MongoDB**, following best practices for RESTful API development. It uses JWT for secure authentication and data validation with Joi.

## Features

- **Create a Task**: Add a new task with a description and Deadline.
- **Read Tasks**: View a list of tasks, with the option to filter by status (completed/incomplete).
- **Update Tasks**: Mark tasks as completed or incomplete- update title- description - deadline.
- **Delete Tasks**: Remove tasks from the list.
- **User Authentication** : Users can sign up, log in, and manage their own tasks.

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Data Validation**: Joi

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/NourAlaassarr/Task-Manager.git
```

### 2. Install dependencies:

```bash
cd Task-Manager
npm init
```

### 3. Set up your environment variables:

- Add your MongoDB connection URL and any other required variables (e.g., JWT secret).
  
Example `Config/config.env` file:

```config.env
DB_CONNECTION_URL_LOCAL="mongodb://127.0.0.1:27017/TaskManager"

```

### 4. Run the server:

```bash
nodemon
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

-**GET /ConfirmEmail/:Token** 
 Confirms a user's email using a provided token.
Response:
200 OK: A message indicating that the email has been successfully confirmed.
- Response:
   ```json
   
      {
       "message": "Email successfully confirmed."
      }
    
    ```
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

- **PUT /Task/:TaskId**  
  Update an existing task (e.g., mark as completed). or Update Title-Description-DeadLine
  - Request Body:
    ```json
    {
      "Status": completed
    }
    ```
  - Response: 200 OK with updated task data.

- **DELETE /Task/:TaskId**  
  Delete a task.
  - Response: 200 OK with a message indicating the task was deleted.

- **GET /Task/GetAll**  
  Get a list of tasks for the authenticated user.
  - Response:
    ```json
    [
      {
        "id": "task_id",
        "Title:"Title",
        "Description": "Task description",
        "DeadLine": "2024-11-07T22:00:00.000Z"
        "Status": "completed"
      }
    ]
    ```

## Data Validation

- The application uses **Joi** to validate the data before interacting with the database. For example:
  - Task description must be a string with a minimum length of 3 characters.



## Contribution

Feel free to open issues or submit pull requests if you’d like to contribute to the project.
