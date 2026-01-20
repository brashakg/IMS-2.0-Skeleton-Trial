import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Dashboard screens
import StaffDashboard from '../pages/Dashboards/StaffDashboard';
import ManagerDashboard from '../pages/Dashboards/ManagerDashboard';
import AreaManagerDashboard from '../pages/Dashboards/AreaManagerDashboard';
import AdminDashboard from '../pages/Dashboards/AdminDashboard';
import SuperadminDashboard from '../pages/Dashboards/SuperadminDashboard';
import CatalogManagerDashboard from '../pages/Dashboards/CatalogManagerDashboard';
import AccountantDashboard from '../pages/Dashboards/AccountantDashboard';

const DashboardRoutes = () => {
  const { user, hasRole } = useAuth();

  // Determine default dashboard based on highest role priority
  const getDefaultDashboard = () => {
    if (hasRole('SUPERADMIN')) return '/dashboard/superadmin';
    if (hasRole('ADMIN')) return '/dashboard/admin';
    if (hasRole('AREA_MANAGER')) return '/dashboard/area-manager';
    if (hasRole('STORE_MANAGER')) return '/dashboard/manager';
    if (hasRole('CATALOG_MANAGER')) return '/dashboard/catalog';
    if (hasRole('ACCOUNTANT')) return '/dashboard/accountant';
    if (hasRole('OPTOMETRIST')) return '/dashboard/staff';
    if (hasRole('CASHIER')) return '/dashboard/staff';
    if (hasRole('SALES_STAFF')) return '/dashboard/staff';
    return '/dashboard/staff';
  };

  return (
    <Routes>
      {/* Redirect /dashboard to role-appropriate dashboard */}
      <Route path="/" element={<Navigate to={getDefaultDashboard()} replace />} />

      {/* Role-specific dashboards */}
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/area-manager" element={<AreaManagerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/superadmin" element={<SuperadminDashboard />} />
      <Route path="/catalog" element={<CatalogManagerDashboard />} />
      <Route path="/accountant" element={<AccountantDashboard />} />
    </Routes>
  );
};

export default DashboardRoutes;
