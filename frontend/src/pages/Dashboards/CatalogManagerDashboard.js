import React from 'react';
import { PageHeader, SummaryCard, Card, Button, Placeholder } from '../../components/UI';

const CatalogManagerDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Catalog Manager Dashboard (HQ)"
        subtitle="Product catalog management and activation"
        breadcrumbs={['Home', 'Dashboard', 'Catalog']}
        actions={
          <Button variant="primary" size="sm">
            Add New Product
          </Button>
        }
      />

      {/* Catalog Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard title="Total SKUs" value="0" subtitle="In catalog" icon="📦" color="blue" />
        <SummaryCard title="Active SKUs" value="0" subtitle="Available" icon="✅" color="green" />
        <SummaryCard
          title="Pending Activation"
          value="0"
          subtitle="Awaiting approval"
          icon="⏳"
          color="yellow"
        />
        <SummaryCard
          title="Inactive SKUs"
          value="0"
          subtitle="Not available"
          icon="❌"
          color="gray"
        />
      </div>

      {/* Pending Actions */}
      <Card title="Pending Actions" className="mb-6">
        <Placeholder
          title="Catalog approvals"
          description="TODO: New products, price changes, category assignments"
        />
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <Placeholder
          title="Catalog activity log"
          description="TODO: Recent product additions, activations, and changes"
        />
      </Card>
    </div>
  );
};

export default CatalogManagerDashboard;
