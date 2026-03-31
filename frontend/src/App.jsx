import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import DashboardLayout from './components/Layout/DashboardLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Landing from './pages/Landing';

// Student Pages
import StudentDashboard from './pages/Student/Dashboard';
import StudentMissions from './pages/Student/Missions';
import StudentProgress from './pages/Student/ProgressTracking';
import StudentStreak from './pages/Student/Streak';
import StudentLeaderboard from './pages/Student/GradeRanking';
import StudentMentor from './pages/Student/Mentor';
import StudentAIHelp from './pages/Student/AIAssistance';
import StudentProfile from './pages/Student/Profile';

// Mentor Pages
import MentorDashboard from './pages/Mentor/Dashboard';
import MentorStudents from './pages/Mentor/Students';
import MentorRequests from './pages/Mentor/Requests';
import MentorAssignments from './pages/Mentor/Assignments';
import MentorStudentProfile from './pages/Mentor/StudentProfile';
import MentorAnalytics from './pages/Mentor/Analytics';
import { Chat as MentorChat, History as MentorHistory, Settings as MentorSettings } from './pages/Mentor/Settings';

// Admin Pages
import NGODashboard from './pages/Admin/NGODashboard';
import AdminMentors from './pages/Admin/Mentors';
import AdminStudents from './pages/Admin/Students';
import AdminAnalytics from './pages/Admin/Analytics';
import AdminReports from './pages/Admin/Reports';
import AdminRequests from './pages/Admin/Requests';
import AdminSettings from './pages/Admin/Settings';

const getDashboardPathByRole = (role) => {
  switch (role) {
    case 'STUDENT': return '/student/dashboard';
    case 'MENTOR': return '/mentor/dashboard';
    case 'ADMIN': return '/admin/dashboard';
    default: return '/login';
  }
};

const FullPageLoader = () => (
  <div className="flex-center" style={{ height: '100vh' }}>
    <div className="spinner"></div>
  </div>
);

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPathByRole(user.role)} replace />;
  }
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <FullPageLoader />;
  if (user) return <Navigate to={getDashboardPathByRole(user.role)} replace />;
  return children;
};

const StudentRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['STUDENT']}>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

const MentorRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['MENTOR']}>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

const AdminRoute = ({ children }) => (
  <ProtectedRoute allowedRoles={['ADMIN']}>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoute>
);

function App() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <FullPageLoader />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? getDashboardPathByRole(user.role) : '/login'} replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />

      {/* ── Student Routes ── */}
      <Route path="/student/dashboard"   element={<StudentRoute><StudentDashboard /></StudentRoute>} />
      <Route path="/student/missions"    element={<StudentRoute><StudentMissions /></StudentRoute>} />
      <Route path="/student/progress"    element={<StudentRoute><StudentProgress /></StudentRoute>} />
      <Route path="/student/streak"      element={<StudentRoute><StudentStreak /></StudentRoute>} />
      <Route path="/student/leaderboard" element={<StudentRoute><StudentLeaderboard /></StudentRoute>} />
      <Route path="/student/mentor"      element={<StudentRoute><StudentMentor /></StudentRoute>} />
      <Route path="/student/ai-help"     element={<StudentRoute><StudentAIHelp /></StudentRoute>} />
      <Route path="/student/profile"     element={<StudentRoute><StudentProfile /></StudentRoute>} />

      {/* ── Mentor Routes ── */}
      <Route path="/mentor/dashboard"    element={<MentorRoute><MentorDashboard /></MentorRoute>} />
      <Route path="/mentor/students"     element={<MentorRoute><MentorStudents /></MentorRoute>} />
      <Route path="/mentor/students/:id" element={<MentorRoute><MentorStudentProfile /></MentorRoute>} />
      <Route path="/mentor/assignments"  element={<MentorRoute><MentorAssignments /></MentorRoute>} />
      <Route path="/mentor/requests"     element={<MentorRoute><MentorRequests /></MentorRoute>} />
      <Route path="/mentor/analytics"    element={<MentorRoute><MentorAnalytics /></MentorRoute>} />
      <Route path="/mentor/chat"         element={<MentorRoute><MentorChat /></MentorRoute>} />
      <Route path="/mentor/history"      element={<MentorRoute><MentorHistory /></MentorRoute>} />
      <Route path="/mentor/settings"     element={<MentorRoute><MentorSettings /></MentorRoute>} />

      {/* ── Admin Routes ── */}
      <Route path="/admin/dashboard" element={<AdminRoute><NGODashboard /></AdminRoute>} />
      <Route path="/admin/ngo"       element={<ProtectedRoute allowedRoles={['ADMIN']}><Navigate to="/admin/dashboard" replace /></ProtectedRoute>} />
      <Route path="/admin/mentors"   element={<AdminRoute><AdminMentors /></AdminRoute>} />
      <Route path="/admin/students"  element={<AdminRoute><AdminStudents /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
      <Route path="/admin/reports"   element={<AdminRoute><AdminReports /></AdminRoute>} />
      <Route path="/admin/requests"  element={<AdminRoute><AdminRequests /></AdminRoute>} />
      <Route path="/admin/settings"  element={<AdminRoute><AdminSettings /></AdminRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
