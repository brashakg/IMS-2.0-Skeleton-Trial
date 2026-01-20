import React from 'react';
import { PageHeader, Card, Button, Table, Badge, Placeholder } from '../../components/UI';
import { useNavigate } from 'react-router-dom';

const DraftOrders = () => {
  const navigate = useNavigate();
  const drafts = []; // TODO: Fetch from API

  const draftColumns = [
    { header: 'Draft ID', accessor: 'draftId' },
    { header: 'Date Saved', accessor: 'dateSaved' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Items Count', accessor: 'itemsCount' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Staff', accessor: 'staff' },
    {
      header: 'Actions',
      render: (draft) => (
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={() => navigate('/pos')}>
            Resume
          </Button>
          <Button size="sm" variant="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Draft Orders"
        subtitle="Manage incomplete or saved draft orders"
        breadcrumbs={['Home', 'POS', 'Drafts']}
        actions={<Badge variant="info">{drafts.length} Drafts</Badge>}
      />

      <Card title="Draft Orders">
        {drafts.length === 0 ? (
          <Placeholder
            title="No draft orders"
            description="Draft orders will appear here when you save an order"
          />
        ) : (
          <Table columns={draftColumns} data={drafts} />
        )}
        {/* TODO: Draft listing logic */}
      </Card>
    </div>
  );
};

export default DraftOrders;
