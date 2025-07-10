import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function StudentList() {
  const [showForm, setShowForm] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [form, setForm] = useState({ roll: '', name: '', department: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleDelete = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
    toast.success('Student deleted!');
  };

  const handleEdit = (index) => {
    setForm(students[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!form.roll || !form.name || !form.department) return;

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = form;
      setStudents(updated);
      toast.success('Student updated!');
    } else {
      setStudents([...students, form]);
      toast.success('Student added!');
    }

    setForm({ roll: '', name: '', department: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6">

        {/* 🔥 Header */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 flex items-center justify-between sticky top-4 z-50">
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="text-3xl"
            >
              🎓
            </motion.span>
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300">
              <Typewriter
                words={['Welcome to Student Dashboard']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </h1>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toast.success('Logged out!');
                localStorage.removeItem('adminLoggedIn');
                window.location.href = '/';
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* 📋 Main Section */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

          {/* Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setShowForm(true);
                setForm({ roll: '', name: '', department: '' });
                setEditIndex(null);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Add Student
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="Search by Roll No, Name or Department"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md w-full md:w-[350px]"
            />
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 text-sm"
            >
              Clear
            </button>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-auto rounded shadow-md">
            <table className="min-w-full text-sm bg-white dark:bg-gray-800">
              <thead className="bg-blue-100 dark:bg-blue-950 text-left text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="py-3 px-4 border dark:border-gray-700">S.No</th>
                  <th className="py-3 px-4 border dark:border-gray-700">Roll No</th>
                  <th className="py-3 px-4 border dark:border-gray-700">Name</th>
                  <th className="py-3 px-4 border dark:border-gray-700">Department</th>
                  <th className="py-3 px-4 border dark:border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-900 dark:text-gray-100">
                {students
                  .filter((student) => {
                    const query = searchQuery.toLowerCase();
                    const matchSearch =
                      student.roll.toLowerCase().includes(query) ||
                      student.name.toLowerCase().includes(query) ||
                      student.department.toLowerCase().includes(query);
                    const matchDept =
                      selectedDept === 'All' || student.department === selectedDept;
                    return matchSearch && matchDept;
                  })
                  .map((student, i) => (
                    <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                      <td className="py-2 px-4 border dark:border-gray-700">{i + 1}</td>
                      <td className="py-2 px-4 border dark:border-gray-700">{student.roll}</td>
                      <td className="py-2 px-4 border dark:border-gray-700">{student.name}</td>
                      <td className="py-2 px-4 border dark:border-gray-700">{student.department}</td>
                      <td className="py-2 px-4 border dark:border-gray-700">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(i)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(i)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
                {editIndex !== null ? 'Edit Student' : 'Add New Student'}
              </h2>
              <form onSubmit={handleAddOrUpdate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Roll No"
                  value={form.roll}
                  onChange={(e) => setForm({ ...form, roll: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                />
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {editIndex !== null ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditIndex(null);
                    }}
                    className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
