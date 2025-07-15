// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Landing from './pages/Landing';
import Login from './pages/admin/Login';
import StudentLogin from './pages/StudentLogin';
import InstitutionLogin from './pages/institution/InstitutionLogin';

import ProtectedRoute from './components/ProtectedRoute';
// import InstitutionProtectedRoute from './components/InstitutionProtectedRoute';
import CollegeLanding from './CollegeLanding';

import DashboardLayout from './layouts/DashboardLayout';
import StudentList from './pages/StudentList';
import StudentComponents from './pages/admin/StudentComponents';
import StudentView from './pages/admin/StudentView';
import AttendanceManager from './pages/admin/AttendanceManager';
import MonthlyAttendanceSummary from './pages/admin/MonthlyAttendanceSummary';
import AttendanceAnalytics from './pages/admin/AttendanceAnalytics';
import StudentProfile from './pages/StudentProfile';

import InstitutionDashboard from './pages/institution/InstitutionDashboard';
// import InstitutionOverview from './pages/institution/InstitutionOverview';
// import ManageStudents from './pages/institution/ManageStudents';
// import ManageStaff from './pages/institution/ManageStaff';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* <Route path="/" element={<CollegeLanding />} /> */}
        {/* ✅ Public Routes */}
         <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <StudentList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/students-components"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout>
                <StudentComponents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
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

        
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        /> */}

       <Route
  path="/institution-dashboard"
  element={
    <ProtectedRoute role="institution">
      <InstitutionDashboard />
    </ProtectedRoute>
  }
/>
          {/* <Route index element={<InstitutionOverview />} /> */}
          {/* <Route path="students" element={<ManageStudents />} />
          <Route path="staff" element={<ManageStaff />} />
          <Route path="analytics" element={<div>Analytics coming soon...</div>} /> */}
        {/* </Route> */}

        {/* ✅ Fallback */}
        {/* <Route path="*" element={<Landing />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
