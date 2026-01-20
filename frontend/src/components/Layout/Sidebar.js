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
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: [] },
    { name: 'POS / Sales', path: '/pos', icon: '🛒', roles: ['SALES_STAFF', 'CASHIER', 'OPTOMETRIST', 'STORE_MANAGER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Enquiry', path: '/enquiry', icon: '📝', roles: ['SALES_STAFF', 'STORE_MANAGER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Inventory', path: '/inventory', icon: '📦', roles: ['STORE_MANAGER', 'CATALOG_MANAGER', 'INVENTORY_HQ_TEAM', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Clinical', path: '/clinical', icon: '👁️', roles: ['OPTOMETRIST', 'STORE_MANAGER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'HR & Attendance', path: '/hr', icon: '👥', roles: ['STORE_MANAGER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Payroll', path: '/payroll', icon: '💰', roles: ['ACCOUNTANT', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Finance', path: '/finance', icon: '💳', roles: ['ACCOUNTANT', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Tasks & SOPs', path: '/tasks', icon: '✓', roles: [] },
    { name: 'Expenses', path: '/expenses', icon: '💸', roles: [] },
    { name: 'Reports', path: '/reports', icon: '📊', roles: ['STORE_MANAGER', 'ACCOUNTANT', 'ADMIN', 'SUPERADMIN'] },
    { name: 'Marketplace', path: '/marketplace', icon: '🌐', roles: ['CATALOG_MANAGER', 'ADMIN', 'SUPERADMIN'] },
    { name: 'AI Intelligence', path: '/ai', icon: '🤖', roles: ['SUPERADMIN'], highlight: true },
    { name: 'Setup', path: '/setup', icon: '⚙️', roles: ['ADMIN', 'SUPERADMIN'] },
  ];

  // Filter navigation items based on user roles
  const visibleItems = navigationItems.filter(item => {
    if (item.roles.length === 0) return true; // Available to all
    return hasAnyRole(item.roles);
  });

  return (
    <aside
      className={`bg-gray-900 text-white w-64 space-y-4 py-4 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center justify-center px-4 py-2">
        <div className="text-center">
          <h1 className="text-xl font-bold text-brand-primary">IMS 2.0</h1>
          <p className="text-xs text-gray-400">Retail OS</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-3 py-2 bg-gray-800 rounded-lg mx-2">
        <p className="text-sm font-semibold truncate">{user?.username || 'User'}</p>
        <p className="text-xs text-gray-400 truncate">{user?.roles?.join(', ') || 'No roles'}</p>
        {user?.location_id && (
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {user.location_name || user.location_id}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-2">
        {visibleItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              isActive(item.path)
                ? 'bg-brand-primary text-white'
                : 'text-gray-300 hover:bg-gray-800'
            } ${
              item.highlight ? 'border border-yellow-500' : ''
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="text-xs text-gray-500 text-center">
          <p>v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
