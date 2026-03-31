import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[var(--bg-main)] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Fixed topbar */}
        <Topbar />

        {/* Scrollable content below topbar */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingTop: 'var(--topbar-h)' }}
        >
          <div className="px-6 py-6 lg:px-8 lg:py-8 max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
