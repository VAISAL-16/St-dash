// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThemeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const dark = savedTheme === 'dark';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full transition-all duration-300 shadow-md ${className}`}
      title="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-yellow-400" size={18} />
      ) : (
        <FaMoon className="text-gray-800" size={18} />
      )}
    </motion.button>
  );
}
