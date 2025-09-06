import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';

const AppLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-neutral-bg">
      <Sidebar />
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:ml-sidebar-collapsed' : 'lg:ml-sidebar'
        }`}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
