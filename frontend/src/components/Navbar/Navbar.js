import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ token: null, isAuthenticated: false, user: null });
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials =
      nameParts.length > 1
        ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
        : nameParts[0].charAt(0);
    return initials.toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <Link to="/dashboard" className="logo-link">
            Health Dashboard
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/addmetrics" className="nav-link">
            Add Health Metrics
          </Link>
          <Link to="/dashboard" className="nav-link">
            Show Health Metrics
          </Link>
          <Link to="/goals" className="nav-link">
            Settings for Daily Goals
          </Link>
        </div>
        <div className="user-info">
          <div className="user-initials">{getInitials(auth.user)}</div>
          <div className="user-details">
            <span className="welcome-text">Welcome, {auth.user || 'User'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;