// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const dark = savedTheme === 'dark';
    setIsDark(dark);
    setHTMLThemeClass(dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    setHTMLThemeClass(newDark);
  };

  const setHTMLThemeClass = (isDarkMode) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`flex items-center gap-2 p-2 rounded-full shadow-md transition-colors duration-300 ${
        isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'
      } ${className}`}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <FaMoon /> : <FaSun />}
      </motion.div>
    </motion.button>
  );
}
