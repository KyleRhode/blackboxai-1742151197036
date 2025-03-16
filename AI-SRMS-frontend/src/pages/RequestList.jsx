import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequestList = () => {
    const location = useLocation();
    const { user, isBusinessAnalyst, isDeveloper } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: '',
        status: '',
        priority: '',
        assignee: '',
        searchTerm: ''
    });
    const [groupBy, setGroupBy] = useState('none');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Simulated request data
    useEffect(() => {
        const fetchRequests = async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const mockRequests = [
                {
                    id: 1,
                    number: 'PRJ-202401-001',
                    title: 'New CRM Integration',
                    type: 'project',
                    status: 'pending',
                    priority: 'high',
                    createdAt: '2024-01-15',
                    assignee: 'John Analyst',
                    description: 'Implement new CRM system integration',
                    similarityGroup: 'CRM'
                },
                {
                    id: 2,
                    number: 'BUG-202401-002',
                    title: 'Login Authentication Error',
                    type: 'bug',
                    status: 'in_progress',
                    priority: 'critical',
                    createdAt: '2024-01-16',
                    assignee: 'Jane Developer',
                    description: 'Users unable to login after password reset',
                    similarityGroup: 'Authentication'
                },
                {
                    id: 3,
                    number: 'CHG-202401-003',
                    title: 'Update Payment Gateway',
                    type: 'change',
                    status: 'pending',
                    priority: 'medium',
                    createdAt: '2024-01-17',
                    assignee: 'John Analyst',
                    description: 'Upgrade payment gateway to latest version',
                    similarityGroup: 'Payment'
                }
            ];
            
            setRequests(mockRequests);
            setLoading(false);
        };

        fetchRequests();
    }, []);

    // Filter and sort requests
    const filteredAndSortedRequests = () => {
        let filtered = [...requests];

        // Apply filters
        if (filters.type) {
            filtered = filtered.filter(req => req.type === filters.type);
        }
        if (filters.status) {
            filtered = filtered.filter(req => req.status === filters.status);
        }
        if (filters.priority) {
            filtered = filtered.filter(req => req.priority === filters.priority);
        }
        if (filters.assignee) {
            filtered = filtered.filter(req => req.assignee === filters.assignee);
        }
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(req => 
                req.title.toLowerCase().includes(term) ||
                req.description.toLowerCase().includes(term) ||
                req.number.toLowerCase().includes(term)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return sortOrder === 'desc' 
                        ? new Date(b.createdAt) - new Date(a.createdAt)
                        : new Date(a.createdAt) - new Date(b.createdAt);
                case 'priority':
                    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                    return sortOrder === 'desc'
                        ? priorityOrder[b.priority] - priorityOrder[a.priority]
                        : priorityOrder[a.priority] - priorityOrder[b.priority];
                default:
                    return 0;
            }
        });

        return filtered;
    };

    // Group requests
    const groupedRequests = () => {
        const filtered = filteredAndSortedRequests();
        if (groupBy === 'none') return { 'All Requests': filtered };

        return filtered.reduce((groups, request) => {
            const key = groupBy === 'type' ? request.type :
                       groupBy === 'status' ? request.status :
                       groupBy === 'priority' ? request.priority :
                       groupBy === 'similarity' ? request.similarityGroup :
                       'Other';
            
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(request);
            return groups;
        }, {});
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-blue-100 text-blue-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Success Message */}
            {location.state?.success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex">
                        <i className="fas fa-check-circle text-green-400 mt-0.5 mr-3"></i>
                        <div className="text-green-700">
                            {location.state.message}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
                <Link
                    to="/requests/new"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                    <i className="fas fa-plus mr-2"></i>
                    New Request
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="">All Types</option>
                            <option value="project">Project</option>
                            <option value="change">Change</option>
                            <option value="bug">Bug</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            placeholder="Search requests..."
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
                        <select
                            value={groupBy}
                            onChange={(e) => setGroupBy(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="none">No Grouping</option>
                            <option value="type">Type</option>
                            <option value="status">Status</option>
                            <option value="priority">Priority</option>
                            <option value="similarity">Similarity</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="date">Date</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Request List */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                </div>
            ) : (
                Object.entries(groupedRequests()).map(([group, groupRequests]) => (
                    <div key={group} className="space-y-4">
                        {groupBy !== 'none' && (
                            <h2 className="text-lg font-medium text-gray-900 capitalize">
                                {group}
                            </h2>
                        )}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Request
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Assignee
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {groupRequests.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {request.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {request.number}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="capitalize">{request.type}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                        {request.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                                                        {request.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {request.assignee}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(request.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        to={`/requests/${request.id}`}
                                                        className="text-primary-600 hover:text-primary-900"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default RequestList;
