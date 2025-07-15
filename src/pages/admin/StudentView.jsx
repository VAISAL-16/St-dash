import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function StudentView() {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student;

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-red-500">
        <p className="text-xl">No student data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-xl p-8">

        {/* Profile Image or Default Icon */}
        <div className="flex justify-center mb-6">
          {student.image ? (
            <img
  src={student.image || '/default-avatar.svg'}
  alt="Student"
  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform hover:scale-105 hover:shadow-blue-400"
/>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-blue-500 shadow-md text-5xl text-white">
              👤
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
          Student Profile
        </h1>

        <div className="space-y-2">
          <p><strong>Roll No:</strong> {student.roll}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Department:</strong> {student.department}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-lg mb-2">Academic Records:</h2>
          {student.academics?.length ? (
            <ul className="list-disc ml-6">
              {student.academics.map((record, idx) => (
                <li key={idx}>
                  <span className="font-medium">{record.subject}</span>: {record.grade}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-500">No academic records found.</p>
          )}
        </div>

        <button
          onClick={() => navigate('/students-components')}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          ← Back 
        </button>
      </div>
    </div>
  );
}
