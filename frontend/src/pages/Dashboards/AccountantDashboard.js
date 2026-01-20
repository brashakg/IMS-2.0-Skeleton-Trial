import React from 'react';
import { PageHeader, SummaryCard, Card, Button, Placeholder } from '../../components/UI';

const AccountantDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Accountant Dashboard (HQ)"
        subtitle="Financial oversight, GST compliance, and audit"
        breadcrumbs={['Home', 'Dashboard', 'Accountant']}
        actions={
          <>
            <Button variant="outline" size="sm">
              GST Reports
            </Button>
            <Button variant="primary" size="sm">
              Generate Report
            </Button>
          </>
        }
      />

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <SummaryCard
          title="Total Revenue"
          value="₹0"
          subtitle="Current period"
          icon="💰"
          color="blue"
        />
        <SummaryCard
          title="Total Expenses"
          value="₹0"
          subtitle="Current period"
          icon="💸"
          color="red"
        />
        <SummaryCard
          title="Outstanding"
          value="₹0"
          subtitle="Receivables"
          icon="📝"
          color="yellow"
        />
        <SummaryCard
          title="GST Collected"
          value="₹0"
          subtitle="Current period"
          icon="💳"
          color="green"
        />
        <SummaryCard title="GST Paid" value="₹0" subtitle="Current period" icon="📧" color="purple" />
      </div>

      {/* Compliance Status */}
      <Card title="Compliance Status" className="mb-6">
        <Placeholder
          title="Compliance overview"
          description="TODO: GST filing status, locked periods, pending reconciliations"
        />
      </Card>

      {/* Pending Approvals & Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Pending Approvals">
          <Placeholder
            title="Financial approvals"
            description="TODO: Expense approvals, advance settlements, write-offs"
          />
        </Card>
        <Card title="Recent Transactions">
          <Placeholder title="Transaction log" description="TODO: Recent financial transactions" />
        </Card>
      </div>
    </div>
  );
};

export default AccountantDashboard;
