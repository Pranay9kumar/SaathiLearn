/**
 * Admin API — Mock data layer for NGO/Admin dashboards
 * Completely separate from mentor API
 */

const MOCK_DELAY = 500;

export const mockMentors = [
  {
    id: 'mnt_001', name: 'Rahul Kapoor', email: 'rahul.k@saathi.in',
    studentsAssigned: 12, activeStudents: 10, avgStudentScore: 78,
    status: 'active', joinedDate: '2025-08-12', subject: 'Math',
    resolvedRequests: 34, pendingRequests: 2,
  },
  {
    id: 'mnt_002', name: 'Meena Iyer', email: 'meena.i@saathi.in',
    studentsAssigned: 8, activeStudents: 6, avgStudentScore: 82,
    status: 'active', joinedDate: '2025-09-01', subject: 'Science',
    resolvedRequests: 28, pendingRequests: 1,
  },
  {
    id: 'mnt_003', name: 'Sanjay Tiwari', email: 'sanjay.t@saathi.in',
    studentsAssigned: 15, activeStudents: 9, avgStudentScore: 61,
    status: 'active', joinedDate: '2025-07-20', subject: 'English',
    resolvedRequests: 45, pendingRequests: 5,
  },
  {
    id: 'mnt_004', name: 'Neha Verma', email: 'neha.v@saathi.in',
    studentsAssigned: 10, activeStudents: 10, avgStudentScore: 91,
    status: 'active', joinedDate: '2025-10-15', subject: 'Science',
    resolvedRequests: 52, pendingRequests: 0,
  },
  {
    id: 'mnt_005', name: 'Arun Desai', email: 'arun.d@saathi.in',
    studentsAssigned: 6, activeStudents: 3, avgStudentScore: 48,
    status: 'inactive', joinedDate: '2025-06-10', subject: 'Hindi',
    resolvedRequests: 12, pendingRequests: 4,
  },
];

export const mockAllStudents = [
  { id: 's01', name: 'Priya Sharma', email: 'priya.s@saathi.in', mentor: 'Rahul Kapoor', healthStatus: 'green', avgScore: 86, xpProgress: 92, streak_days: 14, subjects: ['Math', 'Science'], level: 8 },
  { id: 's02', name: 'Deepak Singh', email: 'deepak.s@saathi.in', mentor: 'Rahul Kapoor', healthStatus: 'green', avgScore: 62, xpProgress: 74, streak_days: 5, subjects: ['Math', 'Hindi'], level: 4 },
  { id: 's03', name: 'Vikram Joshi', email: 'vikram.j@saathi.in', mentor: 'Meena Iyer', healthStatus: 'green', avgScore: 79, xpProgress: 85, streak_days: 18, subjects: ['Science', 'Math'], level: 7 },
  { id: 's04', name: 'Kavya Nair', email: 'kavya.n@saathi.in', mentor: 'Meena Iyer', healthStatus: 'yellow', avgScore: 55, xpProgress: 68, streak_days: 3, subjects: ['Math', 'English', 'Science'], level: 4 },
  { id: 's05', name: 'Arjun Mehta', email: 'arjun.m@saathi.in', mentor: 'Sanjay Tiwari', healthStatus: 'yellow', avgScore: 57, xpProgress: 78, streak_days: 9, subjects: ['Science', 'Math'], level: 5 },
  { id: 's06', name: 'Ishita Rao', email: 'ishita.r@saathi.in', mentor: 'Neha Verma', healthStatus: 'red', avgScore: 34, xpProgress: 38, streak_days: 0, subjects: ['Math', 'Science'], level: 2 },
  { id: 's07', name: 'Amit Kumar', email: 'amit.k@saathi.in', mentor: 'Sanjay Tiwari', healthStatus: 'red', avgScore: 38, xpProgress: 18, streak_days: 0, subjects: ['Math', 'English'], level: 1 },
  { id: 's08', name: 'Sneha Patel', email: 'sneha.p@saathi.in', mentor: 'Rahul Kapoor', healthStatus: 'yellow', avgScore: 65, xpProgress: 40, streak_days: 0, subjects: ['English', 'Science'], level: 3 },
  { id: 's09', name: 'Meera Das', email: 'meera.d@saathi.in', mentor: 'Arun Desai', healthStatus: 'red', avgScore: 28, xpProgress: 10, streak_days: 0, subjects: ['English', 'Hindi'], level: 1 },
  { id: 's10', name: 'Rohan Gupta', email: 'rohan.g@saathi.in', mentor: 'Arun Desai', healthStatus: 'yellow', avgScore: 55, xpProgress: 28, streak_days: 0, subjects: ['Hindi', 'Science'], level: 2 },
  { id: 's11', name: 'Ananya Reddy', email: 'ananya.r@saathi.in', mentor: 'Sanjay Tiwari', healthStatus: 'yellow', avgScore: 52, xpProgress: 32, streak_days: 0, subjects: ['Science', 'English'], level: 2 },
  { id: 's12', name: 'Rahul Verma', email: 'rahul.v@saathi.in', mentor: 'Neha Verma', healthStatus: 'green', avgScore: 82, xpProgress: 72, streak_days: 12, subjects: ['Math', 'Science'], level: 5 },
];

export const mockAllRequests = [
  { id: 'rq01', studentName: 'Amit Kumar', mentor: 'Sanjay Tiwari', subject: 'Math', question: 'How to solve quadratic equations with complex roots?', time: '20 min ago', status: 'open', priority: 'high' },
  { id: 'rq02', studentName: 'Ishita Rao', mentor: 'Neha Verma', subject: 'Science', question: 'Why do metals conduct electricity?', time: '1 hr ago', status: 'open', priority: 'high' },
  { id: 'rq03', studentName: 'Kavya Nair', mentor: 'Meena Iyer', subject: 'English', question: 'Difference between active and passive voice?', time: '2 hrs ago', status: 'open', priority: 'medium' },
  { id: 'rq04', studentName: 'Rohan Gupta', mentor: 'Arun Desai', subject: 'Hindi', question: 'How to write formal letters in Hindi?', time: '3 hrs ago', status: 'open', priority: 'low' },
  { id: 'rq05', studentName: 'Deepak Singh', mentor: 'Rahul Kapoor', subject: 'Math', question: 'Explain trigonometric identities with examples.', time: '5 hrs ago', status: 'open', priority: 'medium' },
  { id: 'rq06', studentName: 'Priya Sharma', mentor: 'Rahul Kapoor', subject: 'Science', question: 'How does photosynthesis produce oxygen?', time: 'Yesterday', status: 'resolved', priority: 'low' },
  { id: 'rq07', studentName: 'Vikram Joshi', mentor: 'Meena Iyer', subject: 'Math', question: 'What is the fundamental theorem of arithmetic?', time: 'Yesterday', status: 'resolved', priority: 'medium' },
];

export const mockEngagementTrend = [
  { week: 'Week 1', active: 28, completed: 18 },
  { week: 'Week 2', active: 32, completed: 22 },
  { week: 'Week 3', active: 30, completed: 20 },
  { week: 'Week 4', active: 38, completed: 28 },
  { week: 'Week 5', active: 35, completed: 25 },
  { week: 'Week 6', active: 42, completed: 32 },
];

export const mockCompletionRates = [
  { subject: 'Math', rate: 72 },
  { subject: 'Science', rate: 68 },
  { subject: 'English', rate: 55 },
  { subject: 'Hindi', rate: 48 },
];

// API wrapper simulation
export const adminAPI = {
  getMentors: async () =>
    new Promise(resolve => setTimeout(() => resolve(mockMentors), MOCK_DELAY)),
  getAllStudents: async () =>
    new Promise(resolve => setTimeout(() => resolve(mockAllStudents), MOCK_DELAY)),
  getAllRequests: async () =>
    new Promise(resolve => setTimeout(() => resolve(mockAllRequests), MOCK_DELAY)),
  getEngagementTrend: async () =>
    new Promise(resolve => setTimeout(() => resolve(mockEngagementTrend), MOCK_DELAY)),
  getCompletionRates: async () =>
    new Promise(resolve => setTimeout(() => resolve(mockCompletionRates), MOCK_DELAY)),
};
