// src/pages/StudentLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserGraduate } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function StudentLogin() {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [rateLimit, setRateLimit] = useState(false);
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

  const handleSendOtp = async () => {
    const student = students.find((s) => s.roll === roll);

    if (!roll) return setInfo('Please enter Roll Number first.');
    if (!student) return setError('Student not found.');
    if (!email) return setError('Please enter your email.');
    if (student.email !== email) return setError('Email does not match.');

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Save OTP data to localStorage
    localStorage.setItem('resetOtp', otpCode);
    localStorage.setItem('resetRoll', roll);
    localStorage.setItem('resetEmail', email);
    localStorage.setItem('otpExpiry', expiry.toString());

    const templateParams = {
      email: student.email,
      otp: `<b>${otpCode}</b>`,
      roll: student.roll,
    };

    try {
      await emailjs.send(
        'service_k27z0kq',
        'template_w186l7r',
        templateParams,
        'l7UCg_Uu2vDgrUG6x'
      );
      toast.success('OTP sent to your email.');
      setRateLimit(true);
      setTimeout(() => setRateLimit(false), 60000);
      navigate('/verify-otp');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send OTP.');
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

        {!showEmailInput && (
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
        )}

        {showEmailInput && (
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full mb-4 px-4 py-2 border border-blue-300 rounded-lg bg-blue-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {!showEmailInput ? (
          <div className="mb-4 text-sm text-right">
            <button
              type="button"
              onClick={() => setShowEmailInput(true)}
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        ) : (
          <div className="mb-4 text-sm text-right">
            <button
              type="button"
              onClick={handleSendOtp}
              className={`text-green-700 hover:underline font-semibold ${rateLimit && 'opacity-50 pointer-events-none'}`}
              disabled={rateLimit}
            >
              {rateLimit ? 'Please wait 60s...' : 'Send OTP'}
            </button>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {info && <p className="text-green-700 text-sm mb-2">{info}</p>}

        {!showEmailInput && (
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          type="button"
          className="mt-6 w-full border border-green-400 text-green-600 hover:bg-green-50 font-medium py-2 rounded-lg transition"
        >
          ⬅ Back to Landing
        </motion.button>
      </form>
    </div>
  );
}
