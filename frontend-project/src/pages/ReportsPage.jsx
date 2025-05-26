import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', date: '' });
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const fetchReports = async () => {
        const res = await axios.get('http://localhost:5000/api/reports');
        setReports(res.data);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/reports', form);
        setForm({ title: '', description: '', date: '' });
        setShowForm(false);
        fetchReports();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/reports/${id}`);
        fetchReports();
    };

    const filterReports = () => {
        return reports.filter((report) => {
            const isMatchingDate = !filterDate || new Date(report.date).toLocaleDateString() === new Date(filterDate).toLocaleDateString();

            const matchesSearchTerm =
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase());

            return isMatchingDate && matchesSearchTerm;
        });
    };

    const handlePrint = () => {
        const printContent = document.getElementById('report-content').innerHTML;
        const printWindow = window.open('', '', 'height=800,width=800');
        printWindow.document.write('<html><head><title>Reports</title>');
        printWindow.document.write('<style>body{font-family: Arial, sans-serif;}table{width: 100%; border-collapse: collapse;}td, th{padding: 8px; border: 1px solid #ddd;}h1, h2{color: #333;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Reports</h1>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={handlePrint}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200"
                >
                    Print Reports
                </button>

                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                        Add Report
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-700">Add New Report</h2>
                        <p className="text-sm text-gray-500 mt-1">Enter the report details below</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Enter report title"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Enter report description"
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div className="col-span-2 flex gap-2">
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200">
                                    Save Report
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Reports</label>
                        <input
                            type="text"
                            placeholder="Search by title or description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div id="report-content" className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700">Reports Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Overview of all reports</p>
                </div>

                <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-4 bg-gray-100 text-sm font-medium text-gray-600">
                        <div className="px-6 py-4">Title</div>
                        <div className="px-6 py-4">Description</div>
                        <div className="px-6 py-4">Date</div>
                        <div className="px-6 py-4">Actions</div>
                    </div>

                    {filterReports().map((report) => (
                        <div key={report._id} className="grid grid-cols-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="px-6 py-4 text-sm text-gray-900">{report.title}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{report.description}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{new Date(report.date).toLocaleDateString()}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">
                                <button
                                    onClick={() => handleDelete(report._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-500">
                        Showing {filterReports().length} reports
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
