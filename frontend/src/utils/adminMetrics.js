/**
 * Admin Metrics — Platform-wide computation logic for NGO/Admin dashboards.
 * Focuses on macro-level data: mentors, cohort health, program signals.
 */

export const adminMetrics = {
  /**
   * Compute platform-wide summary from students and mentors
   */
  computePlatformStats(students, mentors) {
    const totalStudents = students.length;
    const totalMentors = mentors.length;
    const activeStudents = students.filter(s => s.healthStatus === 'green').length;
    const atRisk = students.filter(s => s.healthStatus === 'red').length;
    const avgScore = totalStudents
      ? Math.round(students.reduce((a, s) => a + (s.avgScore || 0), 0) / totalStudents)
      : 0;
    const avgProgress = totalStudents
      ? Math.round(students.reduce((a, s) => a + (s.xpProgress || 0), 0) / totalStudents)
      : 0;

    return {
      totalStudents,
      totalMentors,
      activeStudents,
      atRisk,
      avgScore,
      avgProgress,
      activeRate: totalStudents ? Math.round((activeStudents / totalStudents) * 100) : 0,
      atRiskRate: totalStudents ? Math.round((atRisk / totalStudents) * 100) : 0,
    };
  },

  /**
   * Compute mentor performance summaries
   */
  computeMentorPerformance(mentors) {
    return mentors.map(m => ({
      ...m,
      performanceLabel: m.avgStudentScore >= 75 ? 'Excellent' :
        m.avgStudentScore >= 55 ? 'Good' : 'Needs Support',
      performanceTone: m.avgStudentScore >= 75 ? 'success' :
        m.avgStudentScore >= 55 ? 'warning' : 'danger',
    }));
  },

  /**
   * Generate admin-level alerts
   */
  generateAlerts(students, requests) {
    const alerts = [];
    const atRiskStudents = students.filter(s => s.healthStatus === 'red');
    const idleStudents = students.filter(s => s.healthStatus === 'yellow');
    const openRequests = requests.filter(r => r.status === 'open');

    if (atRiskStudents.length > 0) {
      alerts.push({
        id: 'alert_risk',
        type: 'danger',
        text: `${atRiskStudents.length} student${atRiskStudents.length > 1 ? 's' : ''} flagged at-risk. Immediate mentor follow-up recommended.`,
      });
    }
    if (openRequests.length > 3) {
      alerts.push({
        id: 'alert_requests',
        type: 'warning',
        text: `${openRequests.length} unresolved help requests. Consider redistributing mentor load.`,
      });
    }
    if (idleStudents.length > 0) {
      alerts.push({
        id: 'alert_idle',
        type: 'warning',
        text: `${idleStudents.length} student${idleStudents.length > 1 ? 's' : ''} idle for 3+ days. Send engagement nudges.`,
      });
    }

    return alerts;
  },

  /**
   * Compute subject-level aggregation for the whole platform
   */
  subjectBreakdown(students) {
    const map = {};
    students.forEach(s => {
      (s.subjects || []).forEach(sub => {
        if (!map[sub]) map[sub] = { name: sub, students: 0, totalScore: 0 };
        map[sub].students += 1;
        map[sub].totalScore += s.avgScore || 0;
      });
    });
    return Object.values(map).map(s => ({
      ...s,
      avgScore: s.students ? Math.round(s.totalScore / s.students) : 0,
    }));
  },
};

export default adminMetrics;
