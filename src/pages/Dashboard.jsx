import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700">Welcome Admin 🎓</h1>
      <p className="mt-2 text-gray-600">You are now inside the Student Dashboard.</p>

      <button
        onClick={() => {
          localStorage.removeItem('adminLoggedIn');
          window.location.href = '/login';
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
