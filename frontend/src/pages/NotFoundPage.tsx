import React from 'react';
import useDocumentTitle from '@/hooks/useDocumentTitle';

const NotFoundPage: React.FC = () => {
  useDocumentTitle('Page Not Found');

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
