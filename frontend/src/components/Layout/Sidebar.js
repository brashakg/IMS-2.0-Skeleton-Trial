import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user, hasAnyRole } = useAuth();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Navigation items with role-based visibility
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: [] }, // All roles
    { name: 'POS / Sales', path: '/pos', icon: '🛒', roles: ['Sales Staff', 'Cashier', 'Store Manager', 'Admin', 'Superadmin'] },
    { name: 'Inventory', path: '/inventory', icon: '📦', roles: ['Store Manager', 'Inventory Staff', 'Catalog Manager', 'Admin', 'Superadmin'] },
    { name: 'Clinical', path: '/clinical', icon: '👁️', roles: ['Optometrist', 'Store Manager', 'Admin', 'Superadmin'] },
    { name: 'HR & Attendance', path: '/hr', icon: '👥', roles: ['Store Manager', 'Admin', 'Superadmin'] },
    { name: 'Payroll', path: '/payroll', icon: '💰', roles: ['Accountant', 'Admin', 'Superadmin'] },
    { name: 'Finance', path: '/finance', icon: '💳', roles: ['Accountant', 'Admin', 'Superadmin'] },
    { name: 'Tasks & SOPs', path: '/tasks', icon: '✓', roles: [] }, // All roles
    { name: 'Expenses', path: '/expenses', icon: '💸', roles: [] }, // All roles (limited by screen)
    { name: 'Marketplace', path: '/marketplace', icon: '🌐', roles: ['Marketplace Manager', 'Admin', 'Superadmin'] },
    { name: 'AI Intelligence', path: '/ai', icon: '🤖', roles: ['Superadmin'], highlight: true }, // Superadmin only
    { name: 'Setup', path: '/setup', icon: '⚙️', roles: ['Admin', 'Superadmin'] },
  ];

  // Filter navigation items based on user roles
  const visibleItems = navigationItems.filter(item => {
    if (item.roles.length === 0) return true; // Available to all
    return hasAnyRole(item.roles);
  });

  return (
    <aside
      className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center justify-center px-4">
        <h1 className="text-2xl font-bold">IMS 2.0</h1>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 bg-gray-800 rounded-lg mx-2">
        <p className="text-sm font-semibold">{user?.name || 'User'}</p>
        <p className="text-xs text-gray-400">{user?.roles?.join(', ') || 'No roles'}</p>
        {user?.store && <p className="text-xs text-gray-400">Store: {user.store}</p>}
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {visibleItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            } ${
              item.highlight ? 'border-2 border-yellow-500' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="text-xs text-gray-500 text-center">
          <p>System Version: 1.0.0</p>
          <p className="mt-1">Build Pass #2</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
