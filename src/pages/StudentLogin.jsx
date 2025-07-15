import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserGraduate } from 'react-icons/fa';

export default function StudentLogin() {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const students = JSON.parse(localStorage.getItem('students')) || [];

  const handleLogin = (e) => {
    e.preventDefault();
    const found = students.find((s) => s.roll === roll && s.password === password);

    if (found) {
      localStorage.setItem('studentLoggedIn', 'true');
      localStorage.setItem('loggedInRoll', found.roll);
      navigate('/student-profile');
    } else {
      setError('Invalid roll number or password');
      setInfo('');
    }
  };

  const handleForgotPassword = () => {
    const student = students.find((s) => s.roll === roll);
    if (!roll) {
      setInfo('Please enter your Roll Number first.');
    } else if (!student) {
      setInfo('No student found with this Roll Number.');
    } else {
      setInfo(`A password reset link has been sent to your registered email.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-xl px-10 py-8 w-full max-w-md transition-all duration-300"
      >
        <div className="flex flex-col items-center mb-6">
          <FaUserGraduate className="text-green-600 text-5xl mb-2 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-700 animate-pulse">Student Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to view your profile</p>
        </div>

        <input
          type="text"
          placeholder="Roll Number"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <div className="relative mb-2">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 text-sm text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-green-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {info && <p className="text-green-700 text-sm mb-2">{info}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
