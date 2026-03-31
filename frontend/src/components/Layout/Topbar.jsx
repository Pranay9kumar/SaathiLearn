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
      className="topbar-fixed bg-white border-b border-[#e0e7ff] flex items-center justify-between px-8 shadow-[0_2px_8px_rgba(14,165,233,0.05)]"
      style={{ height: 'var(--topbar-h)' }}
    >
      {/* Left: search */}
      <div className="hidden md:flex items-center gap-3">
        <Search size={16} className="text-slate-500" />
        <input
          type="text"
          className="bg-blue-50/50 border border-[#e0e7ff] rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 transition-all w-64 font-medium"
          placeholder="Search students, subjects..."
        />
      </div>

      {/* Right: role badge + bell + user */}
      <div className="flex items-center gap-5 ml-auto">
        {user?.role && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
            {roleLabels[user.role] || user.role}
          </span>
        )}

        <button className="p-2 text-slate-600 hover:text-indigo-600 bg-blue-50/50 hover:bg-blue-100/60 rounded-xl transition-colors cursor-pointer font-semibold">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 pl-5 border-l border-[#e0e7ff]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-600 flex items-center justify-end gap-1.5 mt-0.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Online
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 border border-indigo-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] transition-all">
            {(user?.name || 'U').charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
};
