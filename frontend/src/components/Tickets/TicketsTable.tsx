import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Ticket } from '@/types';
import { Button } from 'primereact/button';
import { renderBodyTemplate } from '@/utils';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '@/constants';
import { useIsDesktop } from '@/hooks';

import './TicketsTable.css';
interface TicketsTableProps {
  tickets: Ticket[];
  onEdit: (ticket: Ticket) => void;
  loading: boolean;
  globalFilter: string;
}

const columns: Array<{
  field: keyof Ticket;
  header: string;
  sortable: boolean;
  dataType?: string;
  width: string;
}> = [
  { field: 'subject', header: 'Subject', sortable: true, width: '50%' },
  { field: 'status', header: 'Status', sortable: true, width: '20%' },
  { field: 'dueDate', header: 'Due Date', dataType: 'date', sortable: false, width: '15%' }
];

const renderStatusBodyTemplate = (rowData: Ticket) => {
  return (
    <span className={`status-badge ${rowData?.status?.replace(' ', '')}`}>{rowData.status}</span>
  );
};

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onEdit, loading, globalFilter }) => {
  const isDesktop = useIsDesktop();

  return (
    <DataTable
      value={tickets}
      loading={loading}
      paginator
      rows={ROWS_PER_PAGE}
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      globalFilter={globalFilter}
      emptyMessage="No tickets found"
      tableStyle={{
        minWidth: '50rem',
        tableLayout: isDesktop ? 'fixed' : 'auto'
      }}>
      {columns.map(col => (
        <Column
          key={col.field as string}
          field={col.field as string}
          header={col.header}
          sortable={col.sortable}
          body={rowData => {
            if (col.field === 'status') {
              return renderStatusBodyTemplate(rowData);
            } else {
              return renderBodyTemplate(rowData, col);
            }
          }}
          headerStyle={{
            width: col.width,
            whiteSpace: 'normal'
          }}
          bodyStyle={{
            width: col.width,
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
        />
      ))}
      <Column
        body={rowData => (
          <Button
            icon="pi pi-pencil"
            className="p-button-text p-button-rounded"
            onClick={() => onEdit(rowData)}
          />
        )}
        header="Action"
        style={{ width: '10%' }}
      />
    </DataTable>
  );
};

export default TicketsTable;
