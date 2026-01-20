import React from 'react';
import { Routes, Route } from 'react-router-dom';

// TODO: Import Clinical screens

const ClinicalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8">Clinical Module - Coming Soon</div>} />
    </Routes>
  );
};

export default ClinicalRoutes;
