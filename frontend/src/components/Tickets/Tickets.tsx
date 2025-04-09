import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { ticketService } from '@/services';
import { Ticket } from '@/types';
import TicketsTable from './TicketsTable';
import TicketSidebar from './TicketSidebar';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TableToolbar from '../Table/Toolbar';

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const location = useLocation();

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await ticketService.getAll();
      setTickets(data);
    } catch {
      toast.current?.show({ severity: 'error', detail: 'Error fetching tickets' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const currentTicket = useMemo(() => {
    return tickets.find(t => t.id === ticketId);
  }, [tickets, ticketId]);

  useEffect(() => {
    if (currentTicket || location.pathname === '/tickets/new') {
      setTicket(currentTicket);
      setVisibleSidebar(true);
      document.documentElement.classList.add('overflow-hidden');
    } else {
      setTicket(undefined);
      setVisibleSidebar(false);
      document.documentElement.classList.remove('overflow-hidden');
    }
  }, [currentTicket, location.pathname]);

  const onSuccess = useCallback(() => {
    ticketService.deleteCache();
    setVisibleSidebar(false);
    navigate('/tickets');
    fetchTickets();
  }, [fetchTickets, navigate]);

  return (
    <div className="card">
      <h2>Tickets</h2>
      <Toast ref={toast} />
      <TableToolbar onNew={() => navigate('/tickets/new')} onSearch={setGlobalFilter} />
      <TicketsTable
        tickets={tickets}
        onEdit={ticket => navigate(`/tickets/edit/${ticket.id}`)}
        loading={loading}
        globalFilter={globalFilter}
      />
      <TicketSidebar
        visible={visibleSidebar}
        ticket={ticket}
        action={ticketId ? 'update' : 'create'}
        onClose={() => {
          setVisibleSidebar(false);
          setTimeout(() => navigate('/tickets'), 300);
        }}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default Tickets;
