import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Landing from './pages/Landing';
import StudentDashboard from './pages/Student/Dashboard';
import MentorDashboard from './pages/Mentor/Dashboard';
import MentorStudents from './pages/Mentor/Students';
import MentorRequests from './pages/Mentor/Requests';
import MentorAssignments from './pages/Mentor/Assignments';
import MentorStudentProfile from './pages/Mentor/StudentProfile';
import MentorAnalytics from './pages/Mentor/Analytics';
import { Chat as MentorChat, History as MentorHistory, Settings as MentorSettings } from './pages/Mentor/Settings';
import NGODashboard from './pages/Admin/NGODashboard';

const getDashboardPathByRole = (role) => {
  switch (role) {
    case 'STUDENT':
      return '/student/dashboard';
    case 'MENTOR':
      return '/mentor/dashboard';
    case 'ADMIN':
      return '/admin/ngo';
    default:
      return '/login';
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

  if (user) {
    return <Navigate to={getDashboardPathByRole(user.role)} replace />;
  }

  return children;
};


function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? getDashboardPathByRole(user.role) : '/login'} replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute allowedRoles={['STUDENT']}>
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Mentor Routes */}
      <Route path="/mentor/dashboard" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/students" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorStudents />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/students/:id" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorStudentProfile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/assignments" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorAssignments />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/requests" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorRequests />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/analytics" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorAnalytics />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/chat" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorChat />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/history" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorHistory />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/mentor/settings" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <DashboardLayout>
            <MentorSettings />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/ngo" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <DashboardLayout>
            <NGODashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
