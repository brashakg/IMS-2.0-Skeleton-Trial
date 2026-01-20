import React from 'react';
import { PageHeader, SummaryCard, Card, Placeholder } from '../../components/UI';

const AreaManagerDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Area Manager Dashboard"
        subtitle="Regional performance and oversight"
        breadcrumbs={['Home', 'Dashboard', 'Area Manager']}
      />

      {/* Regional Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Sales"
          value="₹0"
          subtitle="Across all stores"
          icon="📊"
          color="blue"
        />
        <SummaryCard title="Total Orders" value="0" subtitle="All stores" icon="📝" color="green" />
        <SummaryCard
          title="Top Store"
          value="-"
          subtitle="Best performer"
          icon="🏆"
          color="yellow"
        />
        <SummaryCard
          title="Pending Actions"
          value="0"
          subtitle="Requires attention"
          icon="⚠️"
          color="red"
        />
      </div>

      {/* Store-wise Performance */}
      <Card title="Store-wise Performance" className="mb-6">
        <Placeholder
          title="Store performance data"
          description="TODO: Store comparison table with sales, orders, staff count, pending tasks, and alerts"
        />
      </Card>

      {/* Tasks & Escalations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Tasks & Escalations">
          <Placeholder title="Regional tasks" description="TODO: Tasks across all stores" />
        </Card>
        <Card title="Inventory Overview">
          <Placeholder title="Regional inventory" description="TODO: Cross-store inventory status" />
        </Card>
      </div>
    </div>
  );
};

export default AreaManagerDashboard;
