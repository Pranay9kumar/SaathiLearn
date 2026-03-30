import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../api/auth';
import { GlassCard } from '../../components/UI/GlassCard';
import { AnimatedButton } from '../../components/UI/AnimatedButton';
import { LogIn } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      loginUser(res.token, res.user);
      
      // Route based on role
      const role = res.user.role;
      if (role === 'STUDENT') navigate('/student/dashboard');
      else if (role === 'MENTOR') navigate('/mentor/dashboard');
      else if (role === 'ADMIN') navigate('/admin/ngo');
      else navigate('/login');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-decoration circle-1" />
      <div className="auth-decoration circle-2" />
      
      <GlassCard className="auth-card animate-fade-in">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to continue your learning journey</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="Ex: aarav@student.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <AnimatedButton 
            type="submit" 
            className="w-full mt-4" 
            disabled={loading}
            icon={LogIn}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </AnimatedButton>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
