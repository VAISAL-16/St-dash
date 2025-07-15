// src/pages/CollegeLanding.jsx
import React from 'react';
import {
  FaCalendarAlt,
  FaTrophy,
  FaUniversity,
  FaSignOutAlt,
  FaHome,
  FaBullhorn,
  FaBuilding,
  FaStar,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CollegeLanding() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('institutionLoggedIn');
    navigate('/institution-login');
  };

  const events = [
    { title: 'TechFest 2025', date: 'Aug 20, 2025' },
    { title: 'Alumni Meet', date: 'Sep 15, 2025' },
    { title: 'Placement Drive', date: 'Oct 10, 2025' },
  ];

  const achievements = [
    'Ranked #2 in State-level Engineering Colleges (2024)',
    '200+ students placed in MNCs in 2024',
    'ISO 9001:2015 Certified Institution',
    'Winner of Smart India Hackathon (SIH) 2023',
  ];

  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Electronics & Communication',
    'Civil Engineering',
    'AI & Data Science',
  ];

  const notices = [
    'Admissions open for 2025-26 batch.',
    'Final year project reviews begin on August 10.',
    'Hostel applications deadline: July 25, 2025.',
  ];

  const stats = [
    { label: 'Students', value: '3200+' },
    { label: 'Staff', value: '200+' },
    { label: 'Departments', value: '10+' },
    { label: 'Placements 2024', value: '85%' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 space-y-6 shadow-xl">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Institution Panel
        </h1>

        <nav className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/institution-dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-700 dark:text-gray-200"
          >
            <FaHome /> Dashboard
          </button>

          <button
            onClick={() => navigate('/institution-dashboard/college')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
          >
            <FaUniversity /> College Info
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 mt-6 border-t border-gray-300 pt-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-10 text-gray-800 dark:text-gray-100 overflow-y-auto">
        {/* About */}
        <section>
          <h2 className="text-3xl font-bold mb-2">🏫 About Our College</h2>
          <p className="text-lg max-w-4xl leading-relaxed">
            XYZ Institute of Technology is a premier engineering institution established in 1998, accredited by NAAC and AICTE.
            We focus on academic excellence, innovation, and skill-based training to prepare students for global opportunities.
          </p>
        </section>

        {/* Vision & Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">🌟 Vision & Mission</h2>
          <p className="mb-2"><strong>Vision:</strong> To be a center of excellence in technical education and innovation.</p>
          <p><strong>Mission:</strong> To empower students through quality education, industry collaboration, and research initiatives.</p>
        </section>

        {/* Quick Stats */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaStar /> Quick Highlights
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Departments */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaBuilding /> Departments
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            {departments.map((dept, index) => (
              <li key={index}>{dept}</li>
            ))}
          </ul>
        </section>

        {/* Events */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaCalendarAlt /> Upcoming Events
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong> – {event.date}
              </li>
            ))}
          </ul>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaTrophy /> Achievements
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            {achievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Notices */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaBullhorn /> Notices & Announcements
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            {notices.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </section>

        {/* Gallery Placeholder */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">📷 Campus Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded">Image 1</div>
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded">Image 2</div>
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded">Image 3</div>
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded">Image 4</div>
          </div>
        </section>
      </main>
    </div>
  );
}
