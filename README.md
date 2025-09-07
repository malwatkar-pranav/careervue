# CareerVue

A comprehensive career platform with job listings, CV creation, and government job opportunities.

## Project Structure

```
careervue/
├── client/          # Frontend React application
│   ├── src/         # React source code
│   ├── public/      # Static assets
│   ├── package.json # Frontend dependencies
│   └── ...         # Frontend config files
├── server/          # Backend Node.js application
│   ├── index.js     # Server entry point
│   ├── routes/      # API routes
│   ├── models/      # Database models
│   ├── middleware/  # Custom middleware
│   ├── utils/       # Utility functions
│   ├── package.json # Backend dependencies
│   └── ...         # Backend files
└── README.md        # This file
```

## Getting Started

### Environment Setup
Before running the application, you need to set up environment variables:

1. Copy the example environment files to create your own:
   ```bash
   # For client
   cp client/.env.example client/.env
   
   # For server
   cp server/.env.example server/.env
   ```

2. Edit the `.env` files with your specific configuration
3. See `ENV_SETUP.md` for detailed information about environment variables

### Frontend (Client)
```bash
cd client
npm install
npm run dev
```

### Backend (Server)
```bash
cd server
npm install
npm run dev
```

## Features

- User authentication and authorization
- Job listings and applications
- CV creation and management
- Government job opportunities
- Company directory
- Admin dashboard
- Email notifications

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Email**: Nodemailer