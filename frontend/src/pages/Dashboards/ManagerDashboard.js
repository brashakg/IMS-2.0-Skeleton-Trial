import React from 'react';
import { PageHeader, SummaryCard, Card, Table, Badge, Button, Placeholder } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const ManagerDashboard = () => {
  const { user } = useAuth();

  // TODO: Fetch data from API
  const storePerformance = {
    totalSales: 0,
    totalOrders: 0,
    avgBillValue: 0,
    conversionRate: 0,
  };

  const staffPerformance = []; // TODO: Fetch from API
  const inventoryAlerts = []; // TODO: Fetch from API

  const staffColumns = [
    { header: 'Staff Name', accessor: 'name' },
    { header: 'Sales Count', accessor: 'salesCount' },
    { header: 'Sales Value', accessor: 'salesValue' },
    { header: 'Attendance', accessor: 'attendance' },
    {
      header: 'Status',
      render: (staff) => <Badge variant="success">{staff.status}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Store Manager Dashboard"
        subtitle={`Store: ${user?.location_name || 'Not assigned'}`}
        breadcrumbs={['Home', 'Dashboard', 'Manager']}
        actions={
          <>
            <Button variant="outline" size="sm">
              View Reports
            </Button>
            <Button variant="primary" size="sm">
              Generate Report
            </Button>
          </>
        }
      />

      {/* Store Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Sales"
          value={`₹${storePerformance.totalSales}`}
          subtitle="Today"
          icon="📊"
          color="blue"
        />
        <SummaryCard
          title="Total Orders"
          value={storePerformance.totalOrders}
          subtitle="Today"
          icon="📝"
          color="green"
        />
        <SummaryCard
          title="Avg Bill Value"
          value={`₹${storePerformance.avgBillValue}`}
          subtitle="Today"
          icon="💳"
          color="purple"
        />
        <SummaryCard
          title="Conversion Rate"
          value={`${storePerformance.conversionRate}%`}
          subtitle="Today"
          icon="🎯"
          color="yellow"
        />
      </div>

      {/* Staff Performance */}
      <Card title="Staff Performance" className="mb-6">
        {staffPerformance.length === 0 ? (
          <Placeholder title="No staff data available" description="Staff performance data will appear here" />
        ) : (
          <Table columns={staffColumns} data={staffPerformance} />
        )}
      </Card>

      {/* Inventory Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Inventory Alerts">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Low Stock Items</span>
              <Badge variant="warning">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Acceptance</span>
              <Badge variant="danger">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Transfers</span>
              <Badge variant="info">0</Badge>
            </div>
          </div>
        </Card>

        <Card title="Tasks & Escalations">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Open Tasks</span>
              <Badge variant="primary">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overdue Tasks</span>
              <Badge variant="danger">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Escalations</span>
              <Badge variant="warning">0</Badge>
            </div>
          </div>
        </Card>

        <Card title="Clinical Summary">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Eye Tests</span>
              <Badge variant="success">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Prescriptions Issued</span>
              <Badge variant="primary">0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Validations</span>
              <Badge variant="warning">0</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" className="w-full">
            View All Tasks
          </Button>
          <Button variant="secondary" className="w-full">
            Stock Acceptance
          </Button>
          <Button variant="secondary" className="w-full">
            View Reports
          </Button>
          <Button variant="secondary" className="w-full">
            Manage Staff
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManagerDashboard;
