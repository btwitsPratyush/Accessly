import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await signup(formData);
            navigate('/profile'); // Redirect to profile after successful signup
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-pink-400 flex items-center justify-center p-4 overflow-hidden relative selection:bg-yellow-300 selection:text-black">
            {/* Decorative Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 border-4 border-black rounded-full animate-bounce hidden md:block"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 border-4 border-black rounded-none rotate-12 hidden md:block"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-white border-4 border-black rounded-lg rotate-45 hidden md:block"></div>

            <div className="bg-white w-full max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative z-10 transition-transform hover:-translate-y-1">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black uppercase mb-2">Join Us</h2>
                    <p className="font-bold text-gray-500">Create your account to get started.</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-6 font-bold flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-gray-50"
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-gray-50"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-gray-50"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-gray-50"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center font-bold">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline decoration-4 underline-offset-4">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Back to Home fixed button */}
            <Link to="/" className="fixed top-4 left-4 font-black uppercase bg-white border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors z-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ← Back
            </Link>
        </div>
    );
};

export default Signup;
