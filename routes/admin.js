import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { adminAuth, checkPermission, requireRole } from '../middleware/adminAuth.js';
import crypto from 'crypto';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.status(423).json({ 
        message: 'Account temporarily locked due to too many failed login attempts' 
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Reset login attempts on successful login
    if (admin.loginAttempts > 0) {
      await admin.resetLoginAttempts();
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '8h' } // Shorter expiry for admin sessions
    );

    res.json({
      message: 'Admin login successful',
      token,
      admin
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
});

// Get admin dashboard stats
router.get('/dashboard/stats', adminAuth, checkPermission('analytics', 'view'), async (req, res) => {
  try {
    const [
      totalUsers,
      totalJobs,
      totalApplications,
      activeJobs,
      pendingApplications,
      recentUsers,
      recentJobs,
      recentApplications
    ] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Application.countDocuments({ status: 'pending' }),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt'),
      Job.find().sort({ createdAt: -1 }).limit(5).select('title company createdAt'),
      Application.find().sort({ createdAt: -1 }).limit(5)
        .populate('userId', 'name email')
        .populate('jobId', 'title company')
    ]);

    // Calculate growth rates (last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [
      newUsersLast30,
      newUsersPrevious30,
      newJobsLast30,
      newJobsPrevious30
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ 
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } 
      }),
      Job.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Job.countDocuments({ 
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } 
      })
    ]);

    const userGrowthRate = newUsersPrevious30 > 0 
      ? ((newUsersLast30 - newUsersPrevious30) / newUsersPrevious30 * 100).toFixed(1)
      : 0;

    const jobGrowthRate = newJobsPrevious30 > 0 
      ? ((newJobsLast30 - newJobsPrevious30) / newJobsPrevious30 * 100).toFixed(1)
      : 0;

    res.json({
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        activeJobs,
        pendingApplications,
        userGrowthRate: parseFloat(userGrowthRate),
        jobGrowthRate: parseFloat(jobGrowthRate)
      },
      recent: {
        users: recentUsers,
        jobs: recentJobs,
        applications: recentApplications
      }
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
});

// Get all users with pagination and filters
router.get('/users', adminAuth, checkPermission('users', 'view'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isVerified,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }
    
    if (role) filter.role = role;
    if (isVerified !== undefined) filter.isVerified = isVerified === 'true';

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password')
      .exec();

    const total = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Update user status
router.put('/users/:id/status', adminAuth, checkPermission('users', 'edit'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified, role } = req.body;

    const updateData = {};
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User status updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      message: 'Failed to update user status',
      error: error.message
    });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, checkPermission('users', 'delete'), async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Also delete user's applications
    await Application.deleteMany({ userId: id });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message
    });
  }
});

// Get all jobs with admin filters
router.get('/jobs', adminAuth, checkPermission('jobs', 'view'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      category,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') }
      ];
    }
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Job.countDocuments(filter);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin jobs error:', error);
    res.status(500).json({
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
});

// Update job status
router.put('/jobs/:id/status', adminAuth, checkPermission('jobs', 'edit'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive, featured } = req.body;

    const updateData = {};
    if (isActive !== undefined) updateData.isActive = isActive;
    if (featured !== undefined) updateData.featured = featured;

    const job = await Job.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({
      message: 'Job status updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job status error:', error);
    res.status(500).json({
      message: 'Failed to update job status',
      error: error.message
    });
  }
});

// Get all applications with admin filters
router.get('/applications', adminAuth, checkPermission('applications', 'view'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      jobId,
      userId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (status) filter.status = status;
    if (jobId) filter.jobId = jobId;
    if (userId) filter.userId = userId;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const applications = await Application.find(filter)
      .populate('userId', 'name email phone')
      .populate('jobId', 'title company type location')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Application.countDocuments(filter);

    res.json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin applications error:', error);
    res.status(500).json({
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
});

// Get current admin profile
router.get('/profile', adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      message: 'Failed to get admin profile',
      error: error.message
    });
  }
});

// Update admin profile
router.put('/profile', adminAuth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password updates through this route
    delete updates.role; // Don't allow role updates through this route
    delete updates.permissions; // Don't allow permission updates through this route

    const admin = await Admin.findByIdAndUpdate(
      req.adminId,
      updates,
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      message: 'Admin profile updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      message: 'Failed to update admin profile',
      error: error.message
    });
  }
});

// Create new admin (super admin only)
router.post('/create', adminAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { name, email, password, role, department, permissions } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    const admin = new Admin({
      name,
      email,
      password,
      role: role || 'admin',
      department,
      permissions: permissions || {}
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      admin
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      message: 'Failed to create admin',
      error: error.message
    });
  }
});

// Get all admins (super admin only)
router.get('/admins', adminAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ admins });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      message: 'Failed to fetch admins',
      error: error.message
    });
  }
});

// Update admin permissions (super admin only)
router.put('/admins/:id/permissions', adminAuth, requireRole('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions, role } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { permissions, role },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      message: 'Admin permissions updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update admin permissions error:', error);
    res.status(500).json({
      message: 'Failed to update admin permissions',
      error: error.message
    });
  }
});

export default router;