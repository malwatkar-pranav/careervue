#!/bin/bash

echo "🚀 Starting CareerVue Deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment completed!"
echo "📝 Don't forget to:"
echo "   1. Set VITE_API_URL environment variable in Vercel dashboard"
echo "   2. Deploy your backend to Render/Railway/Heroku"
echo "   3. Update CORS settings in your backend"
echo "   4. Test your deployed application" 