import React from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, Card, Button, Placeholder } from '../../components/UI';

const PrescriptionAttachment = () => {
  const { orderId } = useParams();

  return (
    <div>
      <PageHeader
        title="Attach Prescription to Order"
        subtitle={`Order: ${orderId}`}
        breadcrumbs={['Home', 'POS', 'Orders', orderId, 'Prescription']}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Prescription Selection */}
        <Card title="Prescription Selection">
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="radio" id="existing" name="prescriptionType" className="mr-2" defaultChecked />
              <label htmlFor="existing" className="font-medium">Select from Existing Prescriptions</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="new" name="prescriptionType" className="mr-2" />
              <label htmlFor="new" className="font-medium">Create New Prescription (Navigate to Clinical)</label>
            </div>

            <Placeholder title="Prescription list" description="TODO: Prescription search and selection" />
          </div>
          {/* TODO: Prescription search logic */}
          {/* TODO: Prescription validity check */}
        </Card>

        {/* Prescription Preview */}
        <Card title="Prescription Preview">
          <Placeholder
            title="Prescription details"
            description="TODO: Prescription details (read-only), validity date, optometrist name"
          />
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="primary" className="flex-1">Attach Prescription</Button>
          <Button variant="outline" className="flex-1">Cancel</Button>
        </div>
        {/* TODO: Prescription attachment logic */}
        {/* TODO: Validation against order items */}
      </div>
    </div>
  );
};

export default PrescriptionAttachment;
