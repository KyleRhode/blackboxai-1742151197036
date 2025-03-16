import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, isBusinessAnalyst, isDeveloper, isExco } = useAuth();
    const [stats, setStats] = useState({
        newProjects: 0,
        changes: 0,
        bugs: 0,
        pendingApprovals: 0,
        assignedTasks: 0
    });

    // Simulated data - replace with actual API calls
    useEffect(() => {
        // Simulate API call
        const fetchStats = () => {
            const mockStats = {
                newProjects: 12,
                changes: 25,
                bugs: 18,
                pendingApprovals: 8,
                assignedTasks: 15
            };
            setStats(mockStats);
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon, color }) => (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={`rounded-full p-3 ${color}`}>
                    <i className={`${icon} text-white text-xl`}></i>
                </div>
                <div className="ml-4">
                    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const RequestTypeCard = ({ type, description, icon, to }) => (
        <Link
            to={to}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
        >
            <div className="flex items-center mb-4">
                <div className="rounded-full p-3 bg-primary-100 text-primary-600">
                    <i className={`${icon} text-xl`}></i>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">{type}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </Link>
    );

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}!
                </h1>
                <p className="mt-2 text-gray-600">
                    Here's an overview of your software request management system.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="New Projects"
                    value={stats.newProjects}
                    icon="fas fa-project-diagram"
                    color="bg-blue-500"
                />
                <StatCard
                    title="Change Requests"
                    value={stats.changes}
                    icon="fas fa-exchange-alt"
                    color="bg-green-500"
                />
                <StatCard
                    title="Bug Reports"
                    value={stats.bugs}
                    icon="fas fa-bug"
                    color="bg-red-500"
                />
            </div>

            {/* Role-specific Sections */}
            {isBusinessAnalyst() && (
                <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Business Analyst Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard
                            title="Pending Approvals"
                            value={stats.pendingApprovals}
                            icon="fas fa-clock"
                            color="bg-yellow-500"
                        />
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    to="/documents"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <i className="fas fa-file-alt mr-2"></i>
                                    View Documents
                                </Link>
                                <Link
                                    to="/requests/new"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <i className="fas fa-plus mr-2"></i>
                                    Create New Request
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDeveloper() && (
                <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Developer Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard
                            title="Assigned Tasks"
                            value={stats.assignedTasks}
                            icon="fas fa-tasks"
                            color="bg-purple-500"
                        />
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-medium text-gray-900 mb-4">Recent Bug Fixes</h3>
                            <div className="space-y-3">
                                {/* Simulated recent bug fixes */}
                                <div className="px-4 py-2 text-sm text-gray-700 border-l-4 border-green-500">
                                    Login authentication fix
                                </div>
                                <div className="px-4 py-2 text-sm text-gray-700 border-l-4 border-green-500">
                                    Database connection optimization
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Request Types Section */}
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Create New Request</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RequestTypeCard
                        type="New Project"
                        description="Submit a request for a new software project initiative."
                        icon="fas fa-plus-circle"
                        to="/requests/new?type=project"
                    />
                    <RequestTypeCard
                        type="Change Management"
                        description="Request changes to existing systems or processes."
                        icon="fas fa-exchange-alt"
                        to="/requests/new?type=change"
                    />
                    <RequestTypeCard
                        type="Bug Report"
                        description="Report software issues and track their resolution."
                        icon="fas fa-bug"
                        to="/requests/new?type=bug"
                    />
                </div>
            </div>

            {/* AI Insights Section */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow p-6 text-white">
                <div className="flex items-center mb-4">
                    <i className="fas fa-robot text-2xl mr-3"></i>
                    <h2 className="text-lg font-medium">AI Insights</h2>
                </div>
                <p className="mb-4">
                    Our AI system has analyzed recent requests and identified the following insights:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Similar Requests</h3>
                        <p className="text-sm">
                            3 similar bug reports found in the authentication module.
                            Consider reviewing the entire module.
                        </p>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Process Optimization</h3>
                        <p className="text-sm">
                            Suggested workflow improvements could reduce request processing time by 25%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
