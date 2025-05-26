import React, { useState, useEffect } from "react";
import { UserAccountIcon, Car01Icon, Ticket01Icon, ClipboardIcon } from "hugeicons-react";
import axios from 'axios';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        spareParts: 0,
        stockIn: 0,
        stockOut: 0,
        reports: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [spareParts, stockIn, stockOut, reports] = await Promise.all([
                    axios.get('http://localhost:5000/api/spareparts'),
                    axios.get('http://localhost:5000/api/stockin'), 
                    axios.get('http://localhost:5000/api/stockout'),
                    axios.get('http://localhost:5000/api/reports')
                ]);

                setDashboardData({
                    spareParts: spareParts.data.length,
                    stockIn: stockIn.data.length,
                    stockOut: stockOut.data.length,
                    reports: reports.data.length
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className=" min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 pb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Spare Parts Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Car01Icon className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-600 font-medium mb-2">Total Spare Parts</h2>
                        <p className="text-3xl font-bold text-gray-800">{dashboardData.spareParts}</p>
                        <p className="text-sm text-gray-500 mt-2">Available parts</p>
                    </div>
                </div>

                {/* Stock In Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <UserAccountIcon className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-600 font-medium mb-2">Total Stock In</h2>
                        <p className="text-3xl font-bold text-gray-800">{dashboardData.stockIn}</p>
                        <p className="text-sm text-gray-500 mt-2">Stock in records</p>
                    </div>
                </div>

                {/* Stock Out Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <Ticket01Icon className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-600 font-medium mb-2">Total Stock Out</h2>
                        <p className="text-3xl font-bold text-gray-800">{dashboardData.stockOut}</p>
                        <p className="text-sm text-gray-500 mt-2">Stock out records</p>
                    </div>
                </div>

                {/* Reports Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <ClipboardIcon className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-600 font-medium mb-2">Total Reports</h2>
                        <p className="text-3xl font-bold text-gray-800">{dashboardData.reports}</p>
                        <p className="text-sm text-gray-500 mt-2">Generated reports</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;