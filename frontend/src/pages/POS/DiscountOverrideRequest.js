import React from 'react';
import { PageHeader, Card, Button, Placeholder } from '../../components/UI';
import { useNavigate } from 'react-router-dom';

const DiscountOverrideRequest = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Request Discount Override"
        subtitle="Request discount beyond role-allowed cap"
        breadcrumbs={['Home', 'POS', 'Discount Override']}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Current Discount Summary */}
        <Card title="Current Discount Summary">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Applied Discount</span>
              <span className="font-semibold">0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role-Allowed Maximum</span>
              <span className="font-semibold text-blue-600">0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Requested Discount</span>
              <span className="font-semibold text-red-600">0%</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-bold">Difference to be Approved</span>
              <span className="font-bold text-red-600">0%</span>
            </div>
          </div>
        </Card>

        {/* Override Request Form */}
        <Card title="Override Request Form">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requested Discount Percentage *
              </label>
              <input
                type="number"
                placeholder="Enter discount percentage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason (Mandatory) *
              </label>
              <textarea
                rows={4}
                placeholder="Provide detailed justification for override request..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approver
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Store Manager</option>
                <option>HQ Admin</option>
              </select>
            </div>
          </div>
          {/* TODO: Validation logic for reason and amount */}
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="primary" className="flex-1">
            Submit Request
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate('/pos')}>
            Cancel
          </Button>
        </div>
        {/* TODO: Request submission logic */}
        {/* TODO: Notification to approver */}
      </div>
    </div>
  );
};

export default DiscountOverrideRequest;
