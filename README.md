# Task Manager - Full Stack Application

A production-ready task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Task Management**: Complete CRUD operations for tasks
- **Task Filtering**: Filter tasks by status, priority, and search by title/description
- **Task Prioritization**: Low, medium, and high priority levels
- **Due Date Management**: Set and track due dates for tasks
- **Responsive Design**: Fully responsive UI for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant UI updates when tasks are modified
- **Clean Architecture**: Separation of concerns with organized folder structure

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Custom Hooks** - Reusable logic

## 📁 Project Structure

```
full-stack-project/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── utils/
│   │   └── validator.js          # Input validation rules
│   ├── .env                      # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Tasks/
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── TaskItem.jsx
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   └── TaskFilter.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Loader.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   └── authService.js    # API service functions
│   │   ├── hooks/
│   │   │   └── useAuth.js        # Authentication hook
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── auth.css
│   │   │   └── tasks.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Open `.env` file
- Update the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running:
```bash
# For local MongoDB
mongod
```

5. Start the backend server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Open `.env` file
- Update if necessary:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Query Parameters for GET /api/tasks
- `status` - Filter by status (pending/completed)
- `priority` - Filter by priority (low/medium/high)
- `search` - Search in title and description

## 👤 Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Add new tasks with title, description, priority, and due date
4. **Manage Tasks**: 
   - Mark tasks as completed
   - Edit task details
   - Delete tasks
   - Filter by status and priority
   - Search tasks
5. **Logout**: Sign out securely

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Input validation on both frontend and backend
- CORS configuration
- HTTP-only cookies support
- XSS protection
- Environment variable usage for sensitive data

## 🎨 UI Features

- Clean and modern design
- Responsive layout for all screen sizes
- Loading states for async operations
- Error handling with user-friendly messages
- Smooth transitions and animations
- Color-coded task priorities
- Accessible form inputs

## 🧪 Testing

To test the application:

1. Register a new user account
2. Create several tasks with different priorities and due dates
3. Test filtering by status and priority
4. Search for tasks using keywords
5. Mark tasks as completed
6. Edit and delete tasks
7. Test responsive design on different screen sizes

## 📦 Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB database (MongoDB Atlas recommended)
3. Generate a strong JWT secret
4. Enable HTTPS
5. Configure proper CORS origins
6. Deploy to services like Heroku, DigitalOcean, or AWS

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `build` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

3. Update `REACT_APP_API_URL` to point to production backend

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

**CORS Errors:**
- Verify frontend URL in backend CORS configuration
- Check that both servers are running

**Authentication Issues:**
- Clear browser localStorage
- Check JWT_SECRET is set correctly
- Verify token expiration settings

## 📄 License

ISC

## 👨‍💻 Author

Full Stack Developer

---

**Note**: This is a demonstration project built following industry best practices and clean architecture principles. All features are fully functional end-to-end with no placeholder code.
