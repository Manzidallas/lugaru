import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockIn = () => {
    const [spareParts, setSpareParts] = useState([]);
    const [stockInForm, setStockInForm] = useState({ sparePartId: '', quantity: 0, date: '' });
    const [stockInRecords, setStockInRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchSpareParts();
        fetchStockRecords();
    }, []);

    const fetchSpareParts = async () => {
        const res = await axios.get('http://localhost:5000/api/spareparts');
        setSpareParts(res.data);
    };

    const fetchStockRecords = async () => {
        const stockInData = await axios.get('http://localhost:5000/api/stockin');
        setStockInRecords(stockInData.data);
    };

    const handleStockInChange = (e) => {
        setStockInForm({ ...stockInForm, [e.target.name]: e.target.value });
    };

    const handleStockInSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/stockin', stockInForm);
        setStockInForm({ sparePartId: '', quantity: 0, date: '' });
        setShowForm(false);
        fetchStockRecords();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Stock In</h1>

            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-4 bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Add Stock In
                </button>
            )}

            {/* Stock In Form */}
            {showForm && (
                <form onSubmit={handleStockInSubmit} className="grid grid-cols-3 gap-4 mb-6">
                    <select
                        name="sparePartId"
                        value={stockInForm.sparePartId}
                        onChange={handleStockInChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Spare Part</option>
                        {spareParts.map((sp) => (
                            <option key={sp._id} value={sp._id}>{sp.name}</option>
                        ))}
                    </select>
                    <input
                        name="quantity"
                        type="number"
                        value={stockInForm.quantity}
                        onChange={handleStockInChange}
                        placeholder="Quantity"
                        className="border p-2 rounded"
                    />
                    <input
                        name="date"
                        type="date"
                        value={stockInForm.date}
                        onChange={handleStockInChange}
                        className="border p-2 rounded"
                    />
                    <div className="col-span-3 flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-400 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Display Stock In Records */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700">Stock In Records</h2>
                    <p className="text-sm text-gray-500 mt-1">Overview of stock in records</p>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-3 bg-gray-100 text-sm font-medium text-gray-600">
                        <div className="px-6 py-4">Spare Part</div>
                        <div className="px-6 py-4">Quantity</div>
                        <div className="px-6 py-4">Date</div>
                    </div>
                    {stockInRecords.map((stockIn) => (
                        <div key={stockIn._id} className="grid grid-cols-3 hover:bg-gray-50 transition-colors duration-150">
                            <div className="px-6 py-4 text-sm text-gray-900">{stockIn.sparePartId?.name}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{stockIn.quantity}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{new Date(stockIn.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-500">
                        Showing {stockInRecords.length} stock-in entries
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockIn;
