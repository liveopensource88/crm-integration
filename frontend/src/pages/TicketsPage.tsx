import React from 'react';
import Tickets from '@/components/Tickets/Tickets';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const TicketsPage: React.FC = () => {
  useDocumentTitle('Tickets');
  return (
    <div>
      <Tickets />
    </div>
  );
};

export default TicketsPage;
