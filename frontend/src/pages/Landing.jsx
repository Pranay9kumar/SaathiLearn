import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/UI/GlassCard';
import { AnimatedButton } from '../components/UI/AnimatedButton';
import { Sparkles, Brain, Users, TrendingUp } from 'lucide-react';

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Decor */}
      <div className="auth-decoration circle-1" style={{ top: '-10%', left: '-5%', width: '500px', height: '500px', background: 'var(--primary-color)' }} />
      <div className="auth-decoration circle-2" style={{ bottom: '-15%', right: '-5%', width: '600px', height: '600px', background: 'var(--secondary-color)', animationDelay: '-2s' }} />

      <nav className="flex-between" style={{ padding: '2rem 5%', position: 'relative', zIndex: 10 }}>
        <h1 className="brand-logo" style={{ fontSize: '2.5rem', margin: 0 }}>Saathi<span style={{ color: 'var(--secondary-color)' }}>Learn</span></h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login">
            <AnimatedButton variant="secondary">Log In</AnimatedButton>
          </Link>
          <Link to="/signup">
            <AnimatedButton variant="primary">Get Started</AnimatedButton>
          </Link>
        </div>
      </nav>

      <main style={{ padding: '6rem 5% 4rem', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '5rem', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #a78bfa, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your AI-Powered <br/> Learning Companion
        </h1>
        <p className="animate-fade-in delay-100" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Master new concepts through personalized daily missions, earn experience points, keep up your streak, and get instant help from AI or expert mentors when you're stuck.
        </p>

        <div className="animate-fade-in delay-200" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '6rem' }}>
          <Link to="/signup">
            <AnimatedButton icon={Sparkles} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Start Learning Now</AnimatedButton>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid-cols-3 animate-fade-in delay-300" style={{ textAlign: 'left' }}>
          <GlassCard>
            <div style={{ background: 'rgba(139, 92, 246, 0.2)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Brain size={24} color="var(--primary-color)" />
            </div>
            <h3>Smart Daily Missions</h3>
            <p>Bite-sized, personalized quizzes aligned with your class curriculum designed to build your knowledge step-by-step.</p>
          </GlassCard>

          <GlassCard>
            <div style={{ background: 'rgba(236, 72, 153, 0.2)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Users size={24} color="var(--secondary-color)" />
            </div>
            <h3>Instant Mentor Help</h3>
            <p>Stuck on a problem? Get instant AI hints or escalate the issue to expert mentors who will guide you to the solution in real-time.</p>
          </GlassCard>

          <GlassCard>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <TrendingUp size={24} color="#10b981" />
            </div>
            <h3>Gamified Progress</h3>
            <p>Earn XP, maintain daily streaks, and climb the leaderboard as you consistently conquer complex science and math challenges.</p>
          </GlassCard>
        </div>
      </main>

    </div>
  );
};

export default Landing;
