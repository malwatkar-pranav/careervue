import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/routeAuth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
// app.use(cors(
//   (
//     origin:{"https://deploy-mern-lwhq.vercel.app"},
//             methods:{"POST","GET"},
//             credentials:true
//             )
//     ));
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  // origin: process.env.CLIENT_URL || 'http://localhost:5173',
  origin: process.env.CLIENT_URL || '${inport.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careervue', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb://${inport.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/careervue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
