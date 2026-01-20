import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [dailySales, setDailySales] = useState(null);

  useEffect(() => {
    APIService.getDailySalesReport().then(setDailySales).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username}</h1>
        <p className="text-sm text-gray-600 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* TODAY Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Bills</p>
            <p className="text-3xl font-bold text-gray-900">{dailySales?.total_bills || 0}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Sales</p>
            <p className="text-3xl font-bold text-gray-900">₹{dailySales?.total_amount || 0}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="/pos" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all cursor-pointer text-center">
            <div className="text-3xl mb-2">🛒</div>
            <p className="text-sm font-medium text-gray-900">New Sale</p>
          </a>
          <a href="/enquiry/create" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all cursor-pointer text-center">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-sm font-medium text-gray-900">New Enquiry</p>
          </a>
          <a href="/pos/orders" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all cursor-pointer text-center">
            <div className="text-3xl mb-2">📦</div>
            <p className="text-sm font-medium text-gray-900">View Orders</p>
          </a>
          <a href="/reports/daily-sales" className="p-4 bg-white rounded-lg border border-gray-200 hover:border-brand-primary hover:shadow-md transition-all cursor-pointer text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm font-medium text-gray-900">Reports</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
