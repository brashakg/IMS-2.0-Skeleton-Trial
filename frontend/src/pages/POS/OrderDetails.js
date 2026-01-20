import React from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Card, Button, Table, Badge, Placeholder } from '../../components/UI';

const OrderDetails = () => {
  const { orderId } = useParams();

  // TODO: Fetch order details
  const order = null;
  const orderItems = [];
  const paymentHistory = [];
  const auditLog = [];

  const itemsColumns = [
    { header: 'Product', accessor: 'product' },
    { header: 'Barcode', accessor: 'barcode' },
    { header: 'MRP', accessor: 'mrp' },
    { header: 'Offer Price', accessor: 'offerPrice' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Final Price', accessor: 'finalPrice' },
    {
      header: 'Actions',
      render: () => <Button size="sm" variant="danger">Remove</Button>,
    },
  ];

  const paymentColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Mode', accessor: 'mode' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Reference', accessor: 'reference' },
    { header: 'Staff', accessor: 'staff' },
  ];

  const auditColumns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Action', accessor: 'action' },
    { header: 'User', accessor: 'user' },
    { header: 'Details', accessor: 'details' },
  ];

  return (
    <div>
      <PageHeader
        title={`Order Details: ${orderId}`}
        breadcrumbs={['Home', 'POS', 'Orders', orderId]}
        actions={
          <>
            <Badge variant="success">Completed</Badge>
            <Button variant="outline" size="sm">Edit Order</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <Card title="Order Information">
            {!order ? (
              <Placeholder
                title="Order details"
                description="TODO: Fetch order information (customer, staff, store, timestamps)"
              />
            ) : (
              <div className="space-y-2">
                {/* TODO: Order info display */}
              </div>
            )}
          </Card>

          {/* Order Items */}
          <Card title="Order Items">
            {orderItems.length === 0 ? (
              <Placeholder title="Order items" description="TODO: Fetch order items" />
            ) : (
              <Table columns={itemsColumns} data={orderItems} />
            )}
            {/* TODO: Edit restrictions based on order status */}
            {/* TODO: Audit trail for edits */}
          </Card>

          {/* Prescription Panel */}
          <Card title="Prescription">
            <Placeholder
              title="Prescription status"
              description="TODO: Prescription attachment indicator and actions"
            />
            {/* TODO: Prescription attachment logic */}
          </Card>

          {/* Payment History */}
          <Card title="Payment History">
            {paymentHistory.length === 0 ? (
              <Placeholder title="Payment history" description="TODO: Fetch payment history" />
            ) : (
              <Table columns={paymentColumns} data={paymentHistory} />
            )}
            {/* TODO: Payment history fetch logic */}
          </Card>

          {/* Audit Log */}
          <Card title="Order Timeline / Audit Log">
            {auditLog.length === 0 ? (
              <Placeholder title="Audit log" description="TODO: Fetch audit trail" />
            ) : (
              <Table columns={auditColumns} data={auditLog} />
            )}
            {/* TODO: Audit log integration */}
          </Card>
        </div>

        {/* Right Panel - Actions */}
        <div className="space-y-6">
          <Card title="Actions">
            <div className="space-y-2">
              <Button variant="primary" className="w-full">
                Edit Order
              </Button>
              <Button variant="secondary" className="w-full">
                Add Payment
              </Button>
              <Button variant="secondary" className="w-full">
                Mark as Delivered
              </Button>
              <Button variant="danger" className="w-full">
                Cancel Order
              </Button>
            </div>
            {/* TODO: Role-based action controls */}
            {/* TODO: Escalation workflows for restricted actions */}
          </Card>

          {/* Order Summary */}
          <Card title="Order Summary">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-blue-600">₹0.00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
