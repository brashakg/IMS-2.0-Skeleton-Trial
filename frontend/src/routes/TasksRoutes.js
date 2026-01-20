import React from 'react';
import { Routes, Route } from 'react-router-dom';

// TODO: Import Tasks screens

const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8">Tasks & SOPs Module - Coming Soon</div>} />
    </Routes>
  );
};

export default TasksRoutes;
