import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected Route Component
export const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has any of those roles
  if (roles && roles.length > 0) {
    const hasRequiredRole = roles.some(role => user.roles?.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

// Role-based component wrapper
export const RoleGuard = ({ children, roles, fallback = null }) => {
  const { user } = useAuth();

  if (!user || !roles) return fallback;

  const hasRequiredRole = roles.some(role => user.roles?.includes(role));
  return hasRequiredRole ? children : fallback;
};
