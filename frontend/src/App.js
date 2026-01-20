import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Unauthorized from './pages/Auth/Unauthorized';

// TODO: Import all module routes (will be created)
import DashboardRoutes from './routes/DashboardRoutes';
import POSRoutes from './routes/POSRoutes';
import InventoryRoutes from './routes/InventoryRoutes';
import ClinicalRoutes from './routes/ClinicalRoutes';
import HRRoutes from './routes/HRRoutes';
import PayrollRoutes from './routes/PayrollRoutes';
import FinanceRoutes from './routes/FinanceRoutes';
import TasksRoutes from './routes/TasksRoutes';
import ExpensesRoutes from './routes/ExpensesRoutes';
import MarketplaceRoutes from './routes/MarketplaceRoutes';
import AIRoutes from './routes/AIRoutes';
import SetupRoutes from './routes/SetupRoutes';
import EnquiryRoutes from './routes/EnquiryRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    {/* Redirect root to dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Module Routes */}
                    <Route path="/dashboard/*" element={<DashboardRoutes />} />
                    <Route path="/pos/*" element={<POSRoutes />} />
                    <Route path="/enquiry/*" element={<EnquiryRoutes />} />
                    <Route path="/inventory/*" element={<InventoryRoutes />} />
                    <Route path="/clinical/*" element={<ClinicalRoutes />} />
                    <Route path="/hr/*" element={<HRRoutes />} />
                    <Route path="/payroll/*" element={<PayrollRoutes />} />
                    <Route path="/finance/*" element={<FinanceRoutes />} />
                    <Route path="/tasks/*" element={<TasksRoutes />} />
                    <Route path="/expenses/*" element={<ExpensesRoutes />} />
                    <Route path="/marketplace/*" element={<MarketplaceRoutes />} />
                    <Route path="/ai/*" element={<AIRoutes />} />
                    <Route path="/setup/*" element={<SetupRoutes />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={<div className="p-8">404 - Page Not Found</div>} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
