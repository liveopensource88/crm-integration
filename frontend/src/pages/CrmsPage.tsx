import React from 'react';
import Crms from '@/components/Crms';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const CrmsPage: React.FC = () => {
  useDocumentTitle('Integrations');
  return (
    <div>
      <Crms />
    </div>
  );
};

export default CrmsPage;
