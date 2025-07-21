// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/admin/Login';
import StudentLogin from './pages/StudentLogin';
import InstitutionLogin from './pages/institution/InstitutionLogin';

// Protected route wrapper
import ProtectedRoute from './components/ProtectedRoute';

// Institution dashboard layout and pages
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import ManageStaff from './pages/institution/ManageStaff';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />

        {/* Institution Dashboard with Nested Routes */}
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute role="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="staff" element={<ManageStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
