import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

import { Account } from '@/types';
import { accountService } from '@/services';
import AccountsTable from './AccountsTable';
import TableToolbar from '../Table/Toolbar';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const toast = useRef<Toast>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await accountService.getAll();
      setAccounts(data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        detail: 'Error fetching customer data.'
      });
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="card">
      <h2>Accounts</h2>
      <Toast ref={toast} />
      <TableToolbar onSearch={setGlobalFilter} />
      <AccountsTable accounts={accounts} loading={loading} globalFilter={globalFilter} />
    </div>
  );
};

export default Accounts;
