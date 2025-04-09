import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/Public/Layout';
import MainLayout from './layouts/Main/Layout';

// Lazy load components
const Login = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/DashboardPage'));
const Dialer = lazy(() => import('./pages/DialerPage'));
const Accounts = lazy(() => import('./pages/AccountsPage'));
const Tickets = lazy(() => import('./pages/TicketsPage'));
const Crms = lazy(() => import('./pages/CrmsPage'));
const Configuration = lazy(() => import('./pages/ConfigurationPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          {/* Protected Route Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Accounts />} />
            <Route path="dialer" element={<Dialer />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />

            <Route path="tickets/*" element={<Tickets />}>
              <Route path="new" element={<Tickets />} />
              <Route path="edit/:ticketId" element={<Tickets />} />
            </Route>

            <Route path="integrations" element={<Crms />} />
            <Route path="integrations/:id" element={<Configuration />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
