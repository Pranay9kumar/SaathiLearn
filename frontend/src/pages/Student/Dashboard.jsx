import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { getStudentProfile } from '../../api/student';
import { getTodaysMission, submitMission } from '../../api/mission';
import { getHint } from '../../api/student';
import { requestMentorHelp } from '../../api/mentor';
import { GlassCard } from '../../components/UI/GlassCard';
import { AnimatedButton } from '../../components/UI/AnimatedButton';
import { Zap, Flame, Trophy, HelpCircle, Send } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  const [profile, setProfile] = useState(null);
  const [missionData, setMissionData] = useState(null);
  const [missionAnswers, setMissionAnswers] = useState({});
  const [hints, setHints] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [missionResult, setMissionResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('student:xpUpdate', (data) => {
        setProfile(prev => ({
          ...prev,
          xp: { totalXp: data.totalXp },
          streak: { ...prev.streak, currentStreak: data.currentStreak }
        }));
      });
      
      socket.on('mentor:reply', (data) => {
        alert(`Mentor ${data.mentor.name} replied!\n\nQuestion: ${data.question.question}\nReply: ${data.response}`);
      });
      
      return () => {
        socket.off('student:xpUpdate');
        socket.off('mentor:reply');
      }
    }
  }, [socket]);

  const fetchData = async () => {
    try {
      const pRes = await getStudentProfile();
      setProfile(pRes.data);
      
      const mRes = await getTodaysMission();
      setMissionData(mRes.data);
    } catch(err) {
      console.error(err);
    }
  };

  const handleAnswerSelect = (qId, option) => {
    setMissionAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleGetHint = async (qId) => {
    try {
      const res = await getHint(qId);
      setHints(prev => ({ ...prev, [qId]: res.data.hint }));
    } catch(err) {
      console.error(err);
    }
  };

  const handleMentorRequest = async (qId) => {
    try {
      await requestMentorHelp(qId, "I need help understanding this concept.");
      alert('Mentor requested! You will be notified when they reply.');
    } catch(err) {
      alert(err.response?.data?.message || 'Failed to request mentor.');
    }
  };

  const handleMissionSubmit = async () => {
    if (!missionData || !missionData.mission) return;
    
    // Format answers
    const answersArray = Object.keys(missionAnswers).map(qId => ({
      questionId: qId,
      answer: missionAnswers[qId]
    }));

    if (answersArray.length !== missionData.mission.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitMission(missionData.mission.id, answersArray);
      setMissionResult(res.data);
      setMissionData(prev => ({ ...prev, alreadyCompleted: true }));
      // Profile will auto update via socket event
    } catch(err) {
      console.error(err);
      alert('Failed to submit mission');
    } finally {
      setSubmitting(false);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Student Dashboard</h1>
          <p>Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="grid-cols-3" style={{ marginBottom: '2.5rem' }}>
        <GlassCard className="flex-between">
          <div>
            <p className="form-label">Total XP</p>
            <h2 style={{ margin: 0 }}>{profile.xp?.totalXp || 0} XP</h2>
          </div>
          <Zap size={36} color="var(--primary-color)" />
        </GlassCard>
        
        <GlassCard className="flex-between">
          <div>
            <p className="form-label">Current Streak</p>
            <h2 style={{ margin: 0 }}>{profile.streak?.currentStreak || 0} Days</h2>
          </div>
          <Flame size={36} color="var(--warning-color)" />
        </GlassCard>
        
        <GlassCard className="flex-between">
          <div>
            <p className="form-label">Completion Rate</p>
            <h2 style={{ margin: 0 }}>{profile.stats?.completionRate || 0}%</h2>
          </div>
          <Trophy size={36} color="var(--success-color)" />
        </GlassCard>
      </div>

      {/* Today's Mission Section */}
      <h2 style={{ marginBottom: '1.5rem' }}>Today's Mission</h2>
      
      {missionData?.alreadyCompleted ? (
        <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
          <Trophy size={64} color="var(--success-color)" style={{ margin: '0 auto 1.5rem' }} />
          <h3>Mission Accomplished!</h3>
          <p>You've already completed today's mission. Great job keeping your streak alive! Come back tomorrow for new challenges.</p>
          {missionResult && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', border: '1px solid var(--success-color)' }}>
              <h4>Results</h4>
              <p>Score: {missionResult.score}% ({missionResult.correctCount}/{missionResult.totalQuestions})</p>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>+{missionResult.xpEarned} XP Earned!</p>
            </div>
          )}
        </GlassCard>
      ) : missionData?.mission ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <div>
                <h3>{missionData.mission.subject}</h3>
                <p>{missionData.mission.topic}</p>
              </div>
              <span className="badge badge-info">{missionData.mission.difficulty}</span>
            </div>

            {missionData.mission.questions.map((q, idx) => (
              <div key={q.id} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--surface-border)' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1rem', color: 'white' }}>
                  {idx + 1}. {q.question}
                </p>
                
                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                  {q.options.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => handleAnswerSelect(q.id, opt)}
                      style={{
                        padding: '1rem',
                        textAlign: 'left',
                        background: missionAnswers[q.id] === opt ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0,0,0,0.2)',
                        border: `1px solid ${missionAnswers[q.id] === opt ? 'var(--primary-color)' : 'var(--surface-border)'}`,
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'var(--transition-normal)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex-between" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem' }}>
                  {hints[q.id] ? (
                    <div style={{ color: 'var(--info-color)', fontSize: '0.9rem' }}>
                      <HelpCircle size={14} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }}/>
                      {hints[q.id]}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleGetHint(q.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <HelpCircle size={16} /> Get a Hint
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleMentorRequest(q.id)}
                    style={{ background: 'transparent', border: '1px solid var(--surface-border)', padding: '0.25rem 0.75rem', borderRadius: '4px', color: 'var(--secondary-color)', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Ask a Mentor
                  </button>
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'right' }}>
              <AnimatedButton 
                onClick={handleMissionSubmit} 
                disabled={submitting}
                icon={Send}
              >
                {submitting ? 'Submitting...' : 'Submit Mission'}
              </AnimatedButton>
            </div>
            
          </GlassCard>
        </div>
      ) : (
        <GlassCard>
          <p>No missions available today.</p>
        </GlassCard>
      )}

    </div>
  );
};

export default Dashboard;
