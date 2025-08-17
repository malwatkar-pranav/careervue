@echo off
echo 🚀 Starting CareerVue Deployment to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please login to Vercel...
    vercel login
)

REM Build the project
echo 📦 Building the project...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the errors and try again.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo 🎉 Deployment completed!
echo 📝 Don't forget to:
echo    1. Set VITE_API_URL environment variable in Vercel dashboard
echo    2. Deploy your backend to Render/Railway/Heroku
echo    3. Update CORS settings in your backend
echo    4. Test your deployed application

pause 