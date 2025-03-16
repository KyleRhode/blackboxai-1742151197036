/**
 * Maps error codes to user-friendly messages
 */
const ERROR_MESSAGES = {
    // Auth errors
    'auth/invalid-credentials': 'Invalid email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/invalid-token': 'Your session has expired. Please login again.',
    'auth/insufficient-permissions': 'You do not have permission to perform this action.',

    // Request errors
    'request/not-found': 'The requested item could not be found.',
    'request/invalid-type': 'Invalid request type selected.',
    'request/duplicate': 'A similar request already exists.',
    'request/validation-failed': 'Please check the form for errors.',

    // Document errors
    'document/generation-failed': 'Failed to generate document. Please try again.',
    'document/signature-failed': 'Failed to process signature. Please try again.',
    'document/invalid-format': 'Invalid document format.',

    // Integration errors
    'integration/connection-failed': 'Failed to connect to the external service.',
    'integration/sync-failed': 'Data synchronization failed.',
    'integration/invalid-credentials': 'Invalid integration credentials.',
    'integration/api-error': 'External service error.',

    // Upload errors
    'upload/file-too-large': 'File size exceeds the maximum limit.',
    'upload/invalid-type': 'File type not supported.',
    'upload/failed': 'Failed to upload file. Please try again.',

    // Network errors
    'network/no-connection': 'No internet connection.',
    'network/timeout': 'Request timed out. Please try again.',
    'network/server-error': 'Server error. Please try again later.',

    // Default error
    'default': 'An unexpected error occurred. Please try again.'
};

/**
 * Handles API errors and returns user-friendly error messages
 * @param {Error} error - The error object from API call
 * @returns {string} User-friendly error message
 */
export const handleError = (error) => {
    // Log error for debugging
    console.error('Error details:', error);

    // Handle axios errors
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const errorCode = error.response.data?.code;
        const errorMessage = error.response.data?.message;

        // Handle specific status codes
        switch (status) {
            case 400:
                return errorMessage || 'Invalid request. Please check your input.';
            case 401:
                // Unauthorized - clear auth state and redirect to login
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return 'Your session has expired. Please login again.';
            case 403:
                return 'You do not have permission to perform this action.';
            case 404:
                return 'The requested resource was not found.';
            case 422:
                return errorMessage || 'Validation failed. Please check your input.';
            case 429:
                return 'Too many requests. Please try again later.';
            case 500:
                return 'Server error. Please try again later.';
            default:
                return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;
        }
    }

    // Handle network errors
    if (error.request) {
        // Request was made but no response received
        if (!navigator.onLine) {
            return ERROR_MESSAGES['network/no-connection'];
        }
        if (error.code === 'ECONNABORTED') {
            return ERROR_MESSAGES['network/timeout'];
        }
        return ERROR_MESSAGES['network/server-error'];
    }

    // Handle other errors
    return error.message || ERROR_MESSAGES.default;
};

/**
 * Handles form validation errors
 * @param {Object} errors - Object containing field errors
 * @returns {Object} Formatted error messages by field
 */
export const handleFormErrors = (errors) => {
    const formattedErrors = {};
    
    Object.entries(errors).forEach(([field, error]) => {
        formattedErrors[field] = Array.isArray(error) ? error[0] : error;
    });

    return formattedErrors;
};

/**
 * Logs errors to a monitoring service (to be implemented)
 * @param {Error} error - The error object
 * @param {Object} context - Additional context about the error
 */
export const logError = (error, context = {}) => {
    // Add timestamp
    const timestamp = new Date().toISOString();
    
    // Prepare error data
    const errorData = {
        timestamp,
        message: error.message,
        stack: error.stack,
        context: {
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...context
        }
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error logged:', errorData);
    }

    // TODO: Send to error monitoring service
    // Example: Sentry.captureException(error, { extra: errorData });
};

/**
 * Handles errors in async operations
 * @param {Promise} promise - The promise to handle
 * @returns {Promise} Array containing [error, data]
 */
export const handleAsyncError = async (promise) => {
    try {
        const data = await promise;
        return [null, data];
    } catch (error) {
        return [handleError(error), null];
    }
};

export default {
    handleError,
    handleFormErrors,
    logError,
    handleAsyncError
};
