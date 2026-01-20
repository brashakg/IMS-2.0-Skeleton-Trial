import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Table } from '../../components/UI';
import APIService from '../../services/api';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const data = await APIService.listEnquiries();
      setEnquiries(data.enquiries || []);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
    }
  };

  const columns = [
    { header: 'Customer', accessor: 'customer_name' },
    { header: 'Mobile', accessor: 'customer_mobile' },
    { header: 'Details', accessor: 'enquiry_details' },
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <PageHeader title="Enquiries" breadcrumbs={['Home', 'Enquiry']} />
      <Card title="Enquiry List">
        <Table columns={columns} data={enquiries} />
      </Card>
    </div>
  );
};

export default EnquiryList;
