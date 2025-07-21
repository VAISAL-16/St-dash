import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function VerifyOTP() {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState('verify');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const storedOtp = localStorage.getItem('resetOtp');
  const storedRoll = localStorage.getItem('resetRoll');
  const storedEmail = localStorage.getItem('resetEmail');
  const expiry = localStorage.getItem('otpExpiry');

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (expiry) {
        const timeRemaining = Math.floor((parseInt(expiry) - now) / 1000);
        if (timeRemaining <= 0) {
          setTimeLeft(0);
          setCanResend(true);
          clearInterval(interval);
        } else {
          setTimeLeft(timeRemaining);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const updated = pastedData.split('');
      setOtpDigits(updated);
      updated.forEach((d, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = d;
        }
      });
      inputsRef.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const now = Date.now();
    const enteredOtp = otpDigits.join('');
    if (!storedOtp || !storedRoll || !expiry) return setError('OTP session expired. Try again.');
    if (now > parseInt(expiry)) return setError('OTP expired. Please request again.');
    if (enteredOtp !== storedOtp) return setError('Invalid OTP');
    setStep('reset');
    setError('');
  };

  const handleResetPassword = () => {
    if (newPass !== confirmPass) {
      toast.error('Passwords do not match');
      return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = students.map((s) =>
      s.roll === storedRoll ? { ...s, password: newPass } : s
    );
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    localStorage.removeItem('resetOtp');
    localStorage.removeItem('resetRoll');
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('otpExpiry');
    toast.success('Password reset successful 🎉');
    setTimeout(() => navigate('/student-login'), 1500);
  };

  const handleResend = () => {
    if (!storedEmail || !storedRoll) {
      toast.error('Missing info for OTP resend');
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpiry = Date.now() + 5 * 60 * 1000;

    localStorage.setItem('resetOtp', newOtp);
    localStorage.setItem('otpExpiry', newExpiry.toString());

    // EmailJS or mock sending logic here (use your own EmailJS API)
    toast.success(`OTP resent to ${storedEmail}`);
    setOtpDigits(['', '', '', '', '', '']);
    setCanResend(false);
    setTimeLeft(300); // 5 minutes
  };
  const formatTime = (seconds) => {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <FaLock className="text-green-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-1">
          {step === 'verify' ? 'OTP Verification' : 'Reset Password'}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {step === 'verify' ? 'Enter the 6-digit code sent to your email' : 'Set your new password'}
        </p>

        {step === 'verify' ? (
          <>
            <div className="flex justify-center gap-2 mb-3">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleBackspace(idx, e)}
                  onPaste={handlePaste}
                  className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              ))}
            </div>

            {timeLeft > 0 && (
             <p className="text-sm text-gray-500 mb-4">
  OTP expires in: <span className="font-medium text-green-700">{formatTime(timeLeft)}</span>
</p>
            )}

            <button
              onClick={handleVerify}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Verify OTP
            </button>

            {canResend && (
              <button
                onClick={handleResend}
                className="mt-4 text-green-700 hover:underline font-medium"
              >
                Resend OTP
              </button>
            )}
          </>
        ) : (
          <>
            <div className="relative mb-4">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative mb-4">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Set New Password
            </button>
          </>
        )}

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

        <button
          onClick={() => navigate('/student-login')}
          className="mt-6 w-full border border-green-500 text-green-600 hover:bg-green-50 font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Back to Login
        </button>
      </motion.div>
    </div>
  );
}
