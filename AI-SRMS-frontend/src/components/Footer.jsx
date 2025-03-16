import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center">
                                <i className="fas fa-brain text-primary-600 text-2xl mr-2"></i>
                                <span className="text-xl font-bold text-gray-800">AI-SRMS</span>
                            </div>
                            <p className="mt-4 text-gray-600 text-sm">
                                AI-powered Software Request Management System streamlining your project management, 
                                change requests, and bug tracking with intelligent automation and insights.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
                                Quick Links
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 text-sm">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/requests" className="text-gray-600 hover:text-primary-600 text-sm">
                                        Requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/requests/new" className="text-gray-600 hover:text-primary-600 text-sm">
                                        New Request
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
                                Support
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                                        Contact Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray-500 text-sm">
                                © {currentYear} AI-SRMS. All rights reserved.
                            </div>
                            <div className="mt-4 md:mt-0 flex space-x-6">
                                <a href="#" className="text-gray-500 hover:text-primary-600">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-primary-600">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-primary-600">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
