// src/pages/institution/InstitutionOverview.jsx
import React from 'react';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaBullseye,
  FaCalendarAlt,
  FaTrophy,
  FaHistory,
  FaPlus,
  FaChartPie,
  FaBook,
  FaClipboardList,
  FaUsersCog,
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function InstitutionOverview() {
  const stats = [
    { icon: <FaUserGraduate />, label: 'Total Students', value: 300, color: 'bg-red-100 text-red-600' },
    { icon: <FaChalkboardTeacher />, label: 'Total Faculty', value: 45, color: 'bg-blue-100 text-blue-600' },
    { icon: <FaBuilding />, label: 'Departments', value: 6, color: 'bg-green-100 text-green-600' },
    { icon: <FaBullseye />, label: 'Placement Rate', value: '82%', color: 'bg-purple-100 text-purple-600' },
    { icon: <FaBook />, label: 'Courses Offered', value: 18, color: 'bg-yellow-100 text-yellow-600' },
    { icon: <FaClipboardList />, label: 'Ongoing Exams', value: 3, color: 'bg-indigo-100 text-indigo-600' },
    { icon: <FaUsersCog />, label: 'Clubs & Committees', value: 12, color: 'bg-pink-100 text-pink-600' },
  ];

  const events = [
    { date: 'July 20', title: '🧠 AI Workshop' },
    { date: 'July 22', title: '📢 Final Year Project Submission' },
    { date: 'July 25', title: '📄 Placement Test' },
    { date: 'Aug 01', title: '📅 Mid-Sem Exams Begin' },
    { date: 'Aug 10', title: '🎓 Freshers Orientation' },
    { date: 'Aug 15', title: '🇮🇳 Independence Day Celebration' },
  ];

  const barData = {
    labels: ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'],
    datasets: [
      {
        label: 'Students',
        data: [80, 50, 40, 30, 20, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const pieData = {
    labels: ['Placed', 'Unplaced'],
    datasets: [
      {
        data: [82, 18],
        backgroundColor: ['#10b981', '#ef4444']
      }
    ]
  };

  const logs = [
    '📝 Admin added 5 students',
    '📎 Placement cell uploaded job drive info',
    '🔄 Faculty updated student marks',
    '📬 Circular issued: Holiday on August 15',
    '✅ NAAC audit completed successfully',
    '📤 Uploaded mid-sem exam timetable',
  ];

  const achievements = [
    '90% placement in CSE department',
    '5 papers published in international journals',
    'College received NAAC A+ grade',
    'Student won National Hackathon 2025',
    'Inaugurated new Robotics Lab'
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between">
  <div>
    <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to the Institution Dashboard 🎓</h1>
    <p className="text-sm md:text-base text-gray-100 max-w-xl">
      Stay up to date with student stats, events, achievements, and campus insights all in one place.
    </p>
  </div>
  {/* <div className="mt-4 md:mt-0">
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/college-management-4855397-4048587.png"
      alt="Institution"
      className="w-32 md:w-40"
    />
  </div> */}
</div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 shadow-md flex items-center gap-4 ${s.color}`}
          >
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="text-sm font-semibold">{s.label}</div>
              <div className="text-xl font-bold">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Events */}
      <div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaCalendarAlt /> Upcoming Events & Announcements
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((e, i) => (
            <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 border-red-400">
              <div className="text-sm text-gray-600 dark:text-gray-400">{e.date}</div>
              <div className="font-semibold">{e.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h2 className="font-semibold mb-2">Department-wise Student Count</h2>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h2 className="font-semibold mb-2">Placement Overview</h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaTrophy /> Achievements & Highlights
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          {achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      {/* Activity Log */}
      <div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaHistory /> Recent Activity
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
