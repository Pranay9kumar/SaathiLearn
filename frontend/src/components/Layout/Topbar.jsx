import React, { useContext } from 'react';
import { Search, Bell } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const roleLabels = {
  STUDENT: 'Student',
  MENTOR: 'Mentor',
  ADMIN: 'Admin',
};

export const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="topbar-fixed bg-white border-b border-[var(--border)] flex items-center justify-between px-6 lg:px-8"
      style={{ height: 'var(--topbar-h)' }}
    >
      {/* Left: search */}
      <div className="hidden md:flex items-center gap-3">
        <Search size={15} className="text-slate-400" />
        <input
          type="text"
          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all w-64"
          placeholder="Search..."
        />
      </div>

      {/* Right: role badge + bell + user */}
      <div className="flex items-center gap-4 ml-auto">
        {user?.role && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
            {roleLabels[user.role] || user.role}
          </span>
        )}

        <button className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Online
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 cursor-pointer hover:shadow-sm transition-shadow">
            {(user?.name || 'U').charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};
