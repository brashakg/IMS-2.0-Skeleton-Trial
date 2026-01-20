import React, { useState } from 'react';
import { PageHeader, Card, Button, Table, Badge, Placeholder } from '../../components/UI';
import { useNavigate } from 'react-router-dom';

const OrderSearch = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');

  // TODO: Fetch orders
  const orders = [];

  const statusOptions = ['All', 'Pending', 'Completed', 'Cancelled'];

  const orderColumns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Date', accessor: 'date' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Items', accessor: 'items' },
    { header: 'Amount', accessor: 'amount' },
    {
      header: 'Payment Status',
      render: (order) => <Badge variant="success">{order.paymentStatus}</Badge>,
    },
    {
      header: 'Order Status',
      render: (order) => <Badge variant="primary">{order.orderStatus}</Badge>,
    },
    {
      header: 'Actions',
      render: (order) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/pos/orders/${order.orderId}`)}>
            View
          </Button>
          <Button size="sm" variant="secondary">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Order Search"
        subtitle="Search and manage existing orders"
        breadcrumbs={['Home', 'POS', 'Orders']}
      />

      {/* Search & Filters */}
      <Card title="Search & Filters" className="mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by Order ID, Customer Mobile, or Invoice Number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary">Search</Button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        {/* TODO: Search logic */}
        {/* TODO: Filter logic */}
      </Card>

      {/* Orders Table */}
      <Card title={`Orders (${filterStatus})`}>
        {orders.length === 0 ? (
          <Placeholder title="No orders found" description="Orders matching your criteria will appear here" />
        ) : (
          <Table columns={orderColumns} data={orders} />
        )}
        {/* TODO: Order listing logic */}
        {/* TODO: Pagination */}
      </Card>
    </div>
  );
};

export default OrderSearch;
