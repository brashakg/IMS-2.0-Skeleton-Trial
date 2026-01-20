import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-brand-primary shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Brand */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white">IMS 2.0</h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl mx-8">
          <input
            type="text"
            placeholder="Search customers, orders, products..."
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:bg-white focus:text-gray-900"
          />
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center space-x-4">
          {/* Date/FY */}
          <div className="text-white text-sm">
            <div className="flex items-center gap-2">
              <span>📅 FY 2025-26</span>
              <span>|</span>
              <span>{user?.location_name || 'Store'}</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-accent-orange"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center font-semibold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-sm">
              <p className="font-medium">{user?.username || 'User'}</p>
              <p className="text-xs opacity-80">{user?.roles?.[0] || 'Role'}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
