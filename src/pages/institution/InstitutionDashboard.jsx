// src/pages/InstitutionDashboard.jsx
import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartPie,
  FaSignOutAlt,
  FaHome,
  FaPlus,
  FaEye,
  FaTrash,
} from 'react-icons/fa';

export default function InstitutionDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    students: false,
    staff: false,
  });

  const handleLogout = () => {
    localStorage.removeItem('institutionLoggedIn');
    navigate('/institution-login');
  };

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 p-6 space-y-6 shadow-xl">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Institution Panel
        </h1>

        <nav className="flex flex-col gap-3">
          {/* Overview */}
          <button
            onClick={() => navigate('/institution-dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200"
          >
            <FaHome /> Overview
          </button>

          {/* Students Section */}
          <div>
            <button
              onClick={() => toggleSection('students')}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200"
            >
              <span className="flex items-center gap-2">
                <FaUserGraduate /> Manage Students
              </span>
              <span>{expanded.students ? '▴' : '▾'}</span>
            </button>
            {expanded.students && (
              <div className="ml-8 mt-2 space-y-2 text-sm">
                <button
                  onClick={() => navigate('/institution-dashboard/students/view')}
                  className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900 ${
                    location.pathname.includes('/students/view') ? 'font-bold' : ''
                  }`}
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => navigate('/institution-dashboard/students/add')}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <FaPlus /> Add
                </button>
                <button
                  onClick={() => navigate('/institution-dashboard/students/delete')}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Staff Section */}
          <div>
            <button
              onClick={() => toggleSection('staff')}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200"
            >
              <span className="flex items-center gap-2">
                <FaChalkboardTeacher /> Manage Staff
              </span>
              <span>{expanded.staff ? '▴' : '▾'}</span>
            </button>
            {expanded.staff && (
              <div className="ml-8 mt-2 space-y-2 text-sm">
                <button
                  onClick={() => navigate('/institution-dashboard/staff/view')}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => navigate('/institution-dashboard/staff/add')}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <FaPlus /> Add
                </button>
                <button
                  onClick={() => navigate('/institution-dashboard/staff/delete')}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Analytics */}
          {/* Analytics Section */}
<div>
  <button
    onClick={() => toggleSection('analytics')}
    className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200"
  >
    <span className="flex items-center gap-2">
      <FaChartPie /> Analytics
    </span>
    <span>{expanded.analytics ? '▴' : '▾'}</span>
  </button>
  {expanded.analytics && (
    <div className="ml-8 mt-2 space-y-2 text-sm">
      <button
        onClick={() => navigate('/institution-dashboard/analytics/department')}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
      >
        📊 Department-wise
      </button>
      <button
        onClick={() => navigate('/institution-dashboard/analytics/placement')}
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
      >
        🎯 Placement
      </button>
    </div>
  )}
</div>


          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 mt-6 border-t border-gray-300 pt-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
