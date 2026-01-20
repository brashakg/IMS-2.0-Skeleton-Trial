import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEnquiry from '../pages/Enquiry/CreateEnquiry';
import EnquiryList from '../pages/Enquiry/EnquiryList';

const EnquiryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EnquiryList />} />
      <Route path="/create" element={<CreateEnquiry />} />
    </Routes>
  );
};

export default EnquiryRoutes;
