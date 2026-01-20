import React from 'react';
import { PageHeader, SummaryCard, Card, Placeholder } from '../../components/UI';

const AdminDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard (HQ)"
        subtitle="Enterprise-wide operational control"
        breadcrumbs={['Home', 'Dashboard', 'Admin']}
      />

      {/* Enterprise Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Sales"
          value="₹0"
          subtitle="All stores"
          icon="💰"
          color="blue"
        />
        <SummaryCard title="Total Orders" value="0" subtitle="All stores" icon="📝" color="green" />
        <SummaryCard title="Active Stores" value="0" subtitle="Operational" icon="🏪" color="purple" />
        <SummaryCard
          title="Total Staff"
          value="0"
          subtitle="Active employees"
          icon="👥"
          color="yellow"
        />
      </div>

      {/* Financial Summary */}
      <Card title="Financial Summary" className="mb-6">
        <Placeholder
          title="Financial overview"
          description="TODO: Revenue, Outstanding, Expenses, Net Position"
        />
      </Card>

      {/* Store Performance & Control Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Inventory Control">
          <Placeholder title="HQ approvals" description="TODO: Catalog approvals, stock transfers, mismatches" />
        </Card>
        <Card title="HR Summary">
          <Placeholder title="HR overview" description="TODO: Staff, attendance, leave approvals, payroll" />
        </Card>
        <Card title="System Health">
          <Placeholder title="System status" description="TODO: Active users, system errors, configurations" />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
