# Vercel Deployment Guide

## 🚀 Deploy to Vercel (Free & Fast)

### Prerequisites
1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Deploy Backend

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `djharish795/react-todo-app-evaluation`
3. Configure project:
   - **Project Name:** `task-manager-api`
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

4. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your_super_secure_jwt_secret_key_change_this
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   ```

5. Click "Deploy"
6. Copy your backend URL (e.g., `https://task-manager-api.vercel.app`)

### Step 2: Deploy Frontend

1. Click "Add New Project"
2. Import same repository again
3. Configure project:
   - **Project Name:** `task-manager-app`
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://task-manager-api.vercel.app/api
   ```

5. Click "Deploy"
6. Your app will be live at `https://task-manager-app.vercel.app`

---

## Option 2: Deploy via CLI

### Backend Deployment

```bash
cd backend
vercel --prod

# When prompted:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# What's your project's name? task-manager-api
# In which directory is your code located? ./
# Want to override settings? No

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add JWT_EXPIRE
vercel env add NODE_ENV
```

### Frontend Deployment

```bash
cd frontend
vercel --prod

# When prompted:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# What's your project's name? task-manager-app
# In which directory is your code located? ./
# Want to override settings? Yes
# Build Command? npm run build
# Output Directory? build
# Development Command? npm start

# Add environment variable
vercel env add REACT_APP_API_URL
# Enter: https://task-manager-api.vercel.app/api
```

---

## MongoDB Atlas Setup (If not done)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Replace `<password>` and `<dbname>`:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

---

## Final Links

After deployment, your links will be:

```
Backend API: https://task-manager-api.vercel.app
Frontend App: https://task-manager-app.vercel.app
API Health: https://task-manager-api.vercel.app/api/health
```

---

## Submission Format

```
Name: EPPILI HARISH

GitHub Link: 
https://github.com/djharish795/react-todo-app-evaluation

Deployment Link:
https://task-manager-app.vercel.app

Description Document:
https://github.com/djharish795/react-todo-app-evaluation/blob/main/PROJECT_DOCUMENTATION.md
```

---

## Troubleshooting

### Backend shows "Internal Server Error"
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Vercel deployment logs

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS configuration in backend
- Redeploy frontend after backend is ready

### MongoDB connection failed
- Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- Check connection string has correct password
- Ensure database name is included

---

**Deployment Time:** 10-15 minutes  
**Cost:** FREE on Vercel  
**Status:** ✅ Production Ready
