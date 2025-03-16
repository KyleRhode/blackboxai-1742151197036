import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { isExco } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testingConnection, setTestingConnection] = useState(false);
    const [activeTab, setActiveTab] = useState('crm');
    const [settings, setSettings] = useState({
        crm: {
            provider: 'salesforce',
            apiKey: '',
            apiEndpoint: '',
            username: '',
            password: '',
            isConnected: false,
            lastSync: null
        },
        erp: {
            provider: 'sap',
            apiKey: '',
            apiEndpoint: '',
            username: '',
            password: '',
            isConnected: false,
            lastSync: null
        },
        ai: {
            modelType: 'gpt-4',
            similarityThreshold: 75,
            maxSuggestions: 5,
            enableAutoAssignment: true,
            enableSimilarityCheck: true
        },
        notifications: {
            emailNotifications: true,
            inAppNotifications: true,
            dailyDigest: false,
            notifyOnNewRequest: true,
            notifyOnStatusChange: true,
            notifyOnComments: true
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock successful settings fetch
                setSettings(prevSettings => ({
                    ...prevSettings,
                    crm: {
                        ...prevSettings.crm,
                        apiKey: '********',
                        apiEndpoint: 'https://api.salesforce.com/v1',
                        username: 'admin@company.com',
                        password: '********',
                        isConnected: true,
                        lastSync: '2024-01-15T10:30:00Z'
                    },
                    erp: {
                        ...prevSettings.erp,
                        apiKey: '********',
                        apiEndpoint: 'https://api.sap.com/v1',
                        username: 'admin@company.com',
                        password: '********',
                        isConnected: true,
                        lastSync: '2024-01-15T10:30:00Z'
                    }
                }));
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleTestConnection = async (system) => {
        setTestingConnection(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSettings(prev => ({
                ...prev,
                [system]: {
                    ...prev[system],
                    isConnected: true,
                    lastSync: new Date().toISOString()
                }
            }));
        } catch (error) {
            console.error(`Error testing ${system} connection:`, error);
        } finally {
            setTestingConnection(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Success would be handled here
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setSaving(false);
        }
    };

    if (!isExco()) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
                <p className="mt-2 text-gray-600">
                    Only Executive Committee members can access system settings.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                <p className="mt-2 text-gray-600">
                    Configure system integrations and preferences
                </p>
            </div>

            {/* Settings Navigation */}
            <div className="bg-white shadow rounded-lg">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {['crm', 'erp', 'ai', 'notifications'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`uppercase py-4 px-6 text-sm font-medium ${
                                    activeTab === tab
                                        ? 'border-b-2 border-primary-500 text-primary-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab === 'crm' ? 'CRM Integration' :
                                 tab === 'erp' ? 'ERP Integration' :
                                 tab === 'ai' ? 'AI Settings' : 'Notifications'}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* CRM Settings */}
                    {activeTab === 'crm' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Provider</label>
                                <select
                                    value={settings.crm.provider}
                                    onChange={(e) => handleChange('crm', 'provider', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                >
                                    <option value="salesforce">Salesforce</option>
                                    <option value="dynamics">Microsoft Dynamics</option>
                                    <option value="hubspot">HubSpot</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
                                <input
                                    type="text"
                                    value={settings.crm.apiEndpoint}
                                    onChange={(e) => handleChange('crm', 'apiEndpoint', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">API Key</label>
                                <input
                                    type="password"
                                    value={settings.crm.apiKey}
                                    onChange={(e) => handleChange('crm', 'apiKey', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className={`flex h-3 w-3 rounded-full ${settings.crm.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm text-gray-500">
                                        {settings.crm.isConnected ? 'Connected' : 'Not Connected'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleTestConnection('crm')}
                                    disabled={testingConnection}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    {testingConnection ? 'Testing...' : 'Test Connection'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ERP Settings */}
                    {activeTab === 'erp' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Provider</label>
                                <select
                                    value={settings.erp.provider}
                                    onChange={(e) => handleChange('erp', 'provider', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                >
                                    <option value="sap">SAP</option>
                                    <option value="oracle">Oracle</option>
                                    <option value="netsuite">NetSuite</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
                                <input
                                    type="text"
                                    value={settings.erp.apiEndpoint}
                                    onChange={(e) => handleChange('erp', 'apiEndpoint', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">API Key</label>
                                <input
                                    type="password"
                                    value={settings.erp.apiKey}
                                    onChange={(e) => handleChange('erp', 'apiKey', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <span className={`flex h-3 w-3 rounded-full ${settings.erp.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm text-gray-500">
                                        {settings.erp.isConnected ? 'Connected' : 'Not Connected'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleTestConnection('erp')}
                                    disabled={testingConnection}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    {testingConnection ? 'Testing...' : 'Test Connection'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* AI Settings */}
                    {activeTab === 'ai' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">AI Model</label>
                                <select
                                    value={settings.ai.modelType}
                                    onChange={(e) => handleChange('ai', 'modelType', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                >
                                    <option value="gpt-4">GPT-4</option>
                                    <option value="gpt-3">GPT-3</option>
                                    <option value="custom">Custom Model</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Similarity Threshold (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={settings.ai.similarityThreshold}
                                    onChange={(e) => handleChange('ai', 'similarityThreshold', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Maximum Suggestions
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={settings.ai.maxSuggestions}
                                    onChange={(e) => handleChange('ai', 'maxSuggestions', parseInt(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="enableAutoAssignment"
                                        checked={settings.ai.enableAutoAssignment}
                                        onChange={(e) => handleChange('ai', 'enableAutoAssignment', e.target.checked)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="enableAutoAssignment" className="ml-2 block text-sm text-gray-900">
                                        Enable Automatic Assignment
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="enableSimilarityCheck"
                                        checked={settings.ai.enableSimilarityCheck}
                                        onChange={(e) => handleChange('ai', 'enableSimilarityCheck', e.target.checked)}
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="enableSimilarityCheck" className="ml-2 block text-sm text-gray-900">
                                        Enable Similarity Check
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="emailNotifications"
                                            checked={settings.notifications.emailNotifications}
                                            onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                                            Email Notifications
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="inAppNotifications"
                                            checked={settings.notifications.inAppNotifications}
                                            onChange={(e) => handleChange('notifications', 'inAppNotifications', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="inAppNotifications" className="ml-2 block text-sm text-gray-900">
                                            In-App Notifications
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="dailyDigest"
                                            checked={settings.notifications.dailyDigest}
                                            onChange={(e) => handleChange('notifications', 'dailyDigest', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="dailyDigest" className="ml-2 block text-sm text-gray-900">
                                            Daily Digest
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-4">Notify me when:</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="notifyOnNewRequest"
                                            checked={settings.notifications.notifyOnNewRequest}
                                            onChange={(e) => handleChange('notifications', 'notifyOnNewRequest', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="notifyOnNewRequest" className="ml-2 block text-sm text-gray-900">
                                            New request is created
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="notifyOnStatusChange"
                                            checked={settings.notifications.notifyOnStatusChange}
                                            onChange={(e) => handleChange('notifications', 'notifyOnStatusChange', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="notifyOnStatusChange" className="ml-2 block text-sm text-gray-900">
                                            Request status changes
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="notifyOnComments"
                                            checked={settings.notifications.notifyOnComments}
                                            onChange={(e) => handleChange('notifications', 'notifyOnComments', e.target.checked)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="notifyOnComments" className="ml-2 block text-sm text-gray-900">
                                            New comment is added
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default Settings;
