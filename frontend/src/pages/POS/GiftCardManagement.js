import React, { useState } from 'react';
import { PageHeader, Card, Button, Table, Badge, Placeholder } from '../../components/UI';

const GiftCardManagement = () => {
  const [activeTab, setActiveTab] = useState('issue');
  const giftCardHistory = []; // TODO: Fetch from API

  const historyColumns = [
    { header: 'Card Number', accessor: 'cardNumber' },
    { header: 'Issued Date', accessor: 'issuedDate' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Balance', accessor: 'balance' },
    {
      header: 'Status',
      render: (card) => <Badge variant="success">{card.status}</Badge>,
    },
    { header: 'Customer', accessor: 'customer' },
  ];

  return (
    <div>
      <PageHeader
        title="Gift Card Management"
        subtitle="Issue, validate, and manage gift cards"
        breadcrumbs={['Home', 'POS', 'Gift Cards']}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['issue', 'validate', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Issue New Gift Card */}
      {activeTab === 'issue' && (
        <Card title="Issue New Gift Card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gift Card Number</label>
              <input
                type="text"
                placeholder="Auto-generated or manual entry"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer (Optional)</label>
              <input
                type="text"
                placeholder="Customer name or mobile"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validity Period</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>6 Months</option>
                <option>1 Year</option>
                <option>2 Years</option>
              </select>
            </div>
            <Button variant="primary" className="w-full">Issue Gift Card</Button>
          </div>
          {/* TODO: Gift card issuance logic */}
        </Card>
      )}

      {/* Validate Gift Card */}
      {activeTab === 'validate' && (
        <Card title="Validate Gift Card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gift Card Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter gift card number"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="primary">Validate</Button>
              </div>
            </div>
            <Placeholder title="Gift card details" description="TODO: Balance, validity, status will appear here" />
          </div>
          {/* TODO: Gift card validation logic */}
        </Card>
      )}

      {/* Gift Card History */}
      {activeTab === 'history' && (
        <Card title="Gift Card History">
          {giftCardHistory.length === 0 ? (
            <Placeholder title="No gift cards" description="Gift card history will appear here" />
          ) : (
            <Table columns={historyColumns} data={giftCardHistory} />
          )}
          {/* TODO: History fetch logic */}
        </Card>
      )}
    </div>
  );
};

export default GiftCardManagement;
