# Task Manager Backend

Production-ready REST API for task management application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start the server:
```bash
npm start
# or for development
npm run dev
```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "..."
}
```

#### Login User
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "..."
}
```

#### Get User Profile
```
GET /api/auth/profile
Headers: {
  "Authorization": "Bearer <token>"
}
Response: {
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "..."
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks?status=pending&priority=high&search=meeting
Headers: {
  "Authorization": "Bearer <token>"
}
Response: [
  {
    "_id": "...",
    "title": "Complete project",
    "description": "...",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-02-01",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### Create Task
```
POST /api/tasks
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "status": "pending",
  "dueDate": "2026-02-01"
}
```

#### Update Task
```
PUT /api/tasks/:id
Headers: {
  "Authorization": "Bearer <token>"
}
Body: {
  "title": "Updated Task",
  "status": "completed"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: {
  "Authorization": "Bearer <token>"
}
```

## Database Schema

### User Model
- name: String (required, 2-50 chars)
- email: String (required, unique, validated)
- password: String (required, hashed, min 6 chars)
- createdAt: Date

### Task Model
- user: ObjectId (ref: User)
- title: String (required, 3-100 chars)
- description: String (max 500 chars)
- status: String (enum: pending, completed)
- priority: String (enum: low, medium, high)
- dueDate: Date (must be future date)
- createdAt: Date
- updatedAt: Date

## Error Handling

All errors return JSON with the format:
```json
{
  "message": "Error description"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
