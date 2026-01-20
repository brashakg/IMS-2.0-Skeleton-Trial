import React from 'react';
import { PageHeader, SummaryCard } from '../../components/UI';

const AreaManagerDashboard = () => {
  return (
    <div>
      <PageHeader title="Area Manager Dashboard" subtitle="Regional performance" breadcrumbs={['Home', 'Dashboard', 'Area Manager']} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Total Sales" value="₹0" icon="📊" color="blue" />
        <SummaryCard title="Orders" value="0" icon="📝" color="green" />
        <SummaryCard title="Stores" value="2" icon="🏪" color="purple" />
        <SummaryCard title="Staff" value="9" icon="👥" color="yellow" />
      </div>
    </div>
  );
};

export default AreaManagerDashboard;
