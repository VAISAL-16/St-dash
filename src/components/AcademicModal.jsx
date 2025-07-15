import React, { useState } from 'react';

export default function AcademicModal({ student, onSave, onClose }) {
  const [subjects, setSubjects] = useState(student.academics || []);

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', grade: '' }]);
  };

  const handleChange = (index, key, value) => {
    const updated = [...subjects];
    updated[index][key] = value;
    setSubjects(updated);
  };

  const handleSave = () => {
    onSave(subjects);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-300">
          Add Academic Data - {student.name}
        </h2>

        {subjects.map((entry, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Subject"
              value={entry.subject}
              onChange={(e) => handleChange(index, 'subject', e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={entry.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddSubject}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Subject
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
