import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Car01Icon, Ticket01Icon, ClipboardIcon, DashboardSquare01Icon, DocumentCodeIcon, Logout01Icon } from "hugeicons-react";

const Layout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <nav className="w-72 bg-gray-100 text-white flex flex-col shadow-xl">
                <div className="p-6 text-3xl font-bold border-b border-gray-700/20">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        MyApp
                    </span>
                </div>
                <ul className="flex-1 p-6 space-y-2">
                    <li>
                        <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:translate-x-2"
                        >
                            <DashboardSquare01Icon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-600 hover:text-gray-900">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sparepart"
                            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:translate-x-2"
                        >
                            <Car01Icon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-600 hover:text-gray-900">Spare Parts</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/stockin"
                            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:translate-x-2"
                        >
                            <Ticket01Icon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-600 hover:text-gray-900">Stock In</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/stockout"
                            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:translate-x-2"
                        >
                            <ClipboardIcon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-600 hover:text-gray-900">Stock Out</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/reports"
                            className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:translate-x-2"
                        >
                            <DocumentCodeIcon className="w-5 h-5 text-gray-600 mr-3" />
                            <span className="text-gray-600 hover:text-gray-900">Reports</span>
                        </Link>
                    </li>
                </ul>
                <div className="p-6 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center  px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-200 bg-white    "
                    >
                        <Logout01Icon className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">© 2025 MyApp. All rights reserved.</p>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 bg-white p-8">
                <div className="h-full w-full mx-auto rounded-xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
