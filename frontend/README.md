# Task Manager Frontend

Production-ready React application for task management.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Features

- User authentication (register/login)
- Task CRUD operations
- Task filtering and search
- Priority management
- Due date tracking
- Responsive design
- Real-time updates

## Component Structure

### Authentication
- `Login.jsx` - User login form
- `Register.jsx` - User registration form

### Tasks
- `TaskList.jsx` - Main task management container
- `TaskItem.jsx` - Individual task display and actions
- `TaskForm.jsx` - Task creation/editing form
- `TaskFilter.jsx` - Task filtering controls

### Layout
- `Header.jsx` - Navigation header
- `Loader.jsx` - Loading spinner

### Routing
- `PrivateRoute.jsx` - Protected route wrapper

## State Management

Uses React Context API for authentication state:
- `AuthContext.jsx` - Global auth state
- `useAuth.js` - Custom hook for accessing auth context

## Services

- `api.js` - Axios configuration with interceptors
- `authService.js` - API service functions

## Styling

CSS organization:
- `global.css` - Base styles and utilities
- `auth.css` - Authentication page styles
- `tasks.css` - Task management styles

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Build

Production build creates optimized bundle in `build/` directory:
```bash
npm run build
```
