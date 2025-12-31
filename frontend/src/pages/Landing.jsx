import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden selection:bg-orange-300 selection:text-black">

            {/* 1. Navigation (Sticky Header) */}
            <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-4 py-3 md:px-8 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo - Upgraded "Whole Black" */}
                    <Link to="/" className="flex items-center gap-3 group">
                        {/* Custom SVG Logo */}
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300">
                            <rect x="2" y="2" width="36" height="36" rx="8" fill="black" stroke="black" strokeWidth="4" />
                            <path d="M20 12L28 28H12L20 12Z" fill="white" />
                            <rect x="18" y="24" width="4" height="8" fill="black" />
                        </svg>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase relative">
                            Accessly
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 font-bold text-lg">
                        <a href="#features" className="hover:text-orange-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-green-600 transition-colors">How it Works</a>
                        <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
                        <Link to="/signup" className="px-6 py-2 bg-yellow-300 border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:bg-yellow-400">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button onClick={toggleMenu} className="md:hidden p-2 border-2 border-black rounded-lg bg-gray-50 active:bg-gray-200">
                        <span className="text-2xl leading-none">☰</span>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-black p-4 flex flex-col gap-4 shadow-xl z-50">
                        <a href="#features" className="font-bold text-xl py-2 border-b-2 border-gray-100">Features</a>
                        <a href="#how-it-works" className="font-bold text-xl py-2 border-b-2 border-gray-100">How it Works</a>
                        <Link to="/login" className="font-bold text-xl py-2 border-b-2 border-gray-100">Login</Link>
                        <Link to="/signup" className="w-full text-center py-3 bg-yellow-300 border-2 border-black rounded-full font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                            Get Started
                        </Link>
                    </div>
                )}
            </nav>

            {/* 2. Hero Section */}
            <section className="bg-yellow-50 border-b-4 border-black py-20 px-4 md:py-32 relative overflow-hidden bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
                {/* Decorative Background Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-pink-400 border-4 border-black rounded-full hidden md:block animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400 border-4 border-black rounded-xl hidden md:block transform rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white border-2 border-black rounded-full font-bold text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span>System Operational</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[1] tracking-tighter mix-blend-multiply">
                        AUTH <br className="hidden md:block" />
                        <span className="relative inline-block px-4 rotate-2 hover:rotate-0 transition-transform duration-300">
                            <span className="absolute inset-0 bg-red-500 border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></span>
                            <span className="relative text-white">SIMPLIFIED.</span>
                        </span>
                    </h1>

                    <p className="text-xl md:text-3xl font-bold text-gray-900 max-w-3xl mx-auto mb-12 leading-relaxed border-l-8 border-black pl-6 md:pl-0 md:border-l-0">
                        Stop wasting weeks on login forms. <br /> Get secure, role-based access in minutes.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Link to="/signup" className="w-full md:w-auto px-12 py-6 bg-black text-white text-2xl font-black border-4 border-black rounded-none shadow-[10px_10px_0px_0px_#f97316] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all group">
                            Start Building <span className="group-hover:ml-2 transition-all">→</span>
                        </Link>
                        <a href="#how-it-works" className="w-full md:w-auto px-12 py-6 bg-white text-black text-2xl font-black border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all">
                            Live Demo
                        </a>
                    </div>

                    <p className="mt-8 text-sm font-black text-gray-500 uppercase tracking-widest">
                        No Credit Card Required • Open Source • Developer First
                    </p>
                </div>
            </section>

            {/* Marquee Section */}
            <div className="bg-orange-500 text-black py-6 border-b-4 border-black overflow-hidden whitespace-nowrap box-border rotate-1 scale-105 shadow-xl z-20 relative">
                <div className="inline-block animate-marquee">
                    <span className="text-4xl font-black mx-12 uppercase italic">⚡️ FAST</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">🛡️ SECURE</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">🚀 SCALABLE</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">⚙️ ADMIN</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">⚡️ FAST</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">🛡️ SECURE</span>
                    <span className="text-4xl font-black mx-12 uppercase italic">🚀 SCALABLE</span>
                </div>
            </div>

            {/* 3. Detailed Features Grid */}
            <section id="features" className="py-32 px-4 max-w-7xl mx-auto">
                <div className="text-left mb-16 border-b-4 border-black pb-8">
                    <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">The Stack</h2>
                    <p className="text-2xl font-bold text-gray-500">Everything you need, nothing you don't.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Card 1 */}
                    <div className="group bg-blue-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300 relative">
                        <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-100 transition-opacity">🔐</div>
                        <h3 className="text-3xl font-black mb-4 uppercase bg-white inline-block px-2 border-2 border-black">Auth</h3>
                        <p className="font-bold text-gray-900 text-lg leading-relaxed mt-4">
                            Secure authentication using BCrypt password hashing and JWT (JSON Web Tokens) for persistent sessions.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-pink-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300 relative">
                        <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-100 transition-opacity">👑</div>
                        <h3 className="text-3xl font-black mb-4 uppercase bg-white inline-block px-2 border-2 border-black">Roles</h3>
                        <p className="font-bold text-gray-900 text-lg leading-relaxed mt-4">
                            Granular access control. Distinct permissions for Admins (Dashboard) and Users (Profile).
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-green-200 border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform duration-300 relative">
                        <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-100 transition-opacity">⚙️</div>
                        <h3 className="text-3xl font-black mb-4 uppercase bg-white inline-block px-2 border-2 border-black">Control</h3>
                        <p className="font-bold text-gray-900 text-lg leading-relaxed mt-4">
                            A powerful admin dashboard to view users, manage account status (Active/Inactive), and secure the platform.
                        </p>
                    </div>

                </div>
            </section>

            {/* 4. How It Works - "Stupid Simple" */}
            <section id="how-it-works" className="bg-black text-white py-32 px-4 clip-path-polygon">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-8xl font-black uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Stupid Simple</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">

                        {/* Step 1 */}
                        <div className="bg-gray-900 border-4 border-gray-700 p-8 w-full md:w-1/3 hover:bg-gray-800 transition-colors">
                            <span className="text-6xl font-black text-gray-700 block mb-4">01</span>
                            <h4 className="text-3xl font-black mb-2 text-white">Deploy</h4>
                            <p className="font-bold text-gray-400">Clone and push to Render/Railway. 5 mins max.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-gray-900 border-4 border-gray-700 p-8 w-full md:w-1/3 hover:bg-gray-800 transition-colors transform md:-translate-y-8">
                            <span className="text-6xl font-black text-gray-700 block mb-4">02</span>
                            <h4 className="text-3xl font-black mb-2 text-white">Config</h4>
                            <p className="font-bold text-gray-400">Set your ENV variables for Mongo and JWT.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-gray-900 border-4 border-gray-700 p-8 w-full md:w-1/3 hover:bg-gray-800 transition-colors">
                            <span className="text-6xl font-black text-gray-700 block mb-4">03</span>
                            <h4 className="text-3xl font-black mb-2 text-white">Profit</h4>
                            <p className="font-bold text-gray-400">Focus on your business logic, not auth bugs.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 6. CTA Section - UPDATED "Orange Brutalist" Design */}
            <section className="py-32 px-4 bg-orange-600 border-b-4 border-black text-center text-white relative overflow-hidden">

                {/* Striped Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent_100%)] [background-size:20px_20px]"></div>

                <div className="bg-white text-black max-w-5xl mx-auto p-12 md:p-20 border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative z-10 transform hover:scale-[1.01] transition-transform">
                    <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                        Ready to <br /><span className="bg-black text-white px-4">Ship?</span>
                    </h2>
                    <p className="text-3xl font-bold mb-12 text-gray-800 max-w-2xl mx-auto">
                        Secure your app today. Open source and free forever.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link to="/signup" className="inline-block px-12 py-6 bg-blue-500 text-white text-2xl font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all hover:bg-blue-600">
                            Get Started Now
                        </Link>
                        <a href="https://github.com/btwitsPratyush/Accessly" target="_blank" rel="noopener noreferrer" className="neobrutal-button bg-white text-black text-xl px-8 py-3 rounded-none border-4 border-black font-bold transform transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            Github Repo
                        </a>
                    </div>
                </div>
            </section>

            {/* 7. Footer */}
                        <p className="font-bold text-gray-500 mb-6 max-w-sm">
                            Open source role-based authentication system.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer">GH</div>
                            <div className="w-12 h-12 bg-blue-500 flex items-center justify-center text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer">TW</div>
                            <div className="w-12 h-12 bg-pink-500 flex items-center justify-center text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors cursor-pointer">IG</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-lg">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-black uppercase bg-yellow-300 inline-block px-1 border-2 border-black">Product</h4>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">Features</a>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">Integrations</a>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">Pricing</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-black uppercase bg-green-300 inline-block px-1 border-2 border-black">Resources</h4>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">Documentation</a>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">API Reference</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-black uppercase bg-pink-300 inline-block px-1 border-2 border-black">Company</h4>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">About</a>
                            <a href="#" className="font-bold text-gray-600 hover:text-black hover:underline">Contact</a>
                        </div>
                    </div>
                </div >
    <div className="flex justify-between items-center max-w-7xl mx-auto mt-16 py-8 border-t-4 border-gray-100 font-bold text-gray-400">
        <p>&copy; 2026 Accessly. All rights reserved.</p>
        <p>Built with ❤️ by Pratyush</p>
    </div>
            </footer >

        </div >
    );
};

export default Landing;
