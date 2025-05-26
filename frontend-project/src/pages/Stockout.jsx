import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockOut = () => {
    const [stockOuts, setStockOuts] = useState([]);
    const [form, setForm] = useState({ sparePartId: '', quantity: 0, unitPrice: 0, totalPrice: 0, date: '' });
    const [spareParts, setSpareParts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        const stockData = await axios.get('http://localhost:5000/api/stockout');
        const partData = await axios.get('http://localhost:5000/api/spareparts');
        setStockOuts(stockData.data);
        setSpareParts(partData.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };
        if (name === 'quantity' || name === 'unitPrice') {
            updatedForm.totalPrice = updatedForm.quantity * updatedForm.unitPrice;
        }
        setForm(updatedForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/stockout', form);
        setForm({ sparePartId: '', quantity: 0, unitPrice: 0, totalPrice: 0, date: '' });
        setShowForm(false);
        fetchData();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Stock Out</h1>

            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                    Add Stock Out
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-6">
                    <select
                        name="sparePartId"
                        value={form.sparePartId}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    >
                        <option value="">Select Spare Part</option>
                        {spareParts.map(sp => (
                            <option key={sp._id} value={sp._id}>{sp.name}</option>
                        ))}
                    </select>
                    <input
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <input
                        name="unitPrice"
                        type="number"
                        value={form.unitPrice}
                        onChange={handleChange}
                        placeholder="Unit Price"
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <div className="col-span-3 flex gap-2">
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors duration-200 shadow-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700">Recent Stock Out</h2>
                    <p className="text-sm text-gray-500 mt-1">Overview of stock out records</p>
                </div>

                <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-5 bg-gray-100 text-sm font-medium text-gray-600">
                        <div className="px-6 py-4">Spare Part</div>
                        <div className="px-6 py-4">Quantity</div>
                        <div className="px-6 py-4">Unit Price</div>
                        <div className="px-6 py-4">Total Price</div>
                        <div className="px-6 py-4">Date</div>
                    </div>

                    {stockOuts.map((stock) => (
                        <div key={stock._id} className="grid grid-cols-5 hover:bg-gray-50 transition-colors duration-150">
                            <div className="px-6 py-4 text-sm text-gray-900">{stock.sparePartId?.name}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{stock.quantity}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{stock.unitPrice}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{stock.totalPrice}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{new Date(stock.date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-500">
                        Showing {stockOuts.length} stock-out entries
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockOut;
