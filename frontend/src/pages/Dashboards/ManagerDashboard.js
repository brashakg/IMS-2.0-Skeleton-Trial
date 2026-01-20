import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [dailySales, setDailySales] = useState(null);

  useEffect(() => {
    APIService.getDailySalesReport(null, user?.location_id).then(setDailySales).catch(console.error);
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Manager Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">{user?.location_name || 'Store'} · {new Date().toLocaleDateString()}</p>
      </div>

      {/* TODAY - Primary Focus */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Sales</p>
            <p className="text-3xl font-bold text-gray-900">₹{dailySales?.total_amount || 0}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Bills</p>
            <p className="text-3xl font-bold text-gray-900">{dailySales?.total_bills || 0}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Cash</p>
            <p className="text-3xl font-bold text-gray-900">₹{dailySales?.payment_mode_breakdown?.CASH || 0}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Digital</p>
            <p className="text-3xl font-bold text-gray-900">₹{(dailySales?.payment_mode_breakdown?.UPI || 0) + (dailySales?.payment_mode_breakdown?.CARD || 0)}</p>
          </div>
        </div>
      </div>

      {/* ATTENTION REQUIRED */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attention Required</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900">Pending Approvals</p>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Discounts, leaves, tasks</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900">Low Stock</p>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Items need reorder</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900">Tasks</p>
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Pending tasks</p>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="/pos" className="p-4 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-all text-center">
            <div className="text-2xl mb-2">🛒</div>
            <p className="text-sm font-medium">New Sale</p>
          </a>
          <a href="/pos/approvals/discounts" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-primary hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-2">✓</div>
            <p className="text-sm font-medium text-gray-900">Approvals</p>
          </a>
          <a href="/inventory" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-primary hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-2">📦</div>
            <p className="text-sm font-medium text-gray-900">Inventory</p>
          </a>
          <a href="/reports/daily-sales" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-brand-primary hover:shadow-md transition-all text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-gray-900">Reports</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
