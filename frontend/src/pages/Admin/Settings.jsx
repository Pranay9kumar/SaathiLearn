import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, Globe, Lock, Building2 } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('organization');

  const tabs = [
    { id: 'organization', icon: Building2, label: 'Organization' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'preferences', icon: Globe, label: 'Preferences' },
  ];

  const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemV = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerV} initial="hidden" animate="visible" className="flex flex-col gap-6 pb-10 max-w-5xl mx-auto">
      <motion.header variants={itemV}>
        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Administration</div>
        <h1 className="text-[1.75rem] font-extrabold text-slate-900 mt-1.5 leading-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your organization profile, notifications, and platform preferences.</p>
      </motion.header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <motion.div variants={itemV} className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-2 flex flex-row lg:flex-col overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div variants={itemV} className="flex-1 space-y-6">
          {activeTab === 'organization' && (
            <>
              <div className="bg-white rounded-2xl border border-[var(--border)] p-6 lg:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Organization Profile</h3>

                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-black text-2xl">
                    SL
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-bold mb-1">Organization Logo</h4>
                    <p className="text-xs text-slate-500 max-w-xs mb-3">Square image, max 2MB. JPG, PNG supported.</p>
                    <div className="flex gap-2">
                      <button className="btn btn-secondary text-xs px-3 py-1.5">Change Logo</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="form-group mb-0">
                    <label className="form-label">Organization Name</label>
                    <input type="text" className="form-input" defaultValue="SaathiLearn Foundation" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Admin Name</label>
                    <input type="text" className="form-input" defaultValue="NGO Admin" />
                  </div>
                  <div className="form-group mb-0 md:col-span-2">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input bg-slate-50 text-slate-500 cursor-not-allowed" defaultValue="admin@saathi.in" readOnly />
                  </div>
                  <div className="form-group mb-0 md:col-span-2">
                    <label className="form-label">Program Description</label>
                    <textarea className="form-input min-h-[100px] resize-none" defaultValue="Empowering underprivileged students through AI-powered, gamified learning with mentorship support. Operating across Pune & Maharashtra region." />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Region</label>
                    <input type="text" className="form-input" defaultValue="Pune, Maharashtra" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Program Cohort</label>
                    <input type="text" className="form-input" defaultValue="Cohort 4 — Spring 2026" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="btn btn-primary gap-2 px-6 shadow-sm hover:shadow-md">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-base font-bold text-emerald-700 mb-1">Platform Status</h3>
                    <p className="text-sm text-emerald-600/80">All systems operational. Last health check: 2 min ago.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'organization' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] border-dashed p-16 flex flex-col items-center justify-center text-center">
              <Shield size={48} className="text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">Advanced Settings</h3>
              <p className="text-slate-500 max-w-sm">
                {activeTab === 'notifications' && 'Push notifications, email digests, and SMS alert configurations will be available in the upcoming release.'}
                {activeTab === 'security' && 'Two-factor authentication, active sessions, and password management options will be rolled out shortly.'}
                {activeTab === 'preferences' && 'UI theming, language defaults, and accessibility settings are currently locked to system defaults.'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
