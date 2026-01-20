import React from 'react';
import { PageHeader, SummaryCard, Card, Table, Badge, Button, Placeholder } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';

const StaffDashboard = () => {
  const { user } = useAuth();

  // TODO: Fetch data from API
  const todayMetrics = {
    salesCount: 0,
    salesValue: 0,
    pendingOrders: 0,
  };

  const myTasks = []; // TODO: Fetch from API
  const pendingDeliveries = []; // TODO: Fetch from API

  const taskColumns = [
    { header: 'Task Name', accessor: 'name' },
    {
      header: 'Priority',
      render: (task) => (
        <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'}>
          {task.priority}
        </Badge>
      ),
    },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status' },
  ];

  const deliveryColumns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Expected Date', accessor: 'expectedDate' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <PageHeader
        title="Staff Dashboard"
        subtitle={`Welcome back, ${user?.name || 'User'}`}
        breadcrumbs={['Home', 'Dashboard', 'Staff']}
      />

      {/* Today's Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard
          title="My Sales Count"
          value={todayMetrics.salesCount}
          subtitle="Today"
          icon="💰"
          color="blue"
        />
        <SummaryCard
          title="My Sales Value"
          value={`₹${todayMetrics.salesValue}`}
          subtitle="Today"
          icon="💳"
          color="green"
        />
        <SummaryCard
          title="Pending Orders"
          value={todayMetrics.pendingOrders}
          subtitle="Requires attention"
          icon="📦"
          color="yellow"
        />
      </div>

      {/* My Tasks */}
      <Card title="My Tasks" className="mb-6">
        {myTasks.length === 0 ? (
          <Placeholder title="No tasks assigned" description="You have no pending tasks at the moment" />
        ) : (
          <Table columns={taskColumns} data={myTasks} />
        )}
      </Card>

      {/* Pending Deliveries */}
      <Card title="Pending Deliveries" className="mb-6">
        {pendingDeliveries.length === 0 ? (
          <Placeholder title="No pending deliveries" description="All deliveries are up to date" />
        ) : (
          <Table columns={deliveryColumns} data={pendingDeliveries} />
        )}
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" className="w-full">
            New Sale
          </Button>
          <Button variant="secondary" className="w-full">
            Search Order
          </Button>
          <Button variant="secondary" className="w-full">
            Mark Attendance
          </Button>
          <Button variant="secondary" className="w-full">
            View Tasks
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StaffDashboard;
