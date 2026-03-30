import React, { useEffect, useState } from 'react';
import { getNgoMetrics, getAtRiskStudents } from '../../api/ngo';
import { GlassCard } from '../../components/UI/GlassCard';
import { Users, Activity, Target, AlertTriangle } from 'lucide-react';

const NGODashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [atRisk, setAtRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [metricsRes, riskRes] = await Promise.all([
          getNgoMetrics(), 
          getAtRiskStudents()
        ]);
        setMetrics(metricsRes.data);
        setAtRisk(riskRes.data);
      } catch (err) {
        console.error("Admin data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div className="spinner" style={{ margin: '4rem auto' }}/>;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>NGO Analytics Dashboard</h1>
          <p>Real-time insights across all students</p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid-cols-4" style={{ marginBottom: '3rem' }}>
        <GlassCard>
          <div className="flex-between">
            <p className="form-label">Total Students</p>
            <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem', color: 'var(--info-color)' }}>
              <Users size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{metrics?.totalStudents || 0}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--success-color)' }}>{metrics?.activeStudentsLast7Days}</span> active this week
          </p>
        </GlassCard>

        <GlassCard>
          <div className="flex-between">
            <p className="form-label">Engagement Score</p>
            <div style={{ padding: '0.5rem', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '0.5rem', color: 'var(--primary-color)' }}>
              <Activity size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{metrics?.engagementScore || 0}%</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Missions completion rate</p>
        </GlassCard>

        <GlassCard>
          <div className="flex-between">
            <p className="form-label">Avg Consistency</p>
            <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '0.5rem', color: 'var(--warning-color)' }}>
              <Target size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{metrics?.consistencyIndex || 0}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average days streak across platform</p>
        </GlassCard>

        <GlassCard>
          <div className="flex-between">
            <p className="form-label">Learning Trend</p>
            <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '0.5rem', color: 'var(--success-color)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>+{metrics?.learningImprovement || 0}%</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Improvement over last 7 days</p>
        </GlassCard>
      </div>

      {/* At Risk Students Table */}
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--danger-color)' }}>
        <AlertTriangle size={24} />
        At-Risk Students ({atRisk?.total || 0})
      </h2>
      
      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        {atRisk?.students?.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Student Name</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Class</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Completion %</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Streak</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Risk Factors</th>
                </tr>
              </thead>
              <tbody>
                {atRisk.students.map((student, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'white' }}>{student.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>Class {student.class}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ color: student.completionRate < 30 ? 'var(--danger-color)' : 'inherit' }}>
                        {student.completionRate}%
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ color: student.currentStreak < 2 ? 'var(--danger-color)' : 'inherit' }}>
                        {student.currentStreak}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {student.riskFactors.map((factor, j) => (
                          <span key={j} className="badge badge-warning" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            {factor}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No students are currently marked as at-risk. Great job!
          </div>
        )}
      </GlassCard>

    </div>
  );
};

export default NGODashboard;
