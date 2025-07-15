// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaChartBar } from 'react-icons/fa';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Students', icon: <FaUserGraduate /> },
    { path: '/teachers', label: 'Teachers', icon: <FaChalkboardTeacher /> },
    { path: '/attendance', label: 'Attendance', icon: <FaClipboardList /> },
    { path: '/attendance-analytics', label: 'Analytics', icon: <FaChartBar /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg z-50 flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">📚 Dashboard</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${
              location.pathname === path ? 'bg-gray-800 font-semibold' : ''
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
