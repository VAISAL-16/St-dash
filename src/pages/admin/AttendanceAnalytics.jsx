import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AttendanceAnalytics() {
  const [students, setStudents] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);

    // Detect theme
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const labels = students.map(s => s.name);
  const presentData = students.map(s => {
    const records = s.records || {};
    return Object.values(records).filter(val => val === true).length;
  });

  const absentData = students.map(s => {
    const records = s.records || {};
    return Object.values(records).filter(val => val === false).length;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Present Days',
        data: presentData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // green
      },
      {
        label: 'Absent Days',
        data: absentData,
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#fff' : '#000',
        },
        position: 'bottom',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? '#555' : '#ccc',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#fff' : '#000',
        },
        grid: {
          color: isDark ? '#555' : '#ccc',
        },
      },
    },
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Attendance Analytics</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-4xl mx-auto">
        <Bar data={data} options={options} />
      </div>

      <div className="pt-5 mb-6 text-center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
