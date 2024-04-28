import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Dashboard from './dashboard';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing';
import { useAuth } from '../context/AuthContext';
import AddMetrics from './addhealth';
import DailyGoals from './dailygoals';
const Layout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // Define the routes where you don't want to show the navbar
  const hideNavbarRoutes = ['/login', '/register'];

  // Check if the current route is in the hideNavbarRoutes list
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Render the navbar only if the user is authenticated and the current route is not in the hideNavbarRoutes list */}
      {auth.isAuthenticated && !shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/addmetrics" element={<ProtectedRoute><AddMetrics /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><DailyGoals /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default Layout;