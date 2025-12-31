import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await login(formData.email, formData.password);
            if (user.role === 'admin') {
                navigate('/admin/users');
            } else {
                navigate('/profile');
            }
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4 overflow-hidden relative selection:bg-purple-400 selection:text-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-20 w-24 h-24 bg-purple-500 border-4 border-black rounded-lg animate-spin-slow hidden md:block"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-400 border-4 border-black rounded-full hidden md:block"></div>

            <div className="bg-white w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-10 relative z-10 transition-transform hover:-translate-y-1">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-black text-white mb-4 shadow-[4px_4px_0px_0px_#A855F7] border-2 border-black">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-black uppercase mb-2 tracking-tighter">Welcome Back</h2>
                    <p className="font-bold text-gray-500">Enter your credentials to access the vault.</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-6 font-bold flex items-center gap-2 animate-shake">
                        <span>🛑</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-black uppercase text-sm mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
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
                            className="w-full p-4 border-4 border-black font-bold focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-purple-600 text-white text-xl font-black uppercase border-4 border-black hover:bg-purple-700 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-8 text-center font-bold">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-purple-600 hover:underline decoration-4 underline-offset-4">
                            Sign up now
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

export default Login;
