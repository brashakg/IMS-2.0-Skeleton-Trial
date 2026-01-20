import React, { useEffect, useState } from 'react';
import { PageHeader, SummaryCard, Card, Button, Placeholder } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [dailySales, setDailySales] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const salesData = await APIService.getDailySalesReport(null, user?.location_id);
      setDailySales(salesData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Total Sales"
          value={`₹${dailySales?.total_amount || 0}`}
          subtitle="Today"
          icon="📊"
          color="blue"
        />
        <SummaryCard
          title="Total Bills"
          value={dailySales?.total_bills || 0}
          subtitle="Today"
          icon="📝"
          color="green"
        />
        <SummaryCard
          title="Cash"
          value={`₹${dailySales?.payment_mode_breakdown?.CASH || 0}`}
          subtitle="Today"
          icon="💵"
          color="purple"
        />
        <SummaryCard
          title="UPI/Card"
          value={`₹${(dailySales?.payment_mode_breakdown?.UPI || 0) + (dailySales?.payment_mode_breakdown?.CARD || 0)}`}
          subtitle="Today"
          icon="💳"
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Stock Alerts">
          <Placeholder title="Stock data" description="Low stock alerts will appear here" />
        </Card>

        <Card title="Tasks">
          <Placeholder title="Tasks" description="Pending tasks will appear here" />
        </Card>

        <Card title="Approvals">
          <Placeholder title="Approvals" description="Pending approvals will appear here" />
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
