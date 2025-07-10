import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

const allowedAdmins = [
  { username: 'vaisal', password: '1612' },
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = allowedAdmins.some(
      (user) => user.username === username && user.password === password
    );

    if (isValid) {
      setLoading(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      setError('Invalid username or password. Try Again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className={`bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-md transition-all duration-300 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <FiUser className="text-blue-600 text-5xl mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold text-blue-700 animate-pulse">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Login Form */}
        {loading ? (
          <div className="text-center text-blue-600 font-medium text-lg py-4">
            Logging in...
            <div className="mt-3 w-6 h-6 mx-auto border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
}
