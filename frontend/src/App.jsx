import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import SmoothScroll from './components/SmoothScroll';
import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute';

// Helper to add "professional" delay (800ms)
const lazyLoadWithDelay = (importFunc) => {
    return lazy(() => {
        return Promise.all([
            importFunc(),
            new Promise(resolve => setTimeout(resolve, 800)) // 800ms delay
        ]).then(([moduleExports]) => moduleExports);
    });
};

// Lazy Load Pages
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazyLoadWithDelay(() => import('./pages/Profile'));
const AdminDashboard = lazyLoadWithDelay(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Router>
            <SmoothScroll />
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Landing />} />

                        {/* Guest Routes (Redirects to Dashboard if logged in) */}
                        <Route element={<GuestRoute />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Route>

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>

                        {/* Admin Only Routes */}
                        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                            <Route path="/admin/*" element={<AdminDashboard />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
