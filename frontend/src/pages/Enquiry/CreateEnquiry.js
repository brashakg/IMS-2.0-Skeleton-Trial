import React, { useState } from 'react';
import { PageHeader, Card, Button } from '../../components/UI';
import APIService from '../../services/api';

const CreateEnquiry = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_mobile: '',
    enquiry_details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await APIService.createEnquiry(formData);
      alert('✅ Enquiry created successfully');
      setFormData({ customer_name: '', customer_mobile: '', enquiry_details: '' });
    } catch (error) {
      alert('Error: ' + (error.detail?.message || 'Failed to create enquiry'));
    }
  };

  return (
    <div>
      <PageHeader title="Create Enquiry" breadcrumbs={['Home', 'Enquiry', 'Create']} />
      
      <Card title="Enquiry Form" className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.customer_name}
              onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
            <input
              type="tel"
              required
              value={formData.customer_mobile}
              onChange={(e) => setFormData({...formData, customer_mobile: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Details *</label>
            <textarea
              required
              rows={4}
              value={formData.enquiry_details}
              onChange={(e) => setFormData({...formData, enquiry_details: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <Button type="submit" variant="primary">Create Enquiry</Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateEnquiry;
