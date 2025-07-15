// src/layouts/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      <main className="ml-64 w-full p-6">{children}</main>
    </div>
  );
}
