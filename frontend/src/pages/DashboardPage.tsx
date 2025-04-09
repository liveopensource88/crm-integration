import React from 'react';
import Dashboard from '@/components/Dashboard';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const DashboardPage: React.FC = () => {
  useDocumentTitle('Dashboard');
  return <Dashboard />;
};

export default DashboardPage;
