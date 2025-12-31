import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            // Update Profile Info
            await API.put('/users/profile', { name: formData.name, email: formData.email });

            // Change Password if provided
            if (formData.newPassword) {
                if (!formData.currentPassword) {
                    setError("Please enter current password to set a new one.");
                    return;
                }
                await API.put('/users/updatepassword', {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                });
            }

            setMessage('Profile updated successfully! ✨');
            setIsEditing(false);
            // Ideally reload user context here, but for now just showing success
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed.');
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
        <div className="min-h-screen bg-blue-50 font-sans text-gray-900 selection:bg-green-300 selection:text-black bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] relative overflow-x-hidden">

            {/* Decorative Background Elements */}
            <div className="absolute top-28 left-10 w-24 h-24 bg-pink-400 border-4 border-black rounded-full hidden md:block animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-0"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 border-4 border-black rounded-xl hidden md:block transform rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse z-0"></div>

            {/* Navbar */}
            <nav className="bg-white border-b-4 border-black px-4 py-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300">
                            <rect x="2" y="2" width="36" height="36" rx="8" fill="black" stroke="black" strokeWidth="4" />
                            <path d="M20 12L28 28H12L20 12Z" fill="white" />
                            <rect x="18" y="24" width="4" height="8" fill="black" />
                        </svg>
                        <span className="font-black text-xl md:text-2xl uppercase tracking-tighter">Accessly</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="font-bold hidden md:block">Hi, {user.name.split(' ')[0]} 👋</span>
                        {user.role === 'admin' && (
                            <Link to="/admin/users" className="px-4 py-2 bg-yellow-400 border-2 border-black font-bold uppercase text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                                <span></span> Admin Panel
                            </Link>
                        )}
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white border-2 border-black font-bold uppercase text-sm hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all">
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto p-4 md:p-10 relative z-10">

                {/* Header Card */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                    <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 border-b-4 border-black"></div>

                    {/* Dynamic Avatar */}
                    <div className={`w-32 h-32 rounded-full border-4 border-black flex items-center justify-center text-5xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0 ${getColor(user.name)}`}>
                        {getInitials(user.name)}
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-black uppercase mb-2">{user.name}</h1>
                        <div className="inline-block px-3 py-1 bg-black text-white font-mono text-sm border-2 border-black rounded mb-2 shadow-[2px_2px_0px_0px_#818CF8]">
                            Role: {user.role === 'admin' ? 'SUPER ADMIN' : 'USER'}
                        </div>
                        <p className="text-gray-500 font-bold">{user.email}</p>
                        {user._id && (
                            <p className="text-sm text-gray-800 font-bold font-mono mt-1 bg-gray-100 inline-block px-2 border-2 border-gray-300 rounded">ID: {user._id}</p>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-6 py-3 bg-blue-500 text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {/* Edit Form */}
                {isEditing ? (
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up">
                        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                            <span>✏️</span> Update Details
                        </h2>

                        {message && <div className="bg-green-100 border-2 border-green-500 text-green-700 p-3 mb-4 font-bold">{message}</div>}
                        {error && <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-4 font-bold">{error}</div>}

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-black uppercase text-sm mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border-4 border-black font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-black uppercase text-sm mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border-4 border-black font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="border-t-4 border-gray-100 pt-6 mt-6">
                                <h3 className="font-black text-lg mb-4 text-gray-500 uppercase">Change Password (Optional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-bold text-sm mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full p-3 border-4 border-gray-300 font-bold focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none"
                                            placeholder="Required to change password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-sm mb-2">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full p-3 border-4 border-gray-300 font-bold focus:border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none"
                                            placeholder="Leave blank to keep same"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-green-400 text-black text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Stats / Info Cards */}
                        <div className="bg-cyan-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:rotate-1 transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22H22L12 2Z" /></svg>
                            </div>
                            <div className="relative z-10 border-2 border-dashed border-black/30 p-4 h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-black text-xl uppercase tracking-wider">Account Status</h3>
                                </div>
                                <div className="flex items-center gap-3 bg-white border-2 border-black p-3 shadow-sm">
                                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse border-2 border-black"></div>
                                    <span className="font-bold text-lg">Active & Secure</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-rose-300 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-rotate-1 transition-all duration-300 group relative overflow-hidden">
                            <div className="absolute -bottom-4 -left-4 p-4 opacity-10 rotate-45">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="4" /></svg>
                            </div>
                            <div className="relative z-10 border-2 border-dashed border-black/30 p-4 h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-black text-xl uppercase tracking-wider">Security</h3>
                                </div>
                                <div className="bg-white border-2 border-black p-3 shadow-sm flex items-center justify-between">
                                    <span className="font-bold text-sm text-gray-600 uppercase">Last Update</span>
                                    <span className="font-black text-lg bg-black text-yellow-300 px-2 transform -rotate-2">Just now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
