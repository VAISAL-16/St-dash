// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-6">
      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-10 text-center"
      >
        Welcome to the Central Access Portal
        <span className="block text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400 mt-2">
          Choose your role to continue
        </span>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Student Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/student-login')}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg cursor-pointer text-center hover:shadow-2xl transition"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-xl font-semibold  text-green-600 dark:text-green-400 mb-2">Student Section</h2>
          <p className="text-gray-600 dark:text-gray-400">View your academic records, grades, and feedback.</p>
        </motion.div>

        {/* Institution Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/institution-login')}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg cursor-pointer text-center hover:shadow-2xl transition"
        >
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Institution Section</h2>
          <p className="text-gray-600 dark:text-gray-400">Access department-level reports, overviews, and analytics.</p>
        </motion.div>

        {/* Admin Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/login')}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg cursor-pointer text-center hover:shadow-2xl transition"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h2 className="text-xl font-semibold  text-blue-700 dark:text-blue-300 mb-2">Admin Section</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage students, academics, feedback, and performance.</p>
        </motion.div>
      </div>
    </div>
  );

}



 