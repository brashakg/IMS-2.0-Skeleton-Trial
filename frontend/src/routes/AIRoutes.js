import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';

// TODO: Import AI screens

const AIRoutes = () => {
  return (
    <ProtectedRoute roles={['Superadmin']}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-8">
              <div className="border-4 border-yellow-500 bg-yellow-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                  🤖 AI Intelligence Module - Superadmin Only
                </h2>
                <p className="text-yellow-700 mb-2">
                  <strong>READ-ONLY Intelligence</strong>
                </p>
                <p className="text-yellow-600 text-sm">
                  AI operates in advisory mode only. All actions require explicit Superadmin approval.
                </p>
                <p className="text-yellow-600 text-sm mt-4">
                  TODO: Implement AI screens in Build Pass #2
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </ProtectedRoute>
  );
};

export default AIRoutes;
