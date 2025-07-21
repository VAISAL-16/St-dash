// src/pages/InstitutionLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const allowedInstitutions = [
  { username: 'c', password: '00' },
  { username: 'surya', password: '123' },
  { username: 'department456', password: 'inst456' }
];

export default function InstitutionLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = allowedInstitutions.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      setError('');
      localStorage.setItem('institutionLoggedIn', 'true');
      setLoading(true);
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/institution-dashboard'); // ✅ Redirects to sidebar + overview
      }, 1500);
    } else {
      toast.error('Invalid institution credentials.');
    }
  };

  const handleForgotPassword = () => {
    alert('Please contact the admin to reset your Institution login credentials.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-6">
          <FiUser className="text-red-600 text-5xl mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold text-red-700">Institution Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access reports & overviews
          </p>
        </div>

        {loading ? (
          <div className="text-center text-red-600 font-medium py-4">
            Logging in...
            <div className="mt-3 w-6 h-6 mx-auto border-4 border-red-300 border-t-red-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              required
            />

            <div className="relative mb-4">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-4 text-sm text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-red-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
            >
              Login
            </button>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          type="button"
          className="mt-6 w-full border border-red-400 text-red-600 hover:bg-red-50 font-medium py-2 rounded-lg transition"
        >
          ⬅ Back to Landing
        </motion.button>
      </form>
    </div>
  );
}
