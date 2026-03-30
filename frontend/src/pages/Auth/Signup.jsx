import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { signup } from '../../api/auth';
import { GlassCard } from '../../components/UI/GlassCard';
import { AnimatedButton } from '../../components/UI/AnimatedButton';
import {
  UserPlus, GraduationCap, BookOpen, Building2, Info,
  ArrowRight, ArrowLeft, Check,
} from 'lucide-react';
import './Auth.css';

/* ═══════════════════════════════════════════════════
   Data — roles, subjects, activities
   ═══════════════════════════════════════════════════ */
const ROLES = [
  { key: 'STUDENT', label: 'Student', icon: GraduationCap },
  { key: 'MENTOR', label: 'Mentor', icon: BookOpen },
  { key: 'ADMIN', label: 'NGO', icon: Building2 },
];

const CLASS_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

const SUBJECTS_BY_CLASS = {
  // Primary (1-3)
  1:  ['English', 'Hindi', 'Mathematics', 'EVS', 'Art'],
  2:  ['English', 'Hindi', 'Mathematics', 'EVS', 'Art'],
  3:  ['English', 'Hindi', 'Mathematics', 'EVS', 'Art', 'Computer Basics'],
  // Upper Primary (4-5)
  4:  ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer'],
  5:  ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer'],
  // Middle (6-8)
  6:  ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Sanskrit', 'Computer'],
  7:  ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Sanskrit', 'Computer'],
  8:  ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Sanskrit', 'Computer'],
  // Secondary (9-10)
  9:  ['English', 'Hindi', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 'Computer Science'],
  10: ['English', 'Hindi', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies', 'Computer Science'],
  // Senior Secondary (11-12)
  11: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Accountancy'],
  12: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Accountancy'],
};

const ACTIVITIES = [
  { key: 'quiz',            label: 'Quiz',            emoji: '🧩' },
  { key: 'coding',          label: 'Coding',          emoji: '💻' },
  { key: 'reading',         label: 'Reading',         emoji: '📖' },
  { key: 'problem_solving', label: 'Problem Solving', emoji: '🧠' },
  { key: 'games',           label: 'Games',           emoji: '🎮' },
];

/* Total steps for each role */
const STUDENT_STEPS = 3; // 1: account  2: subjects  3: activities

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
const Signup = () => {
  /* ─── Core form state ─── */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    className: '1',
  });

  /* ─── Student onboarding state ─── */
  const [step, setStep] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ─── Derived ─── */
  const isStudent = formData.role === 'STUDENT';
  const totalSteps = isStudent ? STUDENT_STEPS : 1;
  const subjects = useMemo(
    () => SUBJECTS_BY_CLASS[parseInt(formData.className)] || [],
    [formData.className],
  );

  /* ─── Handlers ─── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset subjects when class changes
    if (name === 'className') {
      setSelectedSubjects([]);
    }
  };

  const handleRoleChange = (roleKey) => {
    setFormData((prev) => ({ ...prev, role: roleKey }));
    setStep(1); // reset to step 1 on role change
    setSelectedSubjects([]);
    setSelectedActivities([]);
  };

  const toggleSubject = (subj) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj],
    );
  };

  const toggleActivity = (key) => {
    setSelectedActivities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key],
    );
  };

  /* ─── Step navigation ─── */
  const canGoNext = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.password.length >= 8;
    }
    if (step === 2) return selectedSubjects.length > 0;
    return true;
  };

  const nextStep = () => {
    if (step < totalSteps && canGoNext()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role === 'STUDENT') {
        payload.class = parseInt(formData.className);
        payload.subjects = selectedSubjects;
        payload.activities = selectedActivities;
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

  /* ═══════════════════════════════════════════════════
     Render helpers
     ═══════════════════════════════════════════════════ */

  // Step indicator (Student only, steps > 1)
  const renderStepIndicator = () => {
    if (!isStudent) return null;
    const labels = ['Account', 'Subjects', 'Activities'];
    return (
      <div className="step-indicator">
        {labels.map((label, i) => {
          const num = i + 1;
          const isDone = step > num;
          const isCurrent = step === num;
          return (
            <div key={num} className="step-item">
              <div className={`step-dot ${isCurrent ? 'step-current' : ''} ${isDone ? 'step-done' : ''}`}>
                {isDone ? <Check size={14} strokeWidth={3} /> : num}
              </div>
              <span className={`step-label ${isCurrent ? 'step-label-active' : ''}`}>{label}</span>
              {num < labels.length && <div className={`step-line ${isDone ? 'step-line-done' : ''}`} />}
            </div>
          );
        })}
      </div>
    );
  };

  // Step 1 — Account details (common for all + conditional class/NGO)
  const renderStep1 = () => (
    <div className="step-content animate-step-in" key="step-1">
      {/* Common Fields */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-name">Full Name</label>
        <input id="signup-name" name="name" type="text" className="form-input"
          placeholder="e.g. Aarav Sharma" value={formData.name}
          onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="signup-email">Email Address</label>
        <input id="signup-email" name="email" type="email" className="form-input"
          placeholder="you@example.com" value={formData.email}
          onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="signup-password">Password</label>
        <input id="signup-password" name="password" type="password" className="form-input"
          placeholder="Min. 8 characters" value={formData.password}
          onChange={handleChange} required minLength={8} />
      </div>

      {/* Student: Class */}
      {isStudent && (
        <div className="form-group animate-field-in">
          <label className="form-label" htmlFor="signup-class">Class (Grade)</label>
          <select id="signup-class" name="className" className="form-input"
            value={formData.className} onChange={handleChange}>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </select>
        </div>
      )}

      {/* NGO info */}
      {formData.role === 'ADMIN' && (
        <div className="role-info-banner animate-field-in">
          <Info size={18} />
          <span>You are signing up as an NGO administrator for Youngistaan.</span>
        </div>
      )}
    </div>
  );

  // Step 2 — Subject Selection
  const renderStep2 = () => (
    <div className="step-content animate-step-in" key="step-2">
      <div className="step-section-header">
        <h3>Choose Your Subjects</h3>
        <p>Pick the subjects you want to learn in Class {formData.className}</p>
      </div>

      <div className="subject-grid">
        {subjects.map((subj) => {
          const isSelected = selectedSubjects.includes(subj);
          return (
            <button key={subj} type="button"
              className={`subject-chip ${isSelected ? 'chip-selected' : ''}`}
              onClick={() => toggleSubject(subj)}>
              {isSelected && <Check size={14} strokeWidth={3} />}
              <span>{subj}</span>
            </button>
          );
        })}
      </div>

      {selectedSubjects.length > 0 && (
        <p className="selection-count animate-field-in">
          {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );

  // Step 3 — Activity Selection
  const renderStep3 = () => (
    <div className="step-content animate-step-in" key="step-3">
      <div className="step-section-header">
        <h3>What do you enjoy?</h3>
        <p>Select activities to personalize your learning</p>
      </div>

      <div className="activity-grid">
        {ACTIVITIES.map(({ key, label, emoji }) => {
          const isSelected = selectedActivities.includes(key);
          return (
            <button key={key} type="button"
              className={`activity-chip ${isSelected ? 'chip-selected' : ''}`}
              onClick={() => toggleActivity(key)}>
              <span className="activity-emoji">{emoji}</span>
              <span className="activity-label">{label}</span>
              {isSelected && <Check size={14} strokeWidth={3} className="chip-check" />}
            </button>
          );
        })}
      </div>

      {selectedActivities.length > 0 && (
        <p className="selection-count animate-field-in">
          {selectedActivities.length} activit{selectedActivities.length !== 1 ? 'ies' : 'y'} selected
        </p>
      )}
    </div>
  );

  const renderCurrentStep = () => {
    if (step === 1) return renderStep1();
    if (step === 2) return renderStep2();
    if (step === 3) return renderStep3();
  };

  /* ═══════════════════════════════════════════════════
     Main render
     ═══════════════════════════════════════════════════ */
  return (
    <div className="auth-container">
      <div className="auth-decoration circle-1" />
      <div className="auth-decoration circle-2" />

      <GlassCard className="auth-card signup-card animate-fade-in">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join SaathiLearn today</p>
        </div>

        {renderStepIndicator()}

        {error && <div className="alert-error">{error}</div>}

        {/* Role selector — only on step 1 */}
        {step === 1 && (
          <div className="role-selector" role="radiogroup" aria-label="Select your role">
            {ROLES.map(({ key, label, icon: Icon }) => (
              <button key={key} type="button"
                className={`role-option ${formData.role === key ? 'role-active' : ''}`}
                onClick={() => handleRoleChange(key)}
                aria-pressed={formData.role === key}>
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {renderCurrentStep()}

          {/* ─── Navigation Buttons ─── */}
          <div className="step-nav">
            {isStudent && step > 1 && (
              <button type="button" className="btn btn-secondary step-btn-back" onClick={prevStep}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}

            {isStudent && step < totalSteps ? (
              <button type="button"
                className={`btn btn-primary step-btn-next ${!canGoNext() ? 'btn-disabled' : ''}`}
                onClick={nextStep} disabled={!canGoNext()}>
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <AnimatedButton type="submit" className="step-btn-submit"
                disabled={loading || (isStudent && step === 1 && !canGoNext())} icon={UserPlus}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </AnimatedButton>
            )}
          </div>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Signup;
