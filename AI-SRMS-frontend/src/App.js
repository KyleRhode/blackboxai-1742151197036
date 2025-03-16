import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import layout components (will create these next)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages (will create these next)
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import RequestList from './pages/RequestList';
import RequestDetail from './pages/RequestDetail';
import DocumentManagement from './pages/DocumentManagement';
import Settings from './pages/Settings';
import RequestForm from './components/RequestForm';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }
    
    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {user && <Navbar />}
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/login" element={
                        user ? <Navigate to="/dashboard" /> : <Login />
                    } />
                    
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/requests" element={
                        <PrivateRoute>
                            <RequestList />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/requests/new" element={
                        <PrivateRoute>
                            <RequestForm />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/requests/:id" element={
                        <PrivateRoute>
                            <RequestDetail />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/documents" element={
                        <PrivateRoute>
                            <DocumentManagement />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    
                    <Route path="*" element={
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                            <p className="text-gray-600 mb-8">Page not found</p>
                            <button 
                                onClick={() => window.history.back()}
                                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    } />
                </Routes>
            </main>
            
            {user && <Footer />}
        </div>
    );
};

export default App;
