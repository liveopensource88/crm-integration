import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { classNames } from 'primereact/utils';

const Layout: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  };

  return (
    <div
      className={classNames(
        'layout-container layout-light layout-colorscheme-menu layout-static p-ripple-disabled',
        {
          'layout-static-inactive': !isSidebarVisible
        }
      )}>
      <Sidebar />
      <div className="layout-content-wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <div className="layout-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
