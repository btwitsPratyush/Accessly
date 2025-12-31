import React, { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [page, user]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await API.get(`/admin/users?page=${page}&limit=3`);
            setUsers(data.users || []);
            setTotalPages(data.totalPages || 1);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setLoading(false);
        }
    };

    const toggleUserStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        if (window.confirm(`Are you sure you want to make this user ${newStatus}?`)) {
            try {
                await API.put(`/admin/users/${id}/status`, { status: newStatus });
                fetchUsers(); // Refresh list
            } catch (error) {
                alert('Action failed');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
            : '??';
    };

    const getColor = (name) => {
        const colors = [
            'bg-red-300', 'bg-orange-300', 'bg-amber-300',
            'bg-green-300', 'bg-emerald-300', 'bg-teal-300',
            'bg-cyan-300', 'bg-sky-300', 'bg-blue-300',
            'bg-indigo-300', 'bg-violet-300', 'bg-purple-300',
            'bg-fuchsia-300', 'bg-pink-300', 'bg-rose-300'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className="min-h-screen bg-blue-50 font-sans text-gray-900 selection:bg-purple-300 selection:text-white bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] relative overflow-x-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-blue-400 border-4 border-black rounded-xl hidden md:block transform -rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse z-0"></div>

            {/* Navbar */}
            <nav className="bg-white border-b-4 border-black px-4 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300">
                            <rect x="2" y="2" width="36" height="36" rx="8" fill="black" stroke="black" strokeWidth="4" />
                            <path d="M20 12L28 28H12L20 12Z" fill="white" />
                            <rect x="18" y="24" width="4" height="8" fill="black" />
                        </svg>
                        <span className="font-black text-xl md:text-2xl uppercase tracking-tighter">Accessly</span>
                        <span className="hidden md:block bg-yellow-400 text-black border-2 border-black px-2 text-xs font-black transform -rotate-3 hover:rotate-2 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            ADMIN
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="flex items-center gap-2 font-bold hover:underline decoration-2 underline-offset-4 bg-gray-100 px-3 py-1 rounded-full border-2 border-transparent hover:border-black transition-all">
                            <span>👤</span>
                            <span>Profile</span>
                        </Link>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-bold uppercase hover:bg-red-700 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none">
                            Exit
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-4 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 text-6xl opacity-10 rotate-12">📂</div>
                        <h1 className="text-5xl font-black uppercase mb-2 relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-800 drop-shadow-sm">
                            User Database
                        </h1>
                        <p className="font-bold text-gray-500 bg-white inline-block px-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            Manage all registered entities.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-black px-4 py-2 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        Page {page} of {totalPages}
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-lg relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-bl-full border-b-4 border-l-4 border-black -mr-4 -mt-4 z-0"></div>

                    {loading ? (
                        <div className="p-20 text-center font-black text-2xl animate-pulse relative z-10">Scanning Database...</div>
                    ) : (
                        <div className="overflow-x-auto relative z-10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black text-white uppercase text-sm leading-normal">
                                        <th className="py-4 px-6 font-black border-r border-gray-700">User Details</th>
                                        <th className="py-4 px-6 font-black border-r border-gray-700">Role & ID</th>
                                        <th className="py-4 px-6 font-black border-r border-gray-700">Status</th>
                                        <th className="py-4 px-6 font-black text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 font-bold text-sm">
                                    {users.map((u) => (
                                        <tr key={u._id} className="border-b-2 border-gray-200 hover:bg-blue-50 transition-colors group">
                                            <td className="py-4 px-6 border-r border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="mr-3 group-hover:scale-110 transition-transform">
                                                        <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-xs ${getColor(u.name)}`}>
                                                            {getInitials(u.name)}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-black text-base">{u.name}</p>
                                                        <p className="text-gray-500 text-xs font-mono">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 border-r border-gray-200">
                                                <span className={`px-2 py-1 rounded border-2 border-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block mb-1 ${u.role === 'admin' ? 'bg-purple-300' : 'bg-gray-100'}`}>
                                                    {u.role === 'admin' ? 'SUPER ADMIN' : 'USER'}
                                                </span>
                                                <div className="text-xs text-gray-400 font-mono">{u._id}</div>
                                            </td>
                                            <td className="py-4 px-6 border-r border-gray-200">
                                                {u.isActive ? (
                                                    <span className="bg-green-300 text-black py-1 px-3 rounded-full text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">ACTIVE</span>
                                                ) : (
                                                    <span className="bg-red-300 text-black py-1 px-3 rounded-full text-xs font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] opacity-70">INACTIVE</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <button
                                                        onClick={() => toggleUserStatus(u._id, u.isActive ? 'active' : 'inactive')}
                                                        className={`w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all mr-2 bg-white ${u.isActive ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                        title={u.isActive ? "Deactivate User" : "Activate User"}
                                                    >
                                                        {u.isActive ? (
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                                                                <line x1="12" y1="2" x2="12" y2="12" />
                                                            </svg>
                                                        ) : (
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                                <polyline points="22 4 12 14.01 9 11.01" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-6 py-3 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] disabled:opacity-50 disabled:shadow-none"
                    >
                        Previous
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-6 py-3 bg-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] disabled:opacity-50 disabled:shadow-none"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
