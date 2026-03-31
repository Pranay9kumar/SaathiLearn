/**
 * Analytics Engine — Shared computation logic
 * All analytics calculations live HERE, not inside UI components.
 */

export const analyticsEngine = {
  /**
   * Detect risk factors for a student
   */
  detectRisk(student) {
    const factors = [];
    if (student.avgScore < 40) factors.push('low_score');
    if (student.streak_days === 0) factors.push('no_streak');
    if (student.xpProgress < 25) factors.push('low_xp');
    if (student.healthStatus === 'red') factors.push('flagged_red');
    return { isAtRisk: factors.length >= 2, factors };
  },

  /**
   * Classify a student as on-track / monitoring / at-risk
   */
  classifyStatus(student) {
    const { isAtRisk } = this.detectRisk(student);
    if (isAtRisk) return 'at-risk';
    if (student.avgScore >= 75 && student.streak_days >= 7) return 'on-track';
    return 'monitoring';
  },

  /**
   * Compute summary stats from a student list
   */
  computeStats(students) {
    if (!students.length) return { total: 0, activeToday: 0, avgProgress: 0, atRisk: 0 };
    const activeToday = students.filter(s => s.healthStatus === 'green').length;
    const avgProgress = Math.round(students.reduce((a, s) => a + (s.xpProgress || 0), 0) / students.length);
    const atRisk = students.filter(s => this.detectRisk(s).isAtRisk).length;
    return { total: students.length, activeToday, avgProgress, atRisk };
  },

  /**
   * Generate cohort-level insights
   */
  generateInsights(students) {
    const atRiskStudents = students.filter(s => this.detectRisk(s).isAtRisk);
    const atRiskPct = Math.round((atRiskStudents.length / students.length) * 100);
    const inactive = students.filter(s => s.healthStatus !== 'green');
    const avgStreak = (students.reduce((a, s) => a + s.streak_days, 0) / students.length).toFixed(1);
    return { atRiskPct, dropOffRisk: inactive.length, avgStreak, atRiskStudents };
  },

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(students) {
    const recs = [];
    const highRisk = students.filter(s => this.detectRisk(s).isAtRisk);
    const zeroStreak = students.filter(s => s.streak_days === 0);
    const nearCompletion = students.filter(s => s.xpProgress >= 85);

    if (highRisk.length > 0) {
      recs.push({
        type: 'action', icon: '🆘', priority: 'high',
        text: `Schedule 1:1 sessions with ${highRisk.map(s => s.name.split(' ')[0]).join(', ')} — at-risk status detected.`
      });
    }
    if (zeroStreak.length > 0) {
      recs.push({
        type: 'engage', icon: '🔁', priority: 'medium',
        text: `Re-engage ${zeroStreak.map(s => s.name.split(' ')[0]).join(', ')} — streak broken.`
      });
    }
    if (nearCompletion.length > 0) {
      recs.push({
        type: 'celebrate', icon: '🏆', priority: 'low',
        text: `${nearCompletion.map(s => s.name.split(' ')[0]).join(', ')} near level-up. Send encouragement!`
      });
    }
    return recs;
  },

  /**
   * Subject-level performance aggregation
   */
  subjectPerformance(students) {
    const subjects = {};
    students.forEach(s => {
      (s.subjects || []).forEach(sub => {
        if (!subjects[sub]) subjects[sub] = { total: 0, count: 0 };
        subjects[sub].total += s.avgScore || 0;
        subjects[sub].count += 1;
      });
    });
    return Object.entries(subjects).map(([name, d]) => ({
      name, avg: Math.round(d.total / d.count), count: d.count
    }));
  },
};

export default analyticsEngine;
