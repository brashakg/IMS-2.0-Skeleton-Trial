import React from 'react';
import { PageHeader, Card, Badge, Table, Button, Placeholder } from '../../components/UI';

const DiscountApprovals = () => {
  // TODO: Fetch pending discount override requests
  const pendingRequests = [];
  const approvalHistory = [];

  const requestColumns = [
    { header: 'Request ID', accessor: 'requestId' },
    { header: 'Date', accessor: 'date' },
    { header: 'Staff', accessor: 'staff' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Requested %', accessor: 'requestedDiscount' },
    { header: 'Current %', accessor: 'currentDiscount' },
    { header: 'Reason', accessor: 'reason' },
    {
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button size="sm" variant="success">Approve</Button>
          <Button size="sm" variant="danger">Reject</Button>
        </div>
      ),
    },
  ];

  const historyColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Request', accessor: 'request' },
    { header: 'Staff', accessor: 'staff' },
    {
      header: 'Decision',
      render: (item) => <Badge variant={item.decision === 'Approved' ? 'success' : 'danger'}>{item.decision}</Badge>,
    },
    { header: 'Approver', accessor: 'approver' },
  ];

  return (
    <div>
      <PageHeader
        title="Discount Approvals"
        subtitle="Review and approve discount override requests"
        breadcrumbs={['Home', 'POS', 'Approvals']}
        actions={<Badge variant="warning">{pendingRequests.length} Pending</Badge>}
      />

      {/* Pending Requests */}
      <Card title="Pending Discount Override Requests" className="mb-6">
        {pendingRequests.length === 0 ? (
          <Placeholder title="No pending requests" description="All discount requests have been processed" />
        ) : (
          <Table columns={requestColumns} data={pendingRequests} />
        )}
        {/* TODO: Approval queue logic */}
        {/* TODO: Filtering by store/staff */}
      </Card>

      {/* Approval History */}
      <Card title="Approval History">
        {approvalHistory.length === 0 ? (
          <Placeholder title="No approval history" description="Approved/rejected requests will appear here" />
        ) : (
          <Table columns={historyColumns} data={approvalHistory} />
        )}
        {/* TODO: History fetch logic */}
      </Card>
    </div>
  );
};

export default DiscountApprovals;
