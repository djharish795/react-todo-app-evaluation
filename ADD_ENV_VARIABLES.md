# 🔐 Add Environment Variables to Vercel

## Quick Method: Via Vercel Dashboard (2 minutes)

### Backend Environment Variables

1. **Go to:** https://vercel.com/harish-s-projects-08b3d58f/task-manager-api/settings/environment-variables

2. **Add these 4 variables** (click "Add" for each):

   **Variable 1:**
   ```
   Key: MONGODB_URI
   Value: mongodb+srv://djharish795:vasanthi%40143@taskmanager.0bkk8u3.mongodb.net/taskmanager?appName=TaskManager
   Environment: Production
   ```

   **Variable 2:**
   ```
   Key: JWT_SECRET
   Value: flipr_task_manager_super_secure_jwt_secret_key_2024_production
   Environment: Production
   ```

   **Variable 3:**
   ```
   Key: JWT_EXPIRE
   Value: 7d
   Environment: Production
   ```

   **Variable 4:**
   ```
   Key: NODE_ENV
   Value: production
   Environment: Production
   ```

3. **Click "Save"** after adding all variables

4. **Redeploy Backend:**
   - Go to: https://vercel.com/harish-s-projects-08b3d58f/task-manager-api
   - Click the three dots (...) on latest deployment
   - Click "Redeploy"
   - Wait for deployment to complete

---

## ✅ After Backend is Ready

Your backend will be live at: `https://task-manager-api-roan.vercel.app`

**Test it:** Visit `https://task-manager-api-roan.vercel.app/api/health`

Should return: `{"status":"ok","message":"Server is running"}`

---

## Next: Deploy Frontend

After backend environment variables are added and redeployed, we'll deploy the frontend!
