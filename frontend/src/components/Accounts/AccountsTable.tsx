import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Account } from '@/types';
import { renderBodyTemplate } from '@/utils';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '@/constants';

interface AccountsTableProps {
  accounts: Account[];
  loading: boolean;
  globalFilter: string;
}
const columns: Array<{
  field: keyof Account;
  header: string;
  sortable: boolean;
  width: string;
}> = [
  { field: 'accountName', header: 'Account Name', sortable: true, width: '25%' },
  { field: 'email', header: 'Email', sortable: true, width: '25%' },
  { field: 'phone', header: 'Phone', sortable: true, width: '25%' }
];
const AccountsTable: React.FC<AccountsTableProps> = ({ accounts, loading, globalFilter }) => (
  <DataTable
    value={accounts}
    loading={loading}
    paginator
    rows={ROWS_PER_PAGE}
    rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
    globalFilter={globalFilter}
    emptyMessage="No accounts found">
    {columns.map(col => (
      <Column
        key={col.field as string}
        field={col.field as string}
        header={col.header}
        sortable={col.sortable}
        body={rowData => renderBodyTemplate(rowData, col)}
      />
    ))}
  </DataTable>
);

export default AccountsTable;
