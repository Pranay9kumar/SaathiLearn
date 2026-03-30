import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, Smartphone, Globe, Lock, MessageSquare, History as HistoryIcon, UserCircle } from 'lucide-react';

export const Chat = () => (
  <div className="flex-center flex-col h-[calc(100vh-150px)] max-w-lg mx-auto text-center">
    <div className="w-24 h-24 rounded-[2rem] bg-purple-50 border border-purple-100 flex items-center justify-center mb-6 shadow-sm">
      <MessageSquare size={40} className="text-purple-500" />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Direct Messaging</h2>
    <p className="text-slate-500 leading-relaxed mb-8">
      The synchronized real-time chat module for private mentoring sessions is currently in development. 
      Please continue using the Doubts Inbox for async student queries.
    </p>
    <button className="btn btn-primary px-8 shadow-sm">Coming Soon</button>
  </div>
);

export const History = () => (
  <div className="flex-center flex-col h-[calc(100vh-150px)] max-w-lg mx-auto text-center">
    <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 shadow-sm">
      <HistoryIcon size={40} className="text-emerald-500" />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Audit & Log History</h2>
    <p className="text-slate-500 leading-relaxed mb-8">
      Detailed historical logs of resolved requests, assignment distributions, and performance snapshots are coming in the v1.2 update.
    </p>
    <button className="btn bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 shadow-sm">Return to Dashboard</button>
  </div>
);

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'preferences', icon: Globe, label: 'Preferences' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 pb-2">Account Settings</h1>
        <p className="text-slate-500 text-sm">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <motion.div variants={itemVariants} className="lg:w-64 shrink-0">
          <div className="glass-panel p-2 flex flex-row lg:flex-col overflow-x-auto hide-scrollbar bg-white border border-slate-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-600 shadow-[inset_3px_0_0_#2563eb]' 
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
        <motion.div variants={itemVariants} className="flex-1 space-y-6">
          
          {activeTab === 'profile' && (
            <>
              <div className="glass-panel p-6 md:p-8 bg-white border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Public Profile</h3>
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl shadow-sm relative group cursor-pointer border-4 border-white">
                    M
                    <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-semibold text-slate-800">Change</span>
                    </div>
                  </div>
                  <div>
                     <h4 className="text-slate-800 font-bold mb-1">Mentor Avatar</h4>
                     <p className="text-xs text-slate-500 max-w-xs mb-3">Upload a square image. Supported formats: JPG, PNG, GIF. Max size 2MB.</p>
                     <div className="flex gap-2">
                        <button className="btn btn-secondary text-xs px-3 py-1.5 border-slate-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 shadow-sm">Change Photo</button>
                        <button className="btn border border-transparent hover:border-red-200 text-xs text-slate-500 hover:text-red-600 px-3 py-1.5 bg-slate-50 hover:bg-red-50 transition-colors">Remove</button>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="form-group mb-0">
                    <label className="form-label text-slate-600">First Name</label>
                    <input type="text" className="form-input bg-white border-slate-200 text-slate-800" defaultValue="Saathi" />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label text-slate-600">Last Name</label>
                    <input type="text" className="form-input bg-white border-slate-200 text-slate-800" defaultValue="Mentor" />
                  </div>
                  <div className="form-group mb-0 md:col-span-2">
                    <label className="form-label text-slate-600">Email Address</label>
                    <input type="email" className="form-input bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed" defaultValue="mentor@saathi.in" readOnly />
                  </div>
                  <div className="form-group mb-0 md:col-span-2">
                    <label className="form-label text-slate-600">Bio / Qualifications</label>
                    <textarea className="form-input bg-white border-slate-200 text-slate-800 min-h-[100px] resize-none" defaultValue="Mathematics & Science Educator. B.Ed from Delhi University. Passionate about bringing structured learning to every child." />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                   <button className="btn btn-primary gap-2 px-6 shadow-sm hover:shadow-md">
                     <Save size={16} /> Save Profile Changes
                   </button>
                </div>
              </div>

              <div className="glass-panel p-6 md:p-8 border border-emerald-200 bg-emerald-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700 flex items-center gap-2 mb-1">
                      <CheckCircle /> Availability Status
                    </h3>
                    <p className="text-sm text-emerald-600/80">Control if students can send you real-time doubts</p>
                  </div>
                  <div className="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-7 rounded-full bg-emerald-500 cursor-pointer shadow-inner"></label>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'profile' && (
             <div className="glass-panel p-16 flex flex-col items-center justify-center text-center bg-white border border-slate-200 border-dashed">
                <Shield size={48} className="text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Advanced Settings</h3>
                <p className="text-slate-500 max-w-sm">
                  {activeTab === 'notifications' && "Push notifications, email digests, and SMS alert configurations will be available in the upcoming release."}
                  {activeTab === 'security' && "Two-factor authentication, active sessions, and password management options will be rolled out shortly."}
                  {activeTab === 'preferences' && "UI theming, language defaults, and accessibility settings are currently locked to system defaults."}
                </p>
             </div>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
};

// Internal mini-component for the availability switch icon
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
     <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
