// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const allowedAdmins = [
  { username: 'vaisal', password: '1612' },
  { username: 'tsewang', password: '337' }
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = allowedAdmins.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      localStorage.setItem('adminLoggedIn', 'true');
      setLoading(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <FiUser className="text-blue-600 text-5xl mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold text-blue-700">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {loading ? (
          <div className="text-center text-blue-600 font-medium py-4">
            Logging in...
            <div className="mt-3 w-6 h-6 mx-auto border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative mb-4">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </>
        )}

        {/* 🔙 Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          type="button"
          className="mt-6 w-full border border-blue-400 text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-lg transition"
        >
          ⬅ Back to Landing
        </motion.button>
      </form>
    </div>
  );
}
