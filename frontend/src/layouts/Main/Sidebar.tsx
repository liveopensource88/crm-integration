import { classNames } from 'primereact/utils';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const menus = [
    { label: 'Integrations', icon: 'pi pi-fw pi-cog', to: '/integrations' },
    { label: 'Accounts', icon: 'pi pi-fw pi-user', to: '/accounts' },
    { label: 'Tickets', icon: 'pi pi-fw pi-ticket', to: '/tickets' }
  ];
  return (
    <div className="layout-sidebar">
      <div className="sidebar-header">
        <img src={`/logo.svg`} alt="logo" className="app-logo" width="64" /> &nbsp; Integration
      </div>

      <ul className="layout-menu">
        <li className="layout-root-menuitem">
          <ul>
            {menus.map(item => {
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={classNames('p-ripple', {
                      'active-route': item!.to && pathname === item!.to
                    })}>
                    <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
                    <span className="layout-menuitem-text"> {item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
