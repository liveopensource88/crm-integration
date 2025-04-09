import React from 'react';
import Dialer from '@/components/Dialer';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const DialerPage: React.FC = () => {
  useDocumentTitle('Dialer');
  return (
    <div>
      <Dialer />
    </div>
  );
};

export default DialerPage;
