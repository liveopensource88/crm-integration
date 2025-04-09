import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

interface HeaderProps {
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const menus = [
    { label: 'Accounts', icon: 'pi pi-fw pi-user', to: '/accounts' },
    { label: 'Tickets', icon: 'pi pi-fw pi-ticket', to: '/tickets' }
  ];
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleClick = (to: string) => {
    navigate(to);
  };

  return (
    <div className="layout-topbar">
      <div className="topbar-start">
       <Button
          type="button"
          className="topbar-menubutton p-link p-trigger"
          onClick={toggleSidebar}>
          <i className="pi pi-bars"></i>
        </Button>
        {/* <div className="topbar-breadcrumb">
          <nav className="layout-breadcrumb">
            <ol>
              <li>Dashboard</li>
              <li className="layout-breadcrumb-chevron"> / </li>
              <li>Banking</li>
            </ol>
          </nav>
        </div> */}
      </div>
      <div className="topbar-end">
        <ul className="topbar-menu">
          {menus.map(({ label, to, icon }) => (
            <li key={label} className="ml-1">
              <Button
                onClick={() => handleClick(to)}
                icon={icon}
                className={classNames('p-button-text topbar-menubutton', {
                  'active-route': pathname === to
                })}
              />
            </li>
          ))}

          <li className="ml-3">
            <Button
              onClick={handleLogout}
              icon="pi pi-sign-out"
              className={classNames('p-button-text topbar-menubutton')}></Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
