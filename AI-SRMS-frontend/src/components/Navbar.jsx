import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isBusinessAnalyst, isDeveloper, isExco } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive(to)
                    ? 'bg-primary-700 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
            }`}
        >
            {children}
        </Link>
    );

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/dashboard" className="flex items-center">
                            <i className="fas fa-brain text-primary-600 text-2xl mr-2"></i>
                            <span className="text-xl font-bold text-gray-800">AI-SRMS</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <NavLink to="/dashboard">
                                <i className="fas fa-chart-line mr-2"></i>Dashboard
                            </NavLink>
                            
                            <NavLink to="/requests">
                                <i className="fas fa-tasks mr-2"></i>Requests
                            </NavLink>

                            {isBusinessAnalyst() && (
                                <NavLink to="/documents">
                                    <i className="fas fa-file-alt mr-2"></i>Documents
                                </NavLink>
                            )}

                            {isExco() && (
                                <NavLink to="/settings">
                                    <i className="fas fa-cogs mr-2"></i>Settings
                                </NavLink>
                            )}
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center">
                            {/* Notifications */}
                            <button className="p-2 rounded-full text-gray-600 hover:text-primary-600 focus:outline-none">
                                <i className="fas fa-bell"></i>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 text-sm focus:outline-none"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                                            <span className="text-white font-medium">
                                                {user?.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-gray-700">{user?.name}</span>
                                        <i className="fas fa-chevron-down text-gray-400"></i>
                                    </button>
                                </div>

                                {isProfileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                                <div className="font-medium">{user?.name}</div>
                                                <div className="text-gray-500">{user?.email}</div>
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <i className="fas fa-sign-out-alt mr-2"></i>
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        >
                            <i className="fas fa-chart-line mr-2"></i>Dashboard
                        </Link>
                        
                        <Link
                            to="/requests"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        >
                            <i className="fas fa-tasks mr-2"></i>Requests
                        </Link>

                        {isBusinessAnalyst() && (
                            <Link
                                to="/documents"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                            >
                                <i className="fas fa-file-alt mr-2"></i>Documents
                            </Link>
                        )}

                        {isExco() && (
                            <Link
                                to="/settings"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                            >
                                <i className="fas fa-cogs mr-2"></i>Settings
                            </Link>
                        )}

                        <button
                            onClick={logout}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                        >
                            <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
