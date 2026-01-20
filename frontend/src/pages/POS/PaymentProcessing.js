import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, Card, Button, Table, Badge, Placeholder } from '../../components/UI';

const PaymentProcessing = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState('Cash');

  // TODO: Fetch order details
  const orderItems = [];
  const totalAmount = 0;

  const paymentModes = ['Cash', 'Card', 'UPI', 'Net Banking', 'Gift Card'];
  const paymentBreakdown = []; // TODO: Track multiple payments

  const itemsColumns = [
    { header: 'Product', accessor: 'product' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Price', accessor: 'price' },
    { header: 'Total', accessor: 'total' },
  ];

  const paymentColumns = [
    { header: 'Mode', accessor: 'mode' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Reference', accessor: 'reference' },
    {
      header: 'Status',
      render: (payment) => <Badge variant="success">{payment.status}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Payment Processing"
        subtitle={`Order: ${orderId || 'New Order'}`}
        breadcrumbs={['Home', 'POS', 'Payment']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card title="Order Summary (Read-only)">
            {orderItems.length === 0 ? (
              <Placeholder title="Order items" description="TODO: Fetch order items" />
            ) : (
              <>
                <Table columns={itemsColumns} data={orderItems} />
                <div className="mt-4 space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Amount</span>
                    <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Payment Methods */}
          <Card title="Payment Method">
            <div className="space-y-4">
              {/* Payment Mode Selection */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {paymentModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      paymentMode === mode
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {mode === 'Cash' && '💵'}
                      {mode === 'Card' && '💳'}
                      {mode === 'UPI' && '📱'}
                      {mode === 'Net Banking' && '🏦'}
                      {mode === 'Gift Card' && '🎁'}
                    </div>
                    <div className="text-sm font-medium">{mode}</div>
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Conditional inputs based on payment mode */}
              {paymentMode === 'Gift Card' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gift Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter gift card number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {paymentMode !== 'Cash' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    placeholder="Transaction reference"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <Button variant="secondary" className="w-full">
                Add Payment
              </Button>
            </div>
            {/* TODO: Multi-mode payment support */}
            {/* TODO: Gift card validation */}
          </Card>

          {/* Payment Breakdown */}
          <Card title="Payment Breakdown">
            {paymentBreakdown.length === 0 ? (
              <Placeholder title="No payments added" description="Add payment methods above" />
            ) : (
              <Table columns={paymentColumns} data={paymentBreakdown} />
            )}
            {/* TODO: Partial payment calculation */}
            {/* TODO: Balance due tracking */}
          </Card>
        </div>

        {/* Right Panel - Summary & Actions */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card title="Payment Summary">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount Due</span>
                <span className="font-bold text-lg">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paid</span>
                <span className="font-semibold text-green-600">₹0.00</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-bold">Balance Due</span>
                <span className="font-bold text-red-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Outstanding & Credit Options */}
          <Card title="Outstanding & Credit">
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="radio" id="fullPayment" name="paymentType" className="mr-2" defaultChecked />
                <label htmlFor="fullPayment">Full Payment</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="partialPayment" name="paymentType" className="mr-2" />
                <label htmlFor="partialPayment">Partial Payment</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="creditSale" name="paymentType" className="mr-2" />
                <label htmlFor="creditSale">Credit Sale</label>
              </div>
              <Placeholder title="Credit Approval" description="TODO: Credit customer validation" />
            </div>
            {/* TODO: Credit sale approval (role-based) */}
            {/* TODO: Outstanding tracking */}
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="primary" className="w-full">
              Confirm Payment
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/pos')}>
              Cancel & Return to Cart
            </Button>
          </div>
          {/* TODO: Payment finalization logic */}
          {/* TODO: Receipt generation trigger */}
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
