import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { signup } from '../../api/auth';
import { GlassCard } from '../../components/UI/GlassCard';
import { AnimatedButton } from '../../components/UI/AnimatedButton';
import { UserPlus } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    className: '8' // default for students
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // payload matches api expectations
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      if (formData.role === 'STUDENT') {
         payload.class = parseInt(formData.className);
      }

      const res = await signup(payload);
      loginUser(res.token, res.user);
      
      const role = res.user.role;
      if (role === 'STUDENT') navigate('/student/dashboard');
      else if (role === 'MENTOR') navigate('/mentor/dashboard');
      else if (role === 'ADMIN') navigate('/admin/ngo');
      else navigate('/login');
      
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].message);
      } else {
        setError(err.response?.data?.message || 'Signup failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-decoration circle-1" style={{ background: 'var(--secondary-color)', right: '10%' }} />
      <div className="auth-decoration circle-2" style={{ background: 'var(--info-color)', left: '10%', bottom: '20%' }} />
      
      <GlassCard className="auth-card animate-fade-in">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join SaathiLearn today</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" type="text" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" className="form-input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-input" value={formData.password} onChange={handleChange} required minLength={8}/>
          </div>
          <div className="grid-cols-2">
            <div className="form-group">
              <label className="form-label">I am a</label>
              <select name="role" className="form-input" value={formData.role} onChange={handleChange}>
                <option value="STUDENT">Student</option>
                <option value="MENTOR">Mentor</option>
              </select>
            </div>
            {formData.role === 'STUDENT' && (
              <div className="form-group">
                <label className="form-label">Class (Grade)</label>
                <select name="className" className="form-input" value={formData.className} onChange={handleChange}>
                  {[6,7,8,9,10].map(c => <option key={c} value={c}>Class {c}</option>)}
                </select>
              </div>
            )}
          </div>
          
          <AnimatedButton type="submit" className="w-full mt-2" disabled={loading} icon={UserPlus}>
            {loading ? 'Creating...' : 'Sign Up'}
          </AnimatedButton>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Signup;
