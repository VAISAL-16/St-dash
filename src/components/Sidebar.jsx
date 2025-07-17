// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaChartBar } from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Students', icon: <FaUserGraduate /> },
    { path: '/attendance', label: 'Attendance', icon: <FaClipboardList /> },
    { path: '/attendance-analytics', label: 'Analytics', icon: <FaChartBar /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow-lg z-50 flex flex-col p-4 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 dark:text-white text-gray-900">📚 Dashboard</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 p-2 rounded transition-colors duration-200
                ${isActive
                  ? 'bg-gray-200 dark:bg-gray-800 font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
              `}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
