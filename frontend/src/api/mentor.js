// MOCK DATA FOR MENTOR DASHBOARD — Premium Data Layer
const MOCK_DELAY = 600;

export const mockStudents = [
  {
    id: "stu_101", name: "Rahul Verma", email: "rahul.v@saathi.in", avatar: null,
    class: 10, subjects: ["Math", "Science"], streak_days: 12, longest_streak: 15,
    total_xp: 2450, level: 5, healthStatus: "green", lastActive: "2 hours ago",
    badges: ["7-Day Warrior", "Scholar"], requests: 2, avgScore: 82,
    xpProgress: 72 // percent to next level
  },
  {
    id: "stu_102", name: "Sneha Patel", email: "sneha.p@saathi.in", avatar: null,
    class: 10, subjects: ["English", "Science"], streak_days: 0, longest_streak: 8,
    total_xp: 1200, level: 3, healthStatus: "yellow", lastActive: "3 days ago",
    badges: ["Rising Star"], requests: 0, avgScore: 65,
    xpProgress: 40
  },
  {
    id: "stu_103", name: "Amit Kumar", email: "amit.k@saathi.in", avatar: null,
    class: 10, subjects: ["Math", "English"], streak_days: 0, longest_streak: 4,
    total_xp: 450, level: 1, healthStatus: "red", lastActive: "2 weeks ago",
    badges: [], requests: 0, avgScore: 38,
    xpProgress: 18
  },
  {
    id: "stu_104", name: "Priya Sharma", email: "priya.s@saathi.in", avatar: null,
    class: 10, subjects: ["Science", "Math"], streak_days: 28, longest_streak: 28,
    total_xp: 4800, level: 10, healthStatus: "green", lastActive: "Just now",
    badges: ["Champion", "Quiz Master", "7-Day Warrior", "Fearless"], requests: 1, avgScore: 95,
    xpProgress: 88
  },
  {
    id: "stu_105", name: "Deepak Singh", email: "deepak.s@saathi.in", avatar: null,
    class: 9, subjects: ["Math", "Hindi"], streak_days: 5, longest_streak: 12,
    total_xp: 1800, level: 4, healthStatus: "green", lastActive: "1 hour ago",
    badges: ["7-Day Warrior"], requests: 0, avgScore: 74,
    xpProgress: 55
  },
  {
    id: "stu_106", name: "Ananya Reddy", email: "ananya.r@saathi.in", avatar: null,
    class: 10, subjects: ["Science", "English"], streak_days: 0, longest_streak: 3,
    total_xp: 680, level: 2, healthStatus: "yellow", lastActive: "4 days ago",
    badges: [], requests: 1, avgScore: 52,
    xpProgress: 32
  },
  {
    id: "stu_107", name: "Vikram Joshi", email: "vikram.j@saathi.in", avatar: null,
    class: 9, subjects: ["Math", "Science"], streak_days: 18, longest_streak: 22,
    total_xp: 3600, level: 8, healthStatus: "green", lastActive: "30 min ago",
    badges: ["Quiz Master", "7-Day Warrior", "Scholar"], requests: 0, avgScore: 88,
    xpProgress: 78
  },
  {
    id: "stu_108", name: "Meera Das", email: "meera.d@saathi.in", avatar: null,
    class: 10, subjects: ["English", "Hindi"], streak_days: 0, longest_streak: 2,
    total_xp: 220, level: 1, healthStatus: "red", lastActive: "3 weeks ago",
    badges: [], requests: 0, avgScore: 28,
    xpProgress: 10
  },
  {
    id: "stu_109", name: "Arjun Mehta", email: "arjun.m@saathi.in", avatar: null,
    class: 9, subjects: ["Science", "Math"], streak_days: 9, longest_streak: 14,
    total_xp: 2100, level: 5, healthStatus: "green", lastActive: "4 hours ago",
    badges: ["Rising Star", "7-Day Warrior"], requests: 0, avgScore: 79,
    xpProgress: 62
  },
  {
    id: "stu_110", name: "Kavya Nair", email: "kavya.n@saathi.in", avatar: null,
    class: 10, subjects: ["Math", "English", "Science"], streak_days: 3, longest_streak: 10,
    total_xp: 1500, level: 4, healthStatus: "green", lastActive: "6 hours ago",
    badges: ["Rising Star"], requests: 0, avgScore: 71,
    xpProgress: 48
  },
  {
    id: "stu_111", name: "Rohan Gupta", email: "rohan.g@saathi.in", avatar: null,
    class: 9, subjects: ["Hindi", "Science"], streak_days: 0, longest_streak: 6,
    total_xp: 890, level: 2, healthStatus: "yellow", lastActive: "5 days ago",
    badges: [], requests: 0, avgScore: 55,
    xpProgress: 28
  },
  {
    id: "stu_112", name: "Ishita Rao", email: "ishita.r@saathi.in", avatar: null,
    class: 10, subjects: ["Math", "Science"], streak_days: 15, longest_streak: 20,
    total_xp: 3200, level: 7, healthStatus: "green", lastActive: "1 hour ago",
    badges: ["Champion", "7-Day Warrior"], requests: 0, avgScore: 91,
    xpProgress: 82
  }
];

export const mockRequests = [
  {
    id: "req_001", student_id: "stu_101", studentName: "Rahul Verma",
    subject: "Math", topic: "Geometry",
    question: "I don't understand how to prove Pythagoras theorem. The step involving similar triangles is confusing.",
    time: "20 mins ago", status: "open", priority: "high"
  },
  {
    id: "req_002", student_id: "stu_104", studentName: "Priya Sharma",
    subject: "Science", topic: "Chemistry",
    question: "Why does the reaction of acid and metal produce hydrogen gas? Can you explain with a real life example?",
    time: "1 hour ago", status: "open", priority: "medium"
  },
  {
    id: "req_003", student_id: "stu_106", studentName: "Ananya Reddy",
    subject: "English", topic: "Grammar",
    question: "I'm confused about when to use 'has been' vs 'have been'. Can you give me some exercises?",
    time: "2 hours ago", status: "open", priority: "low"
  },
  {
    id: "req_004", student_id: "stu_105", studentName: "Deepak Singh",
    subject: "Math", topic: "Algebra",
    question: "How do I solve simultaneous equations? The substitution method is not clear to me.",
    time: "3 hours ago", status: "open", priority: "medium"
  },
  {
    id: "req_005", student_id: "stu_109", studentName: "Arjun Mehta",
    subject: "Science", topic: "Physics",
    question: "Can you explain Newton's 3rd law with real-world examples? The textbook examples aren't helping.",
    time: "5 hours ago", status: "open", priority: "low"
  },
  {
    id: "req_006", student_id: "stu_110", studentName: "Kavya Nair",
    subject: "Math", topic: "Statistics",
    question: "What's the difference between mean, median and mode? When do we use which one?",
    time: "Yesterday", status: "open", priority: "medium"
  }
];

export const mockAssignments = [
  {
    id: "asgn_001", title: "Quadratic Equations Practice",
    subject: "Math", description: "Complete 15 problems on quadratic equations",
    dueDate: "2026-04-02", status: "due", assignedTo: 8, submitted: 3,
    createdAt: "2026-03-28"
  },
  {
    id: "asgn_002", title: "Periodic Table Quiz",
    subject: "Science", description: "Fill in elements for first 20 atomic numbers",
    dueDate: "2026-04-01", status: "due", assignedTo: 12, submitted: 7,
    createdAt: "2026-03-27"
  },
  {
    id: "asgn_003", title: "Essay: My Favourite Season",
    subject: "English", description: "500-word essay on your favourite season with descriptive language",
    dueDate: "2026-03-30", status: "review", assignedTo: 10, submitted: 10,
    createdAt: "2026-03-25"
  },
  {
    id: "asgn_004", title: "Trigonometry Worksheet",
    subject: "Math", description: "Solve sin/cos/tan problems for right triangles",
    dueDate: "2026-04-05", status: "due", assignedTo: 8, submitted: 1,
    createdAt: "2026-03-29"
  },
  {
    id: "asgn_005", title: "Hindi Poem Recitation",
    subject: "Hindi", description: "Record and submit recitation of 'Madhushala' excerpt",
    dueDate: "2026-03-28", status: "done", assignedTo: 6, submitted: 6,
    createdAt: "2026-03-22"
  },
  {
    id: "asgn_006", title: "Light & Reflection Lab",
    subject: "Science", description: "Diagram and explain plane mirror reflections",
    dueDate: "2026-04-03", status: "due", assignedTo: 12, submitted: 0,
    createdAt: "2026-03-30"
  },
  {
    id: "asgn_007", title: "Comprehension Passage",
    subject: "English", description: "Read passage and answer 10 questions",
    dueDate: "2026-03-26", status: "done", assignedTo: 10, submitted: 9,
    createdAt: "2026-03-20"
  },
  {
    id: "asgn_008", title: "Number Systems Review",
    subject: "Math", description: "Practice rational and irrational numbers classification",
    dueDate: "2026-03-29", status: "review", assignedTo: 8, submitted: 8,
    createdAt: "2026-03-24"
  }
];

export const mockAnalytics = {
  totalStudents: 45,
  activeStudents: 32,
  activeToday: 32,
  atRisk: 5,
  avgScore: 72,
  avgXp: 1850,
  totalStudentsTrend: +8,
  activeStudentsTrend: +12,
  avgScoreTrend: +5,
  atRiskTrend: -2,
  sparklines: {
    totalStudents: [30, 32, 35, 38, 40, 42, 45],
    activeStudents: [20, 22, 25, 28, 26, 30, 32],
    avgScore: [60, 62, 65, 68, 70, 71, 72],
    atRisk: [9, 8, 7, 7, 6, 6, 5]
  },
  performanceOverTime: [
    { name: 'Week 1', xp: 4000, active: 30 },
    { name: 'Week 2', xp: 5500, active: 35 },
    { name: 'Week 3', xp: 4800, active: 32 },
    { name: 'Week 4', xp: 6200, active: 38 },
  ],
  subjectBreakdown: [
    { name: 'Math', value: 45 },
    { name: 'Science', value: 35 },
    { name: 'English', value: 20 },
    { name: 'Hindi', value: 15 },
  ]
};

// API Wrapper Simulation
export const mentorAPI = {
  getStudents: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockStudents), MOCK_DELAY));
  },
  getRequests: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockRequests), MOCK_DELAY));
  },
  getAssignments: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAssignments), MOCK_DELAY));
  },
  getAnalytics: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAnalytics), MOCK_DELAY));
  },
  acceptRequest: async (id) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, id }), 400));
  },
  rejectRequest: async (id) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, id }), 400));
  },
  createAssignment: async (assignment) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, ...assignment, id: 'asgn_' + Date.now() }), 400));
  }
};

export const requestMentorHelp = async () => {
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 400));
};
