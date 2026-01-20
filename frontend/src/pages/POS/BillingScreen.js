import React, { useState } from 'react';
import { PageHeader, Card, Button, Badge } from '../../components/UI';
import APIService from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const BillingScreen = () => {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [bill, setBill] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentForm, setPaymentForm] = useState({ payment_mode: 'CASH', amount: '', reference: '' });

  const handleCreateBill = async () => {
    try {
      const billData = await APIService.createBill({ order_id: orderId, created_by: user?.user_id });
      setBill(billData);
      loadPayments(billData.bill_id);
    } catch (error) {
      alert('Error: ' + (error.detail?.message || 'Failed to create bill'));
    }
  };

  const loadPayments = async (billId) => {
    try {
      const data = await APIService.getBillPayments(billId);
      setPayments(data.payments || []);
    } catch (error) {
      console.error('Failed to load payments:', error);
    }
  };

  const handleRecordPayment = async () => {
    try {
      await APIService.recordPayment(bill.bill_id, {
        ...paymentForm,
        amount: parseFloat(paymentForm.amount),
        collected_by: user?.user_id
      });
      
      const updatedBill = await APIService.getBill(bill.bill_id);
      setBill(updatedBill);
      loadPayments(bill.bill_id);
      setPaymentForm({ payment_mode: 'CASH', amount: '', reference: '' });
    } catch (error) {
      alert('Error: ' + (error.detail?.message || 'Payment failed'));
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      const invoice = await APIService.generateInvoice({ bill_id: bill.bill_id, generated_by: user?.user_id });
      alert(`✅ Invoice generated: ${invoice.invoice_number}`);
      setBill(null);
      setOrderId('');
    } catch (error) {
      alert('Error: ' + (error.detail?.message || 'Invoice generation failed'));
    }
  };

  return (
    <div>
      <PageHeader title="Billing & Payments" breadcrumbs={['Home', 'POS', 'Billing']} />
      
      {!bill ? (
        <Card title="Create Bill">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter locked order ID"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <Button variant="primary" onClick={handleCreateBill}>Create Bill</Button>
          </div>
        </Card>
      ) : (
        <>
          <Card title={`Bill: ${bill.bill_number}`} className="mb-6">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Total Amount</span>
                <span className="font-bold">₹{bill.total_amount}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Outstanding</span>
                <span className="font-bold text-red-600">₹{bill.outstanding_balance}</span>
              </div>
              {bill.outstanding_balance === 0 && <Badge variant="success">Fully Paid</Badge>}
            </div>
          </Card>

          <Card title="Record Payment" className="mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payment Mode</label>
                <select
                  value={paymentForm.payment_mode}
                  onChange={(e) => setPaymentForm({...paymentForm, payment_mode: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="NET_BANKING">Net Banking</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                  placeholder={`Outstanding: ₹${bill.outstanding_balance}`}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reference (Optional)</label>
                <input
                  type="text"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <Button variant="primary" onClick={handleRecordPayment} disabled={!paymentForm.amount}>
                Record Payment
              </Button>
            </div>
          </Card>

          {payments.length > 0 && (
            <Card title="Payment History" className="mb-6">
              {payments.map((p, idx) => (
                <div key={idx} className="flex justify-between border-b pb-2 mb-2">
                  <div>
                    <p className="font-medium">{p.payment_mode}</p>
                    <p className="text-xs text-gray-600">{new Date(p.collected_at).toLocaleString()}</p>
                  </div>
                  <p className="font-semibold">₹{p.amount}</p>
                </div>
              ))}
            </Card>
          )}

          {bill.outstanding_balance === 0 && (
            <Card title="Generate Invoice">
              <Button variant="success" className="w-full" onClick={handleGenerateInvoice}>
                Generate Invoice
              </Button>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default BillingScreen;
