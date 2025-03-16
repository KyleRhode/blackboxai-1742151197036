import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequestForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const initialType = searchParams.get('type') || 'project';

    const [formData, setFormData] = useState({
        type: initialType,
        title: '',
        description: '',
        priority: 'medium',
        attachments: [],
        systemImpact: '',
        expectedOutcome: '',
        deadline: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [requestNumber, setRequestNumber] = useState('');
    const [similarRequests, setSimilarRequests] = useState([]);

    // Generate request number based on type
    useEffect(() => {
        const generateRequestNumber = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const prefix = formData.type === 'project' ? 'PRJ' :
                         formData.type === 'change' ? 'CHG' : 'BUG';
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `${prefix}-${year}${month}-${random}`;
        };
        setRequestNumber(generateRequestNumber());
    }, [formData.type]);

    // Simulate finding similar requests when title/description changes
    useEffect(() => {
        if (formData.title || formData.description) {
            // Simulated API call to find similar requests
            const mockSimilarRequests = [
                {
                    id: 1,
                    title: 'Similar request 1',
                    type: formData.type,
                    status: 'completed',
                    similarity: '85%'
                },
                {
                    id: 2,
                    title: 'Similar request 2',
                    type: formData.type,
                    status: 'in_progress',
                    similarity: '75%'
                }
            ];
            setSimilarRequests(mockSimilarRequests);
        }
    }, [formData.title, formData.description]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const removeAttachment = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate success
            navigate('/requests', { 
                state: { 
                    success: true, 
                    message: `Request ${requestNumber} has been created successfully.` 
                }
            });
        } catch (err) {
            setError('Failed to create request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Create New Request</h1>
                    <p className="mt-1 text-gray-600">
                        Request Number: <span className="font-mono font-medium">{requestNumber}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Request Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Request Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                        >
                            <option value="project">New Project</option>
                            <option value="change">Change Management</option>
                            <option value="bug">Bug Report</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    {/* System Impact */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">System Impact</label>
                        <textarea
                            name="systemImpact"
                            value={formData.systemImpact}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Describe the impact on existing systems..."
                        />
                    </div>

                    {/* Expected Outcome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expected Outcome</label>
                        <textarea
                            name="expectedOutcome"
                            value={formData.expectedOutcome}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="What is the expected result after implementation?"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    {/* Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attachments</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <i className="fas fa-upload text-gray-400 text-3xl mb-3"></i>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                        <span>Upload files</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, PDF up to 10MB
                                </p>
                            </div>
                        </div>
                        {formData.attachments.length > 0 && (
                            <ul className="mt-4 space-y-2">
                                {formData.attachments.map((file, index) => (
                                    <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                                        <span className="text-sm text-gray-700">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Similar Requests */}
                    {similarRequests.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-yellow-800 mb-2">
                                <i className="fas fa-lightbulb mr-2"></i>
                                Similar Requests Found
                            </h3>
                            <ul className="space-y-2">
                                {similarRequests.map(request => (
                                    <li key={request.id} className="text-sm text-yellow-700">
                                        {request.title} - {request.similarity} similar
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Request...
                                </>
                            ) : (
                                'Create Request'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;
