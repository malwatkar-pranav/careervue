import express from 'express';

export const adminRoutes = express.Router();

// Example admin route
adminRoutes.get('/', (req, res) => {
    res.send('Admin dashboard');
});

// Add more admin routes here