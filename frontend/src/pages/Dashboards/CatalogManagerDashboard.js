import React from 'react';
import { PageHeader, SummaryCard } from '../../components/UI';

const CatalogManagerDashboard = () => {
  return (
    <div>
      <PageHeader title="Catalog Manager Dashboard" subtitle="Product catalog management" breadcrumbs={['Home', 'Dashboard', 'Catalog']} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Total SKUs" value="6" icon="📦" color="blue" />
        <SummaryCard title="Active" value="6" icon="✅" color="green" />
        <SummaryCard title="Pending" value="0" icon="⏳" color="yellow" />
        <SummaryCard title="Inactive" value="0" icon="❌" color="gray" />
      </div>
    </div>
  );
};

export default CatalogManagerDashboard;
