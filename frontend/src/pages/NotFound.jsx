import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-red-100 flex flex-col justify-center items-center">
            <h1 className="text-9xl font-black mb-4">404</h1>
            <p className="text-2xl font-bold mb-8">Page Not Found</p>
            <Link to="/" className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
