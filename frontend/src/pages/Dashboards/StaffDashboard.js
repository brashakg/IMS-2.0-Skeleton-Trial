import React, { useEffect, useState } from 'react';
import { PageHeader, SummaryCard, Card, Placeholder } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../services/api';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [dailySales, setDailySales] = useState(null);

  useEffect(() => {
    loadDailySales();
  }, []);

  const loadDailySales = async () => {
    try {
      const data = await APIService.getDailySalesReport();
      setDailySales(data);
    } catch (error) {
      console.error('Failed to load sales data:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Staff Dashboard"
        subtitle={`Welcome back, ${user?.username || 'User'}`}
        breadcrumbs={['Home', 'Dashboard', 'Staff']}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard
          title="Today's Bills"
          value={dailySales?.total_bills || 0}
          subtitle="Today"
          icon="💰"
          color="blue"
        />
        <SummaryCard
          title="Today's Sales"
          value={`₹${dailySales?.total_amount || 0}`}
          subtitle="Today"
          icon="💳"
          color="green"
        />
        <SummaryCard
          title="Pending Orders"
          value={0}
          subtitle="Requires attention"
          icon="📦"
          color="yellow"
        />
      </div>

      <Card title="My Tasks" className="mb-6">
        <Placeholder title="No tasks assigned" description="You have no pending tasks at the moment" />
      </Card>
    </div>
  );
};

export default StaffDashboard;
