import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpareParts = () => {
    const [spareParts, setSpareParts] = useState([]);
    const [form, setForm] = useState({ name: '', category: '', quantity: 0, unitPrice: 0 });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchParts = async () => {
        const res = await axios.get('http://localhost:5000/api/spareparts');
        setSpareParts(res.data);
    };

    useEffect(() => {
        fetchParts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const totalPrice = form.quantity * form.unitPrice;
        if (editId) {
            await axios.put(`http://localhost:5000/api/spareparts/${editId}`, { ...form, totalPrice });
            setEditId(null);
        } else {
            await axios.post('http://localhost:5000/api/spareparts', { ...form, totalPrice });
        }
        setForm({ name: '', category: '', quantity: 0, unitPrice: 0 });
        setShowForm(false);
        fetchParts();
    };

    const handleEdit = (part) => {
        setForm(part);
        setEditId(part._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/spareparts/${id}`);
        fetchParts();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Spare Parts Management</h1>

            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
                >
                    Add Spare Part
                </button>
            )}

            {showForm && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-semibold text-gray-700">{editId ? 'Edit Spare Part' : 'Add New Spare Part'}</h2>
                        <p className="text-sm text-gray-500 mt-1">Enter the spare part details below</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="Enter part name" 
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input 
                                    name="category" 
                                    value={form.category} 
                                    onChange={handleChange} 
                                    placeholder="Enter category" 
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input 
                                    name="quantity" 
                                    value={form.quantity} 
                                    onChange={handleChange} 
                                    placeholder="Enter quantity" 
                                    type="number" 
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                                <input 
                                    name="unitPrice" 
                                    value={form.unitPrice} 
                                    onChange={handleChange} 
                                    placeholder="Enter unit price" 
                                    type="number" 
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                {editId ? 'Update Spare Part' : 'Save Spare Part'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditId(null);
                                    setForm({ name: '', category: '', quantity: 0, unitPrice: 0 });
                                }}
                                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700">All Spare Parts</h2>
                    <p className="text-sm text-gray-500 mt-1">Overview of all spare parts in the system</p>
                </div>

                <div className="divide-y divide-gray-200">
                    {/* Header */}
                    <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-gray-600">
                        <div className="px-6 py-4">Name</div>
                        <div className="px-6 py-4">Category</div>
                        <div className="px-6 py-4">Quantity</div>
                        <div className="px-6 py-4">Unit Price</div>
                        <div className="px-6 py-4">Total Price</div>
                        <div className="px-6 py-4">Actions</div>
                    </div>

                    {/* Rows */}
                    {spareParts.map(part => (
                        <div key={part._id} className="grid grid-cols-6 hover:bg-gray-50 transition-colors duration-150">
                            <div className="px-6 py-4 text-sm text-gray-900">{part.name}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{part.category}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{part.quantity}</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{part.unitPrice}Rwf</div>
                            <div className="px-6 py-4 text-sm text-gray-900">{part.totalPrice}Rwf</div>
                            <div className="px-6 py-4 flex gap-2">
                                <button onClick={() => handleEdit(part)} className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md transition-colors duration-200">Edit</button>
                                <button onClick={() => handleDelete(part._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-200">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-500">
                        Showing {spareParts.length} spare parts
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpareParts;
