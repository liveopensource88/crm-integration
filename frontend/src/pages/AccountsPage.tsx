import React from 'react';
import Accounts from '@/components/Accounts/Accounts';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const AccountsPage: React.FC = () => {
  useDocumentTitle('Accounts');

  return (
    <div>
      <Accounts />
    </div>
  );
};

export default AccountsPage;
