import React, { useEffect, useState } from 'react';
import { PageHeader, SummaryCard, Card } from '../../components/UI';
import APIService from '../../services/api';

const AdminDashboard = () => {
  const [sales, setSales] = useState(null);

  useEffect(() => {
    APIService.getDailySalesReport().then(setSales).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader title="Admin Dashboard (HQ)" subtitle="Enterprise-wide control" breadcrumbs={['Home', 'Dashboard', 'Admin']} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Total Sales" value={`₹${sales?.total_amount || 0}`} icon="💰" color="blue" />
        <SummaryCard title="Total Bills" value={sales?.total_bills || 0} icon="📝" color="green" />
        <SummaryCard title="Active Stores" value="2" icon="🏪" color="purple" />
        <SummaryCard title="Total Staff" value="9" icon="👥" color="yellow" />
      </div>
    </div>
  );
};

export default AdminDashboard;
