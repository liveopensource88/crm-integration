import React from 'react';
import Configuration from '@/components/Configuration';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const ConfigurationPage: React.FC = () => {
  useDocumentTitle('Configuration');

  return <Configuration />;
};

export default ConfigurationPage;
