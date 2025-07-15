// src/pages/StudentProfile.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const student = state?.student;

  if (!student) return <div className="text-center mt-10 text-red-500">No data</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-white">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <div className="text-center mb-4">
          {student.image ? (
            <img src={student.image} alt="Student" className="w-24 h-24 rounded-full mx-auto object-cover" />
          ) : (
            <div className="text-6xl">🧑‍🎓</div>
          )}
          <h2 className="text-xl font-semibold mt-2">{student.name}</h2>
        </div>
        <p><strong>Roll No:</strong> {student.roll}</p>
        <p><strong>Department:</strong> {student.department}</p>

        <h3 className="mt-4 font-bold">Academic Records:</h3>
        {student.academics?.length ? (
          <ul className="list-disc ml-5 mt-1">
            {student.academics.map((a, i) => (
              <li key={i}>{a.subject}: {a.grade}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No records found.</p>
        )}

        {student.remarks && (
          <div className="mt-4">
            <h3 className="font-bold">Remarks / Feedback:</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{student.remarks}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/student-login')}
          className="mt-6 w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
