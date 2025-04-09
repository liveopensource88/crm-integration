import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Action, Ticket } from '@/types';
import Form from '../Form';

interface TicketFormSidebarProps {
  visible: boolean;
  ticket: Ticket | undefined;
  action: Action;
  onClose: () => void;
  onSuccess: () => void;
}

const TicketSidebar: React.FC<TicketFormSidebarProps> = ({
  visible,
  ticket,
  action,
  onClose,
  onSuccess
}) => (
  <Sidebar className="sidebar" visible={visible} onHide={onClose} position="right">
    <h2>{action === 'update' ? 'Update Ticket' : 'New Ticket'}</h2>
    <Form id="zoho-crm-ticket-schema" action={action} initialData={ticket} onSuccess={onSuccess} />
  </Sidebar>
);

export default TicketSidebar;
