import React from 'react';
import { PageHeader, SummaryCard, Card } from '../../components/UI';

const AccountantDashboard = () => {
  return (
    <div>
      <PageHeader title="Accountant Dashboard" subtitle="Financial oversight" breadcrumbs={['Home', 'Dashboard', 'Accountant']} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Revenue" value="₹0" icon="💰" color="blue" />
        <SummaryCard title="Expenses" value="₹0" icon="💸" color="red" />
        <SummaryCard title="Outstanding" value="₹0" icon="📝" color="yellow" />
        <SummaryCard title="GST Collected" value="₹0" icon="💳" color="green" />
      </div>
    </div>
  );
};

export default AccountantDashboard;
