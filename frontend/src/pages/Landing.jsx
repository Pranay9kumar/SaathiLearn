import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Brain, Users, TrendingUp } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-70" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px] opacity-70" />

      <nav className="flex justify-between items-center py-6 px-8 md:px-12 relative z-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight m-0">
          Saathi<span className="text-blue-600">Learn</span>
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 md:px-12 relative z-10 text-center max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 tracking-tight">
          Your AI-Powered <br/> Learning Companion
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Master new concepts through personalized daily missions, earn experience points, keep up your streak, and get instant help from expert mentors when you're stuck.
        </p>

        <div className="flex justify-center gap-4 mb-24">
          <Link to="/signup">
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-slate-800 hover:bg-slate-900 shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1">
              <Sparkles size={20} className="text-amber-400" /> Start Learning Now
            </button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Brain size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Smart Daily Missions</h3>
            <p className="text-slate-600 leading-relaxed">
              Bite-sized, personalized quizzes aligned with your class curriculum designed to build your knowledge step-by-step.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              <Users size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Instant Mentor Help</h3>
            <p className="text-slate-600 leading-relaxed">
              Stuck on a problem? Get instant AI hints or escalate the issue to expert mentors who will guide you to the solution in real-time.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Gamified Progress</h3>
            <p className="text-slate-600 leading-relaxed">
              Earn XP, maintain daily streaks, and climb the leaderboard as you consistently conquer complex science and math challenges.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Landing;
