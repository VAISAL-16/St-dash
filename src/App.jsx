import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Pages
// Public pages
// import Landing from './pages/Landing';
import Login from './pages/admin/Login';
import StudentLogin from './pages/StudentLogin';
import InstitutionLogin from './pages/institution/InstitutionLogin';
import VerifyOtp from './pages/VerifyOtp';

// Public Pages
import Landing from './pages/Landing';
import StudentDirectory from "./pages/admin/StudentDirectory";

// Admin Dashboard Layout + Pages
import DashboardLayout from './layouts/DashboardLayout';
import StudentList from './pages/StudentList';
import StudentComponents from './pages/admin/StudentComponents';
import StudentView from './pages/admin/StudentView';
import AttendanceManager from './pages/admin/AttendanceManager';
import MonthlyAttendanceSummary from './pages/admin/MonthlyAttendanceSummary';
import AttendanceAnalytics from './pages/admin/AttendanceAnalytics';

// Student Pages
import StudentProfile from './pages/StudentProfile';

// Institution Dashboard Layout + Pages
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import InstitutionOverview from './pages/institution/InstitutionOverview';

// Route Guard
import ProtectedRoute from './components/ProtectedRoute';
// Protected route wrapper
// import ProtectedRoute from './components/ProtectedRoute';

// Institution dashboard layout and pages
// import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import ManageStaff from './pages/institution/ManageStaff';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>

        {/* ✅ Public Routes */}
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ✅ Admin Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <StudentList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* Institution Dashboard with Nested Routes */}
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute role="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/student-directory" element={<StudentDirectory />} />
        <Route
          path="/student-view"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <StudentView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AttendanceManager />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-summary"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <MonthlyAttendanceSummary />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-analytics"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <AttendanceAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ Student Route */}
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />

        {/* ✅ Institution Dashboard with nested pages */}
        <Route
          path="/institution-dashboard"
          element={
            <ProtectedRoute role="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        >
          {/* ⬇️ Default overview page for sidebar */}
          <Route index element={<InstitutionOverview />} />
          <Route path="staff" element={<ManageStaff />} />
        </Route>

        {/* ❌ Optional fallback */}
        {/* <Route path="*" element={<Landing />} /> */}
        
          
        {/* </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
