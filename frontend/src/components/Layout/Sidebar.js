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
      className={`bg-white border-r border-gray-200 w-64 space-y-1 py-6 px-3 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 shadow-sm`}
    >
      {/* Logo / Brand */}
      <div className="px-3 py-4 mb-4">
        <h1 className="text-xl font-bold text-gray-900">IMS 2.0</h1>
        <p className="text-xs text-gray-500 mt-1">Retail Operating System</p>
      </div>

      {/* User Info */}
      <div className="px-3 py-3 bg-gray-50 rounded-lg mb-4 mx-1">
        <p className="text-sm font-semibold text-gray-900 truncate">{user?.username || 'User'}</p>
        <p className="text-xs text-gray-600 truncate mt-0.5">{user?.roles?.join(', ') || 'No roles'}</p>
        <p className="text-xs text-gray-500 truncate mt-1">{user?.location_name || user?.location_id}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-0.5">
        {visibleItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
              isActive(item.path)
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            } ${
              item.highlight ? 'border border-alert-warning bg-yellow-50' : ''
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-0 right-0 px-6">
        <div className="text-xs text-gray-400 text-center border-t border-gray-200 pt-4">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
