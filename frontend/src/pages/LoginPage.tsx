import React from 'react';
import Login from '@/components/Login';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const LoginPage: React.FC = () => {
  useDocumentTitle('Login');
  return <Login />;
};

export default LoginPage;
