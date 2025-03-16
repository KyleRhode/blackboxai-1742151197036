import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored authentication token
        const token = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            // TODO: Replace with actual API call
            // Simulated authentication response
            const response = {
                user: {
                    id: '1',
                    name: 'John Doe',
                    email: credentials.email,
                    role: credentials.email.includes('analyst') ? 'business_analyst' :
                          credentials.email.includes('dev') ? 'developer' :
                          credentials.email.includes('exco') ? 'exco' : 'business_user',
                },
                token: 'dummy_token'
            };

            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Invalid credentials' };
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isBusinessAnalyst = () => user?.role === 'business_analyst';
    const isDeveloper = () => user?.role === 'developer';
    const isExco = () => user?.role === 'exco';
    const isBusinessUser = () => user?.role === 'business_user';

    const value = {
        user,
        loading,
        login,
        logout,
        isBusinessAnalyst,
        isDeveloper,
        isExco,
        isBusinessUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
