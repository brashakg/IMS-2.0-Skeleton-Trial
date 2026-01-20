import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DailySalesReport from '../pages/Reports/DailySalesReport';

const ReportsRoutes = () => {
  return (
    <Routes>
      <Route path="/daily-sales" element={<DailySalesReport />} />
    </Routes>
  );
};

export default ReportsRoutes;
