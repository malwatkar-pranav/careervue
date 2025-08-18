import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Settings,
  BarChart3,
  Calendar,
  Clock
} from 'lucide-react';
import { adminAPI } from '../../services/adminAPI';

interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  pendingApplications: number;
  userGrowthRate: number;
  jobGrowthRate: number;
}

interface RecentActivity {
  users: Array<{
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
  jobs: Array<{
    _id: string;
    title: string;
    company: string;
    createdAt: string;
  }>;
  applications: Array<{
    _id: string;
    userId: { name: string; email: string };
    jobId: { title: string; company: string };
    createdAt: string;
  }>;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.stats);
      setRecentActivity(response.recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatGrowthRate = (rate: number) => {
    const isPositive = rate >= 0;
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span className="text-sm font-medium">{Math.abs(rate)}%</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Careervue platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Quick Action</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'jobs', name: 'Jobs', icon: Briefcase },
              { id: 'applications', name: 'Applications', icon: FileText },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  {formatGrowthRate(stats?.userGrowthRate || 0)}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalJobs.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  {formatGrowthRate(stats?.jobGrowthRate || 0)}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalApplications.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">All time</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.activeJobs.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-1 text-green-600">
                    <span className="text-sm font-medium">Live</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.pendingApplications.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <span className="text-sm font-medium">Needs Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Users */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity?.users.map((user) => (
                      <div key={user._id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(user.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Jobs */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity?.jobs.map((job) => (
                      <div key={job._id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
                          <p className="text-sm text-gray-500 truncate">{job.company}</p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(job.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity?.applications.map((application) => (
                      <div key={application._id} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {application.userId.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {application.jobId.title} at {application.jobId.company}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(application.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">
              This section is under development. Advanced {activeTab} management features will be available soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};