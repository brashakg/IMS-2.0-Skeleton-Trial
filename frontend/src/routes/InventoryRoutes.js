import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StockMaster from '../pages/Inventory/StockMaster';

const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StockMaster />} />
      <Route path="/stock" element={<StockMaster />} />
    </Routes>
  );
};

export default InventoryRoutes;
