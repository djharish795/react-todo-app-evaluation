# Deployment Guide - Task Manager Application

## 📋 Submission Requirements

### Required Information
1. ✅ **Name:** EPPILI HARISH
2. ✅ **GitHub Link:** https://github.com/djharish795/react-todo-app-evaluation
3. ✅ **Deployment Link:** (See deployment options below)
4. ✅ **Description Document:** PROJECT_DOCUMENTATION.md

---

## 🚀 Deployment Options

### Option 1: Render (Free Tier - Recommended for Full Stack)

Render allows you to deploy both frontend and backend for free.

#### Backend Deployment on Render

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** task-manager-api
     - **Root Directory:** backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

3. **Add Environment Variables**
   ```
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://task-manager-api.onrender.com`)

#### Frontend Deployment on Render

1. **Update Frontend API URL**
   - Edit `frontend/.env`:
   ```
   REACT_APP_API_URL=https://task-manager-api.onrender.com/api
   ```

2. **Deploy Frontend**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name:** task-manager-app
     - **Root Directory:** frontend
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** build

3. **Add Environment Variable**
   ```
   REACT_APP_API_URL=https://task-manager-api.onrender.com/api
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Copy deployment URL

**Deployment Link:** `https://task-manager-app.onrender.com`

---

### Option 2: Vercel + Render

#### Backend on Render (Same as above)

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Update API URL**
   ```bash
   cd frontend
   # Edit .env
   REACT_APP_API_URL=https://task-manager-api.onrender.com/api
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variable**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add: `REACT_APP_API_URL=https://task-manager-api.onrender.com/api`

**Deployment Link:** `https://your-app.vercel.app`

---

### Option 3: MongoDB Atlas + Render

#### 1. Setup MongoDB Atlas (Required for all options)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up (free tier available)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add new user
   - Username: `admin`
   - Password: Generate secure password
   - Set privileges: "Read and write to any database"

4. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `taskmanager`

   Example:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

---

### Option 4: Heroku (Backend) + Netlify (Frontend)

#### Backend on Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create task-manager-api-harish
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://..."
   heroku config:set JWT_SECRET="your_secret_key"
   heroku config:set JWT_EXPIRE="7d"
   heroku config:set NODE_ENV="production"
   ```

4. **Create Procfile**
   ```bash
   echo "web: node server.js" > Procfile
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push heroku main
   ```

**Backend URL:** `https://task-manager-api-harish.herokuapp.com`

#### Frontend on Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build Production**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=build
   ```

4. **Set Environment Variable**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add: `REACT_APP_API_URL=https://task-manager-api-harish.herokuapp.com/api`

**Frontend URL:** `https://your-app-name.netlify.app`

---

## 📝 Submission Format

### For Company Submission

```
Name: EPPILI HARISH

GitHub Link: https://github.com/djharish795/react-todo-app-evaluation

Deployment Link: https://task-manager-app.onrender.com
(or your actual deployment URL)

Description Document: 
https://github.com/djharish795/react-todo-app-evaluation/blob/main/PROJECT_DOCUMENTATION.md

Technology Stack: MERN (MongoDB, Express.js, React.js, Node.js)
Authentication: JWT
Features: Complete CRUD, Authentication, Filtering, Search, Responsive Design
```

---

## 🔗 Important Links After Deployment

1. **GitHub Repository:**
   ```
   https://github.com/djharish795/react-todo-app-evaluation
   ```

2. **Project Documentation:**
   ```
   https://github.com/djharish795/react-todo-app-evaluation/blob/main/PROJECT_DOCUMENTATION.md
   ```

3. **Frontend Deployment:**
   ```
   https://[your-frontend-url]
   ```

4. **Backend API:**
   ```
   https://[your-backend-url]
   ```

5. **API Health Check:**
   ```
   https://[your-backend-url]/api/health
   ```

---

## ✅ Pre-Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Environment variables ready
- [ ] CORS configured with production frontend URL

### Frontend
- [ ] API URL updated to production backend
- [ ] Build command tested locally (`npm run build`)
- [ ] Environment variables configured
- [ ] Build folder generated successfully

### Testing
- [ ] Register new user works
- [ ] Login works
- [ ] Create task works
- [ ] View tasks works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Filter and search work
- [ ] Logout works
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔧 Post-Deployment Configuration

### Update CORS in Backend

After deploying frontend, update backend `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.com'
  ],
  credentials: true
}));
```

Redeploy backend after this change.

---

## 📊 Monitoring Your Deployment

### Check Backend Health
```bash
curl https://your-backend-url/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Test API Endpoints
```bash
# Register user
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 🐛 Troubleshooting Deployment

### Issue: MongoDB Connection Failed
**Solution:** 
- Verify connection string is correct
- Check if IP 0.0.0.0/0 is whitelisted
- Ensure password doesn't contain special characters (URL encode if needed)

### Issue: CORS Error on Frontend
**Solution:**
- Add frontend URL to backend CORS configuration
- Redeploy backend
- Clear browser cache

### Issue: Environment Variables Not Working
**Solution:**
- Ensure variables are set in deployment platform dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: Build Fails on Deployment
**Solution:**
- Test build locally first: `npm run build`
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check for any console errors

---

## 💡 Cost Breakdown (Free Tier)

### Render (Recommended)
- **Backend:** Free (with limitations: 750 hours/month, sleeps after inactivity)
- **Frontend:** Free (100 GB bandwidth/month)
- **Total:** $0/month

### MongoDB Atlas
- **Database:** Free (512 MB storage)
- **Total:** $0/month

### Alternative: Paid Options
- **Render Pro:** $7/month (no sleep, better performance)
- **Heroku Hobby:** $7/month
- **MongoDB Atlas Shared:** $9/month (more storage)

---

## 🎯 Quick Deployment Commands

### Full deployment in one go (Render)

```bash
# 1. Setup MongoDB Atlas (manual - web interface)

# 2. Push to GitHub
git add .
git commit -m "Final deployment ready"
git push origin main

# 3. Deploy on Render (manual - web interface)
# - Connect GitHub repo
# - Configure backend web service
# - Configure frontend static site
# - Add environment variables

# 4. Test deployment
curl https://your-backend-url/api/health
```

---

## 📧 Support

If you face any deployment issues:
- Check Render logs: Dashboard → Your Service → Logs
- Check browser console: F12 → Console tab
- Verify environment variables are set
- Ensure MongoDB Atlas is accessible

---

**Deployment Status:** ✅ Ready for Production  
**Estimated Deployment Time:** 30-45 minutes  
**Difficulty Level:** Beginner-Friendly  

---

## 🎉 Next Steps After Deployment

1. Test all features thoroughly
2. Share deployment link with team
3. Submit GitHub link + Deployment link + Documentation link
4. Monitor application performance
5. Check for any errors in production logs

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Author:** EPPILI HARISH
