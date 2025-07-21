import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';

export default function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    photo: null,
    preview: '',
  });

  // Load from localStorage on first render
  useEffect(() => {
    const storedData = localStorage.getItem('staffList');
    if (storedData) {
      setStaffList(JSON.parse(storedData));
    }
  }, []);

  // Save to localStorage whenever staffList changes
  useEffect(() => {
    localStorage.setItem('staffList', JSON.stringify(staffList));
  }, [staffList]);

  const openAddModal = () => {
    setFormData({ name: '', email: '', phone: '', age: '', photo: null, preview: '' });
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    const staff = filteredList[index + (currentPage - 1) * itemsPerPage];
    const realIndex = staffList.findIndex((s) => s.email === staff.email);
    setEditIndex(realIndex);
    setFormData(staff);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const staff = filteredList[index + (currentPage - 1) * itemsPerPage];
    const updated = staffList.filter((s) => s.email !== staff.email);
    setStaffList(updated);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      photo: formData.photo,
      preview: formData.preview,
    };
    if (editIndex !== null) {
      const updatedList = [...staffList];
      updatedList[editIndex] = newEntry;
      setStaffList(updatedList);
    } else {
      setStaffList([...staffList, newEntry]);
    }
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', age: '', photo: null, preview: '' });
    setEditIndex(null);
  };

  // Filter by selected field (name/email/age)
  const filteredList = staffList.filter((s) =>
    s[filterBy]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Staff</h2>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={`Search by ${filterBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none"
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="age">Age</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border rounded-lg bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Age</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((staff, index) => (
              <tr key={index} className="hover:bg-gray-100 transition border-t">
                <td className="p-2">
                  <img
                    src={staff.preview}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="p-2">{staff.name}</td>
                <td className="p-2">{staff.email}</td>
                <td className="p-2">{staff.phone}</td>
                <td className="p-2">{staff.age}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedList.length === 0 && (
              <tr>
                <td colSpan="6" className="text-gray-500 py-4">
                  No staff found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add Staff Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus className="inline-block mr-2" /> Add Staff
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold">{editIndex !== null ? 'Edit' : 'Add'} Staff</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full"
              />
              {formData.preview && (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-full mx-auto"
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
