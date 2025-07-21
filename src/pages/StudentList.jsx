// src/pages/StudentList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaGraduationCap,
  FaMoneyBill,
  FaUserGraduate,
  FaBookOpen,
  FaCalendarAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import Topbar from '../components/Topbar'; // Your topbar with time, theme toggle, etc.

export default function StudentList() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0]?.toUpperCase())
      .join('');

  const initials = getInitials(adminName);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-60 bg-gradient-to-b from-purple-500 to-purple-700 text-white flex flex-col p-4 gap-6">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <FaGraduationCap className="text-white text-3xl" />
          <span>Dashboard</span>
        </div>

        <nav className="flex flex-col gap-4 text-sm mt-6">
          <button className="flex items-center gap-3 hover:text-purple-300">
            <FaMoneyBill /> Payment Info
          </button>
          <button className="flex items-center gap-3 hover:text-purple-300">
            <FaUserGraduate /> Registration
          </button>
          <button className="flex items-center gap-3 hover:text-purple-300">
            <FaBookOpen /> Courses
          </button>
          <button className="flex items-center gap-3 hover:text-purple-300">
            <FaCalendarAlt /> Schedule
          </button>
          <button
            className="flex items-center gap-3 hover:text-purple-300 mt-8"
            onClick={() => {
              localStorage.clear();
              navigate('/admin-login');
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <Topbar />

        <div className="px-8 py-6">
          {/* Welcome Header */}
          <div className="bg-purple-600 text-white rounded-2xl p-6 flex justify-between items-center mb-6">
            <div>
              <p className="text-sm">{new Date().toLocaleDateString()}</p>
              <h1 className="text-2xl font-semibold mt-1">
                Welcome back, {adminName.split(' ')[0]}!
              </h1>
              <p className="text-sm opacity-90">
                Always stay updated in your student portal
              </p>
            </div>
            <motion.img
              src="/graduation-boy.png"
              alt="Student"
              className="w-36 h-36 object-contain hidden md:block"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Attendance Manager */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Attendance Manager</h2>
              <p className="text-sm mb-4">Mark & view daily attendance.</p>
              <button
                onClick={() => navigate('/attendance')}
                className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                Go to Attendance
              </button>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Monthly Summary</h2>
              <p className="text-sm mb-4">Attendance month overview.</p>
              <button
                onClick={() => navigate('/attendance-summary')}
                className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                View Summary
              </button>
            </div>

            {/* Student Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Student Management</h2>
              <p className="text-sm mb-4">Add, edit, delete student records.</p>
              <button
                onClick={() => navigate('/students-components')}
                className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
              >
                Manage Students
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
