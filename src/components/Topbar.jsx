// src/components/Topbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaComments } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full flex items-center rounded-xl justify-between px-6 py-3 shadow-md bg-gray-200 dark:bg-gray-900 dark:text-white z-50">
      {/* Left: Empty or Logo (optional) */}
      <div />

      {/* Right Side: Icons + Time */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notification Icon */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`relative text-xl p-2 rounded-full transition-all ${
              unreadCount > 0 ? "animate-pulse bg-red-100 dark:bg-red-900" : "bg-gray-100 dark:bg-gray-700"
            }`}
            title="Notifications"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full" />
            )}
          </button>

          {/* 🔽 Notification Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 z-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">Notifications</h2>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto text-sm space-y-2">
                {notifications.length === 0 ? (
                  <li className="text-gray-500 dark:text-gray-400">No notifications</li>
                ) : (
                  notifications.map((n, i) => (
                    <li
                      key={i}
                      className={`p-2 rounded-md ${
                        !n.read ? "bg-blue-50 dark:bg-blue-900" : "bg-transparent"
                      }`}
                    >
                      {n.message}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* 💬 Chat Icon */}
        <button
          className="text-xl p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          title="Open Chat"
          onClick={() => navigate("/chat")}
        >
          <FaComments />
        </button>

        {/* 🌓 Theme Toggle */}
        <ThemeToggle />

        {/* 🕒 Time */}
        <div className="text-sm font-medium">{time}</div>
      </div>
    </header>
  );
}
