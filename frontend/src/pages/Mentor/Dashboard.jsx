import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { getMentorRequests, replyToRequest } from '../../api/mentor';
import { GlassCard } from '../../components/UI/GlassCard';
import { AnimatedButton } from '../../components/UI/AnimatedButton';
import { Clock, CheckCircle, Send } from 'lucide-react';

const MentorDashboard = () => {
  const socket = useContext(SocketContext);
  const [requests, setRequests] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [submitting, setSubmitting] = useState(null); // stores request ID being submitted

  useEffect(() => {
    fetchRequests();
    
    if (socket) {
      socket.on('mentor:newRequest', (newReq) => {
        // Unshift the new request to the top of the list
        setRequests(prev => [newReq, ...prev]);
      });

      return () => {
        socket.off('mentor:newRequest');
      }
    }
  }, [socket]);

  const fetchRequests = async () => {
    try {
      // Fetch specifically pending and assigned requests for this mentor's subjects
      // Since the API returns paginated:
      const res = await getMentorRequests('');
      setRequests(res.data.requests);
    } catch(err) {
      console.error(err);
    }
  };

  const handleReplyChange = (id, val) => {
    setReplyText(prev => ({ ...prev, [id]: val }));
  };

  const handleSubmitReply = async (id) => {
    const text = replyText[id];
    if (!text || text.trim() === '') return;

    setSubmitting(id);
    try {
      await replyToRequest(id, text);
      // Remove from list or mark resolved
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'RESOLVED', response: text } : r));
      alert('Reply sent successfully!');
    } catch(err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Mentor Dashboard</h1>
      
      <div className="grid-cols-2">
        <GlassCard>
          <h3>Active Requests</h3>
          <h1 style={{ fontSize: '3rem', margin: 0, color: 'var(--primary-color)' }}>
            {requests.filter(r => r.status !== 'RESOLVED').length}
          </h1>
        </GlassCard>
        <GlassCard>
          <h3>Resolved by You</h3>
          <h1 style={{ fontSize: '3rem', margin: 0, color: 'var(--success-color)' }}>
            {requests.filter(r => r.status === 'RESOLVED').length}
          </h1>
        </GlassCard>
      </div>

      <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Help Requests Queue</h3>
      
      {requests.length === 0 ? (
        <GlassCard style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <CheckCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>No active help requests. Great job!</p>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {requests.map(req => (
            <GlassCard key={req.id} style={{ borderLeft: `4px solid ${req.status === 'RESOLVED' ? 'var(--success-color)' : req.status === 'ASSIGNED' ? 'var(--warning-color)' : 'var(--danger-color)'}` }}>
              
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className="badge badge-info">{req.question?.mission?.subject}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }}/>
                    {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className={`badge ${req.status === 'RESOLVED' ? 'badge-success' : 'badge-warning'}`}>
                  {req.status}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Question Attempted by <strong>{req.student?.name}</strong>:</p>
                <p style={{ color: 'white', fontWeight: '500' }}>{req.question?.question}</p>
                {req.message && (
                  <div style={{ marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{req.message}"</p>
                  </div>
                )}
              </div>

              {req.status === 'RESOLVED' ? (
                <div>
                  <p className="form-label">Your Reply:</p>
                  <p style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', color: '#a7f3d0' }}>
                    {req.response}
                  </p>
                </div>
              ) : (
                <div>
                  <textarea 
                    className="form-input" 
                    rows="3" 
                    placeholder="Type your explanation here to help the student..."
                    value={replyText[req.id] || ''}
                    onChange={(e) => handleReplyChange(req.id, e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <AnimatedButton 
                      onClick={() => handleSubmitReply(req.id)}
                      disabled={submitting === req.id || !replyText[req.id]}
                      icon={Send}
                    >
                      {submitting === req.id ? 'Sending...' : 'Send Reply to Student'}
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
