import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* 1. Chunky Spinner */}
                <div className="w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin"></div>

                {/* 2. Bold Text */}
                <h2 className="text-3xl font-black uppercase tracking-tighter animate-pulse">
                    Loading...
                </h2>

                {/* 3. Progress Bar Aesthetic */}
                <div className="w-48 h-4 border-2 border-black p-0.5 mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="h-full bg-black animate-[width_1s_ease-in-out_infinite] w-full origin-left transform scale-x-0"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes width {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.7); }
                    100% { transform: scaleX(1); }
                }
            `}</style>
        </div>
    );
};

export default Loader;
