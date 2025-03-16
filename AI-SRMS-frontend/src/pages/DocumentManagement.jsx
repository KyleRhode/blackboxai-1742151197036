import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DocumentManagement = () => {
    const { user, isBusinessAnalyst } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: '',
        type: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API calls
                await Promise.all([fetchDocuments(), fetchRequests()]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchDocuments = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockDocuments = [
            {
                id: 1,
                title: 'Requirements Specification',
                requestNumber: 'PRJ-202401-001',
                type: 'specification',
                status: 'pending_signature',
                createdAt: '2024-01-15T10:00:00Z',
                lastModified: '2024-01-15T15:30:00Z',
                signedBy: [],
                format: 'pdf'
            },
            {
                id: 2,
                title: 'Change Impact Analysis',
                requestNumber: 'CHG-202401-002',
                type: 'analysis',
                status: 'signed',
                createdAt: '2024-01-14T09:00:00Z',
                lastModified: '2024-01-14T16:45:00Z',
                signedBy: ['John Approver'],
                format: 'docx'
            }
        ];
        
        setDocuments(mockDocuments);
    };

    const fetchRequests = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRequests = [
            {
                id: 1,
                number: 'PRJ-202401-001',
                title: 'New CRM Integration'
            },
            {
                id: 2,
                number: 'CHG-202401-002',
                title: 'Update Payment Gateway'
            }
        ];
        
        setRequests(mockRequests);
    };

    const handleGenerateDocument = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newDocument = {
                id: documents.length + 1,
                title: `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} Document`,
                requestNumber: selectedRequest,
                type: documentType,
                status: 'pending_signature',
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                signedBy: [],
                format: 'pdf'
            };

            setDocuments(prev => [...prev, newDocument]);
            setSelectedRequest('');
            setDocumentType('');
        } catch (error) {
            console.error('Error generating document:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignDocument = async (document) => {
        setSelectedDocument(document);
        setShowSignatureModal(true);
    };

    const handleSignatureSubmit = async () => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setDocuments(prev => prev.map(doc => 
                doc.id === selectedDocument.id
                    ? {
                        ...doc,
                        status: 'signed',
                        signedBy: [...doc.signedBy, user.name],
                        lastModified: new Date().toISOString()
                    }
                    : doc
            ));
        } catch (error) {
            console.error('Error signing document:', error);
        } finally {
            setShowSignatureModal(false);
            setSelectedDocument(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending_signature': return 'bg-yellow-100 text-yellow-800';
            case 'signed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.requestNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !filters.status || doc.status === filters.status;
        const matchesType = !filters.type || doc.type === filters.type;
        return matchesSearch && matchesStatus && matchesType;
    });

    if (!isBusinessAnalyst()) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
                <p className="mt-2 text-gray-600">
                    Only Business Analysts can access the document management system.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
                <p className="mt-2 text-gray-600">
                    Generate and manage documents for software requests
                </p>
            </div>

            {/* Generate Document Form */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Generate New Document</h2>
                <form onSubmit={handleGenerateDocument} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Request</label>
                            <select
                                value={selectedRequest}
                                onChange={(e) => setSelectedRequest(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="">Select a request</option>
                                {requests.map(request => (
                                    <option key={request.id} value={request.number}>
                                        {request.number} - {request.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Document Type</label>
                            <select
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="">Select type</option>
                                <option value="specification">Requirements Specification</option>
                                <option value="analysis">Impact Analysis</option>
                                <option value="approval">Approval Document</option>
                                <option value="technical">Technical Documentation</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !selectedRequest || !documentType}
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                        >
                            {loading ? 'Generating...' : 'Generate Document'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Document List */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Documents</h2>
                    
                    {/* Search and Filters */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending_signature">Pending Signature</option>
                                <option value="signed">Signed</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="">All Types</option>
                                <option value="specification">Specification</option>
                                <option value="analysis">Analysis</option>
                                <option value="approval">Approval</option>
                                <option value="technical">Technical</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Document
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Request
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Modified
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDocuments.map((document) => (
                                    <tr key={document.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <i className={`fas fa-file-${document.format} text-gray-400 mr-3`}></i>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {document.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {document.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {document.requestNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(document.status)}`}>
                                                {document.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(document.lastModified).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => {/* Handle preview */}}
                                                    className="text-primary-600 hover:text-primary-900"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    onClick={() => {/* Handle download */}}
                                                    className="text-primary-600 hover:text-primary-900"
                                                >
                                                    <i className="fas fa-download"></i>
                                                </button>
                                                {document.status === 'pending_signature' && (
                                                    <button
                                                        onClick={() => handleSignDocument(document)}
                                                        className="text-primary-600 hover:text-primary-900"
                                                    >
                                                        <i className="fas fa-signature"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Signature Modal */}
            {showSignatureModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Sign Document</h3>
                        <p className="text-gray-600 mb-4">
                            You are about to sign: <strong>{selectedDocument.title}</strong>
                        </p>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                            <div className="text-center">
                                <i className="fas fa-signature text-4xl text-gray-400 mb-2"></i>
                                <p className="text-sm text-gray-500">Click to sign or draw signature</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowSignatureModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSignatureSubmit}
                                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                            >
                                Sign Document
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentManagement;
