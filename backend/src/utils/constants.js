// ─── Roles ──────────────────────────────────────────────
const ROLES = {
  STUDENT: 'STUDENT',
  MENTOR: 'MENTOR',
  ADMIN: 'ADMIN',
};

// ─── XP Values ──────────────────────────────────────────
const XP = {
  PER_CORRECT_ANSWER: 10,
  PERFECT_SCORE_BONUS: 25,
  STREAK_BONUS_MULTIPLIER: 0.1, // 10% bonus per streak day
  MAX_STREAK_BONUS: 50,
};

// ─── Streak Thresholds ──────────────────────────────────
const STREAK = {
  AT_RISK_THRESHOLD: 2,         // streak below this = at risk
  BONUS_THRESHOLD: 5,           // streak above this = XP bonus
};

// ─── NGO Metrics Thresholds ─────────────────────────────
const NGO = {
  AT_RISK_COMPLETION_RATE: 30,  // below 30% completion = at risk
  AT_RISK_STREAK: 2,            // streak below 2 = at risk
};

// ─── Mentor Request Status ──────────────────────────────
const MENTOR_REQUEST_STATUS = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  RESOLVED: 'RESOLVED',
};

// ─── Pagination ─────────────────────────────────────────
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

module.exports = {
  ROLES,
  XP,
  STREAK,
  NGO,
  MENTOR_REQUEST_STATUS,
  PAGINATION,
};
