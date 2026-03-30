import React, { useContext } from 'react';
import { Search, Bell } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all w-64 lg:w-80 focus:ring-4 focus:ring-blue-500/10"
              placeholder="Search students, subjects..."
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors bg-slate-50 rounded-full hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-blue-600 font-medium tracking-wide flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-blue-500 to-indigo-500 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-sm font-bold text-blue-600">
                {(user?.name || 'U').charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
