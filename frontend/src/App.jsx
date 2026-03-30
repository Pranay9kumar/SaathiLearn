import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Sidebar } from './components/Layout/Sidebar';

// Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Landing from './pages/Landing';
import StudentDashboard from './pages/Student/Dashboard';
import MentorDashboard from './pages/Mentor/Dashboard';
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

const DashboardLayout = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content animate-fade-in">
      {children}
    </main>
  </div>
);

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
            <div>Students view coming soon...</div>
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
