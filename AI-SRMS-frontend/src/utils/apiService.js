import axios from 'axios';
import { handleError } from './errorHandler';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const errorMessage = handleError(error);
        return Promise.reject(errorMessage);
    }
);

// Auth endpoints
export const auth = {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh')
};

// Requests endpoints
export const requests = {
    getAll: (params) => api.get('/requests', { params }),
    getById: (id) => api.get(`/requests/${id}`),
    create: (data) => api.post('/requests', data),
    update: (id, data) => api.put(`/requests/${id}`, data),
    delete: (id) => api.delete(`/requests/${id}`),
    getSimilar: (id) => api.get(`/requests/${id}/similar`),
    addComment: (id, comment) => api.post(`/requests/${id}/comments`, { comment }),
    updateStatus: (id, status) => api.patch(`/requests/${id}/status`, { status })
};

// Documents endpoints
export const documents = {
    getAll: (params) => api.get('/documents', { params }),
    getById: (id) => api.get(`/documents/${id}`),
    generate: (data) => api.post('/documents/generate', data),
    sign: (id, signature) => api.post(`/documents/${id}/sign`, { signature }),
    download: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' })
};

// Settings endpoints
export const settings = {
    get: () => api.get('/settings'),
    update: (data) => api.put('/settings', data),
    testConnection: (type, config) => api.post(`/settings/${type}/test`, config)
};

// AI endpoints
export const ai = {
    analyzeSimilarity: (data) => api.post('/ai/analyze-similarity', data),
    getSuggestions: (data) => api.post('/ai/suggestions', data),
    analyzeProcess: (data) => api.post('/ai/analyze-process', data)
};

// Integration endpoints
export const integrations = {
    crm: {
        sync: () => api.post('/integrations/crm/sync'),
        getData: (params) => api.get('/integrations/crm/data', { params })
    },
    erp: {
        sync: () => api.post('/integrations/erp/sync'),
        getData: (params) => api.get('/integrations/erp/data', { params })
    }
};

// Upload utility
export const upload = {
    file: (file, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);

        return api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) {
                    onProgress(percentCompleted);
                }
            }
        });
    }
};

// Notifications endpoints
export const notifications = {
    getAll: () => api.get('/notifications'),
    markAsRead: (id) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch('/notifications/read-all'),
    getSettings: () => api.get('/notifications/settings'),
    updateSettings: (settings) => api.put('/notifications/settings', settings)
};

// Export the api instance for custom requests
export default api;
