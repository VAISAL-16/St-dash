// src/pages/StudentList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function StudentList() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0]?.toUpperCase())
      .join('');

  const initials = getInitials(adminName);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">        
        {/* 🔥 Header */}
        <div className="sticky top-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="text-3xl"
            >
              🎓
            </motion.span>
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300">
              <Typewriter
                words={['Welcome to Student Dashboard']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </h1>
          </div>

          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.success('Logged out!');
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminName');
                window.location.replace('/');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </motion.button>
          </div>
        </div>
      {/* 🧑‍🎓 Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 text-white p-6 rounded-xl flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
            <div>
              <p className="text-sm text-gray-300">Welcome back,</p>
              <p className="text-lg font-semibold">{adminName.toUpperCase()}</p>
            </div>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-xl text-center">
            <h2 className="text-xl font-semibold mb-2">Attendance Manager</h2>
            <p className="mb-2">Mark & view daily attendance.</p>
            <button onClick={() => navigate('/attendance')} className="text-blue-400 hover:underline">Go to Attendance</button>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-xl text-center">
            <h2 className="text-xl font-semibold mb-2">Monthly Summary</h2>
            <p className="mb-2">Attendance month overview.</p>
            <button onClick={() => navigate('/attendance-summary')} className="text-blue-400 hover:underline">View Summary</button>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-xl text-center md:col-span-3">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="mb-2">Visual charts of attendance data.</p>
            <button onClick={() => navigate('/attendance-analytics')} className="text-blue-400 hover:underline">View Analytics</button>
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-xl text-center md:col-span-3">
            <h2 className="text-xl font-semibold mb-2">Student Management</h2>
            <p className="mb-2">Add, edit, delete student records.</p>
            <button onClick={() => navigate('/students-components')} className="text-blue-400 hover:underline">Manage Students</button>
          </div>
        </div>
      </div>
    </div>
  );
}
