import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, Card, Button, Badge, Placeholder } from '../../components/UI';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // TODO: Fetch order details
  const order = null;

  return (
    <div>
      <PageHeader title="Order Confirmation" breadcrumbs={['Home', 'POS', 'Order Confirmation']} />

      {/* Success Banner */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Order Created Successfully!</h2>
        <p className="text-green-700">Order ID: <span className="font-mono font-bold">{orderId || 'ORD-XXXX'}</span></p>
        <p className="text-green-600 mt-1">Customer: TODO - Customer Name</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Order Details">
            {!order ? (
              <Placeholder
                title="Order information"
                description="TODO: Fetch order details (items, amount, payment modes, balance)"
              />
            ) : (
              <div className="space-y-4">
                {/* TODO: Order details display */}
              </div>
            )}
          </Card>

          {/* Receipt Preview */}
          <Card title="Receipt Preview">
            <Placeholder
              title="Printable receipt layout"
              description="TODO: Receipt template rendering"
            />
            {/* TODO: Receipt template rendering */}
          </Card>
        </div>

        {/* Right Panel - Next Steps & Actions */}
        <div className="space-y-6">
          {/* Next Steps */}
          <Card title="Next Steps">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="text-blue-600 mr-3">📅</div>
                <div>
                  <p className="font-medium">Expected Delivery</p>
                  <p className="text-sm text-gray-600">TODO - Delivery date</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-yellow-600 mr-3">⚠️</div>
                <div>
                  <p className="font-medium">Pending Actions</p>
                  <p className="text-sm text-gray-600">TODO - Prescription attachment status</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-purple-600 mr-3">🔔</div>
                <div>
                  <p className="font-medium">Follow-up Reminder</p>
                  <p className="text-sm text-gray-600">TODO - Reminder settings</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card title="Actions">
            <div className="space-y-2">
              <Button variant="primary" className="w-full">
                🖨️ Print Receipt
              </Button>
              <Button variant="secondary" className="w-full">
                📧 Send Receipt via SMS/Email
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/pos')}>
                🆕 New Sale
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/pos/orders/${orderId}`)}
              >
                👁️ View Order Details
              </Button>
            </div>
            {/* TODO: Print integration */}
            {/* TODO: SMS/Email integration */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
