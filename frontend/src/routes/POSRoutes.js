import React from 'react';
import { Routes, Route } from 'react-router-dom';
import POSFinal from '../pages/POS/POSFinal';
import BillingScreen from '../pages/POS/BillingScreen';
import OrderSearch from '../pages/POS/OrderSearch';
import DiscountApprovals from '../pages/POS/DiscountApprovals';

const POSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<POSFinal />} />
      <Route path="/billing" element={<BillingScreen />} />
      <Route path="/orders" element={<OrderSearch />} />
      <Route path="/approvals/discounts" element={<DiscountApprovals />} />
    </Routes>
  );
};

export default POSRoutes;
