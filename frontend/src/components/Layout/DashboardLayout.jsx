import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
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
          <div className="px-8 py-8 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
