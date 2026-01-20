import React, { useState, useEffect } from 'react';
import { PageHeader, Card, Table, Button } from '../../components/UI';
import APIService from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StockMaster = () => {
  const { user } = useAuth();
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [stockData, prodData] = await Promise.all([
        APIService.getStock('all', user?.location_id),
        APIService.searchProducts()
      ]);
      setProducts(prodData.products || []);
    } catch (error) {
      console.error('Failed to load stock:', error);
    }
  };

  const columns = [
    { header: 'Product', accessor: 'name' },
    { header: 'SKU', accessor: 'id' },
    { header: 'Category', accessor: 'category' },
    { header: 'Stock', accessor: 'quantity' },
    { header: 'MRP', render: (row) => `₹${row.mrp}` },
  ];

  return (
    <div>
      <PageHeader
        title="Stock Master"
        breadcrumbs={['Home', 'Inventory', 'Stock']}
        actions={<Button variant="primary" size="sm">Stock In</Button>}
      />
      <Card title="Current Stock">
        <Table columns={columns} data={products} />
      </Card>
    </div>
  );
};

export default StockMaster;
