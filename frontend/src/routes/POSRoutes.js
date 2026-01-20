import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import POS screens
import POSHomeNew from '../pages/POS/POSHomeNew';
import PaymentProcessing from '../pages/POS/PaymentProcessing';
import OrderConfirmation from '../pages/POS/OrderConfirmation';
import OrderSearch from '../pages/POS/OrderSearch';
import OrderDetails from '../pages/POS/OrderDetails';
import DiscountOverrideRequest from '../pages/POS/DiscountOverrideRequest';
import DiscountApprovals from '../pages/POS/DiscountApprovals';
import GiftCardManagement from '../pages/POS/GiftCardManagement';
import PrescriptionAttachment from '../pages/POS/PrescriptionAttachment';
import DraftOrders from '../pages/POS/DraftOrders';
import BarcodePrinting from '../pages/POS/BarcodePrinting';

const POSRoutes = () => {
  return (
    <Routes>
      {/* Main POS / Sale Entry (Phase 3A - New Implementation) */}
      <Route path="/" element={<POSHomeNew />} />
      
      {/* Payment & Order Flow */}
      <Route path="/payment" element={<PaymentProcessing />} />
      <Route path="/payment/:orderId" element={<PaymentProcessing />} />
      <Route path="/order-confirm/:orderId" element={<OrderConfirmation />} />
      
      {/* Order Management */}
      <Route path="/orders" element={<OrderSearch />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/orders/:orderId/prescription" element={<PrescriptionAttachment />} />
      <Route path="/drafts" element={<DraftOrders />} />
      
      {/* Discount Management */}
      <Route path="/discount-override" element={<DiscountOverrideRequest />} />
      <Route path="/approvals/discounts" element={<DiscountApprovals />} />
      
      {/* Gift Cards */}
      <Route path="/gift-cards" element={<GiftCardManagement />} />
      
      {/* Barcode Printing */}
      <Route path="/barcode-print" element={<BarcodePrinting />} />
    </Routes>
  );
};

export default POSRoutes;
