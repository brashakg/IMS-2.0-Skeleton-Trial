import React, { useEffect, useState } from 'react';
import { PageHeader, SummaryCard, Card, Button } from '../../components/UI';
import APIService from '../../services/api';

const SuperadminDashboard = () => {
  const [sales, setSales] = useState(null);

  useEffect(() => {
    APIService.getDailySalesReport().then(setSales).catch(console.error);
  }, []);

  return (
    <div>
      <PageHeader
        title="Superadmin Dashboard"
        subtitle="Supreme visibility and control"
        breadcrumbs={['Home', 'Dashboard', 'Superadmin']}
        actions={<Button variant="primary" size="sm">🤖 AI Intelligence</Button>}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard title="Total Revenue" value={`₹${sales?.total_amount || 0}`} icon="💰" color="blue" />
        <SummaryCard title="Total Orders" value={sales?.total_bills || 0} icon="📝" color="green" />
        <SummaryCard title="Active Stores" value="2" icon="🏪" color="purple" />
        <SummaryCard title="Total Staff" value="9" icon="👥" color="yellow" />
      </div>

      <Card title="🤖 AI Intelligence Panel" className="border-2 border-yellow-500">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>READ-ONLY Intelligence</strong> - AI operates in advisory mode only
          </p>
          <p className="text-xs text-yellow-600">AI insights and pattern detection available in AI module</p>
        </div>
      </Card>
    </div>
  );
};

export default SuperadminDashboard;
