import React from 'react';
import { Routes, Route } from 'react-router-dom';
import POSCanvasRevised from '../pages/POS/POSCanvasRevised';
import BillingScreen from '../pages/POS/BillingScreen';
import OrderSearch from '../pages/POS/OrderSearch';
import DiscountApprovals from '../pages/POS/DiscountApprovals';

const POSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<POSCanvasRevised />} />
      <Route path="/billing" element={<BillingScreen />} />
      <Route path="/orders" element={<OrderSearch />} />
      <Route path="/approvals/discounts" element={<DiscountApprovals />} />
    </Routes>
  );
};

export default POSRoutes;
