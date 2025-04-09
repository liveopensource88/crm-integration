import { Avatar } from 'primereact/avatar';
import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { CallHistory, Service } from '@/types';
const CustomerDetail: React.FC = () => {
  const formatDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderServicesBodyTemplate = (rowData: any, column: any) => {
    if (column.body) {
      return column.body(rowData);
    }

    if (column.dataType === 'date') {
      return formatDate(rowData[column.field]);
    }

    return rowData[column.field];
  };

  const servicesColumns = [
    { field: 'name', header: 'Service Name', sortable: false },
    { field: 'policyId', header: 'Policy Id', sortable: false }
  ];

  const callHistoryColumns = [
    { field: 'date', header: 'Call History', dataType: 'date', sortable: false },
    { field: 'attendedBy', header: 'Attended By', sortable: false },
    { field: 'communicationMethod', header: 'Communication Method', sortable: false },
    {
      field: 'status',
      header: 'Status',
      sortable: false,
      body: (rowData: CallHistory) => <Badge value={rowData.status} severity="success" />
    }
  ];

  const services: Service[] = [
    {
      name: 'Car Insurrance',
      policyId: 'PO-CAR-1233'
    },
    {
      name: 'Home Insurrance',
      policyId: 'PO-HOM-1233'
    },
    {
      name: 'Life Insurrance',
      policyId: 'PO-LIF-1233'
    },
    {
      name: 'Travel Insurrance',
      policyId: 'PO-TRA-1233'
    },
    {
      name: 'Business Insurrance',
      policyId: 'PO-BUS-1233'
    }
  ];

  const callHistory: CallHistory[] = [
    {
      date: '2024-09-13',
      attendedBy: 'Steve',
      communicationMethod: 'Whatsapp',
      status: 'Resolved'
    },
    {
      date: '2024-08-13',
      attendedBy: 'Maria',
      communicationMethod: 'SMS',
      status: 'Resolved'
    },
    {
      date: '2024-09-10',
      attendedBy: 'Maria',
      communicationMethod: 'Phone',
      status: 'Resolved'
    },
    {
      date: '2024-10-10',
      attendedBy: 'James',
      communicationMethod: 'Email',
      status: 'Resolved'
    },
    {
      date: '2024-10-10',
      attendedBy: 'Maria',
      communicationMethod: 'Phone',
      status: 'Resolved'
    },
    {
      date: '2024-10-10',
      attendedBy: 'James',
      communicationMethod: 'Email',
      status: 'Resolved'
    }
  ];
  return (
    <>
      <div className="surface-0 mt-2 p-3 shadow-2 border-round">
        <div>
          <div className="font-medium text-900 mb-3">Customer Details</div>
          <div className="grid">
            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <div>
                <Avatar label="***" shape="circle" className="pt-1" />
              </div>
              <div>
                <div className="text-xs">Account Number </div>
                <div className="text-xs">97989798</div>
              </div>
            </div>
            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <Avatar icon="pi pi-user" shape="circle" />
              <div>
                <div className="text-xs">Name </div>
                <div className="text-xs">Dummy Name</div>
              </div>
            </div>

            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <Avatar icon="pi pi-phone" shape="circle" />
              <div>
                <div className="text-xs">Phone Number </div>
                <div className="text-xs">9897986876</div>
              </div>
            </div>
            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <Avatar icon="pi pi-phone" shape="circle" />
              <div>
                <div className="text-xs">Alternative Phone Number </div>
                <div className="text-xs">9897986876</div>
              </div>
            </div>

            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <Avatar icon="pi pi-at" shape="circle" />
              <div>
                <div className="text-xs">E-mail ID </div>
                <div className="text-xs">9897986876</div>
              </div>
            </div>
            <div className="col-12 md:col-6 flex align-items-center gap-1">
              <Avatar icon="pi pi-home" shape="circle" />
              <div>
                <div className="text-xs">Address </div>
                <div className="text-xs">Dummy Address</div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <div className="font-medium text-900 mb-3">Customer Services</div>

          <DataTable className="text-xs" value={services} showGridlines={true}>
            {servicesColumns.map(col => (
              <Column
                key={col.field as string}
                field={col.field as string}
                header={col.header}
                sortable={col.sortable}
                body={rowData => renderServicesBodyTemplate(rowData, col)}
              />
            ))}
          </DataTable>
        </div>
        <div className="pt-3">
          <div className="font-medium text-900 mb-3">Customer History</div>

          <DataTable className="text-xs" value={callHistory} showGridlines={true}>
            {callHistoryColumns.map(col => (
              <Column
                key={col.field as string}
                field={col.field as string}
                header={col.header}
                sortable={col.sortable}
                body={rowData => renderServicesBodyTemplate(rowData, col)}
              />
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default CustomerDetail;
