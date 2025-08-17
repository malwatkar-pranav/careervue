# Deployment Guide for CareerVue

This guide will help you deploy your CareerVue application to Vercel (frontend) and a backend platform.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab Account**: For version control
3. **MongoDB Atlas Account**: For database hosting
4. **Backend Platform Account**: Choose one:
   - [Render](https://render.com) (Recommended - Free tier available)
   - [Railway](https://railway.app)
   - [Heroku](https://heroku.com)

## Step 1: Deploy Backend

Since Vercel doesn't support long-running Node.js servers well, we'll deploy the backend separately.

### Option A: Deploy to Render (Recommended)

1. **Push your code to GitHub**
2. **Go to [Render.com](https://render.com) and sign up**
3. **Create a new Web Service**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name**: `careervue-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Root Directory**: Leave empty (or `./` if needed)

6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careervue
   JWT_SECRET=your-secure-jwt-secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

7. **Deploy and note the URL** (e.g., `https://careervue-backend.onrender.com`)

### Option B: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Add environment variables as shown above**
4. **Deploy and note the URL**

## Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `careervue-frontend`
   - Directory: `./` (current directory)
   - Override settings: `N`

5. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project dashboard
   - Navigate to Settings > Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

## Step 3: Update CORS Settings

After deploying both frontend and backend, update your backend's CORS settings with the new frontend URL.

## Step 4: Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints at your backend URL
3. **Database**: Ensure MongoDB connection is working
4. **Authentication**: Test login/register functionality

## Environment Variables Summary

### Frontend (Vercel)
- `VITE_API_URL`: Your backend API URL

### Backend (Render/Railway/Heroku)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLIENT_URL`: Your Vercel frontend URL
- `NODE_ENV`: `production`
- `EMAIL_USER`: Gmail username
- `EMAIL_PASS`: Gmail app password
- `EMAIL_FROM`: Sender email address

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `CLIENT_URL` in backend matches your Vercel URL exactly
2. **Build Failures**: Check that all dependencies are in `package.json`
3. **API 404**: Verify `VITE_API_URL` is set correctly in Vercel
4. **Database Connection**: Ensure MongoDB Atlas IP whitelist includes your backend platform

### Useful Commands:

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy to production
vercel --prod

# Remove deployment
vercel remove
```

## Next Steps

After successful deployment:
1. Set up a custom domain (optional)
2. Configure monitoring and analytics
3. Set up CI/CD pipeline
4. Configure backup strategies for your database

## Support

If you encounter issues:
1. Check the deployment logs in your platform dashboard
2. Verify environment variables are set correctly
3. Ensure all dependencies are properly installed
4. Check CORS and network connectivity between frontend and backend 