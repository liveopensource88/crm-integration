import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="public-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
