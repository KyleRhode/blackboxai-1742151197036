import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isBusinessAnalyst, isDeveloper } = useAuth();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarRequests, setSimilarRequests] = useState([]);
    const [aiRecommendations, setAiRecommendations] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [statusUpdate, setStatusUpdate] = useState('');

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock request data
                const mockRequest = {
                    id,
                    number: 'BUG-202401-001',
                    title: 'Authentication Service Error',
                    type: 'bug',
                    status: 'in_progress',
                    priority: 'high',
                    description: 'Users are experiencing intermittent login failures during peak hours.',
                    systemImpact: 'Affects all user authentication attempts',
                    expectedOutcome: 'Stable authentication service with no failures',
                    assignee: 'Jane Developer',
                    createdBy: 'John User',
                    createdAt: '2024-01-15T10:30:00Z',
                    deadline: '2024-01-22',
                    attachments: [
                        { name: 'error_log.txt', size: '24KB' },
                        { name: 'screenshot.png', size: '156KB' }
                    ]
                };

                setRequest(mockRequest);

                // Mock similar requests
                setSimilarRequests([
                    {
                        id: '2',
                        number: 'BUG-202312-045',
                        title: 'Login Session Timeout Issue',
                        status: 'completed',
                        similarity: '85%',
                        solution: 'Updated session management configuration'
                    },
                    {
                        id: '3',
                        number: 'BUG-202311-032',
                        title: 'Authentication Cache Problem',
                        status: 'completed',
                        similarity: '75%',
                        solution: 'Implemented cache invalidation strategy'
                    }
                ]);

                // Mock AI recommendations
                setAiRecommendations({
                    suggestedFix: 'Based on similar resolved issues, consider reviewing the session management configuration and implementing a robust cache invalidation strategy.',
                    impactAnalysis: 'High impact on user experience and system security',
                    estimatedEffort: '4-6 hours',
                    successProbability: '85%',
                    relatedPatterns: [
                        'Session Management',
                        'Cache Invalidation',
                        'Authentication Flow'
                    ]
                });

                // Mock comments
                setComments([
                    {
                        id: 1,
                        user: 'John Analyst',
                        content: 'Initial investigation shows this might be related to recent cache updates.',
                        timestamp: '2024-01-15T11:00:00Z'
                    },
                    {
                        id: 2,
                        user: 'Jane Developer',
                        content: 'Starting implementation of suggested cache invalidation strategy.',
                        timestamp: '2024-01-15T14:30:00Z'
                    }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching request details:', error);
                // Handle error appropriately
            }
        };

        fetchRequestDetails();
    }, [id]);

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        // Simulate API call to update status
        await new Promise(resolve => setTimeout(resolve, 500));
        setRequest(prev => ({ ...prev, status: statusUpdate }));
        setStatusUpdate('');
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        // Simulate API call to add comment
        const comment = {
            id: comments.length + 1,
            user: user.name,
            content: newComment,
            timestamp: new Date().toISOString()
        };

        setComments(prev => [...prev, comment]);
        setNewComment('');
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Request not found</h2>
                <button
                    onClick={() => navigate('/requests')}
                    className="mt-4 text-primary-600 hover:text-primary-800"
                >
                    Back to Requests
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{request.title}</h1>
                        <p className="text-gray-500">{request.number}</p>
                    </div>
                    <div className="flex space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ')}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Details */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Request Details</h2>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Type</dt>
                                <dd className="mt-1 text-sm text-gray-900 capitalize">{request.type}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Assignee</dt>
                                <dd className="mt-1 text-sm text-gray-900">{request.assignee}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Created By</dt>
                                <dd className="mt-1 text-sm text-gray-900">{request.createdBy}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(request.createdAt).toLocaleString()}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(request.deadline).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Description */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{request.description}</p>
                    </div>

                    {/* System Impact & Expected Outcome */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">System Impact</h3>
                            <p className="text-gray-700">{request.systemImpact}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Expected Outcome</h3>
                            <p className="text-gray-700">{request.expectedOutcome}</p>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
                        <ul className="divide-y divide-gray-200">
                            {request.attachments.map((attachment, index) => (
                                <li key={index} className="py-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <i className="fas fa-file-alt text-gray-400 mr-3"></i>
                                        <span className="text-sm text-gray-900">{attachment.name}</span>
                                        <span className="ml-2 text-sm text-gray-500">({attachment.size})</span>
                                    </div>
                                    <button className="text-primary-600 hover:text-primary-800">
                                        <i className="fas fa-download"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Comments */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <span className="font-medium text-gray-900">{comment.user}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-700">{comment.content}</p>
                                </div>
                            ))}
                            <form onSubmit={handleCommentSubmit} className="mt-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                    rows="3"
                                ></textarea>
                                <div className="mt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                                    >
                                        Add Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Update */}
                    {(isBusinessAnalyst() || isDeveloper()) && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Update Status</h2>
                            <form onSubmit={handleStatusUpdate}>
                                <select
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="">Select status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button
                                    type="submit"
                                    disabled={!statusUpdate}
                                    className="mt-3 w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                                >
                                    Update Status
                                </button>
                            </form>
                        </div>
                    )}

                    {/* AI Recommendations */}
                    {request.type === 'bug' && aiRecommendations && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                <i className="fas fa-robot text-primary-600 mr-2"></i>
                                AI Recommendations
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Suggested Fix</h3>
                                    <p className="mt-1 text-sm text-gray-600">{aiRecommendations.suggestedFix}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Impact Analysis</h3>
                                    <p className="mt-1 text-sm text-gray-600">{aiRecommendations.impactAnalysis}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Estimated Effort</h3>
                                    <p className="mt-1 text-sm text-gray-600">{aiRecommendations.estimatedEffort}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Success Probability</h3>
                                    <p className="mt-1 text-sm text-gray-600">{aiRecommendations.successProbability}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Related Patterns</h3>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {aiRecommendations.relatedPatterns.map((pattern, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-sm"
                                            >
                                                {pattern}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Similar Requests */}
                    {similarRequests.length > 0 && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Similar Requests</h2>
                            <div className="space-y-4">
                                {similarRequests.map((similar) => (
                                    <div key={similar.id} className="border-l-4 border-primary-500 pl-4">
                                        <h3 className="text-sm font-medium text-gray-900">{similar.title}</h3>
                                        <p className="text-sm text-gray-500">{similar.number}</p>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-sm text-primary-600">
                                                {similar.similarity} similar
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(similar.status)}`}>
                                                {similar.status}
                                            </span>
                                        </div>
                                        {similar.solution && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Solution: {similar.solution}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
