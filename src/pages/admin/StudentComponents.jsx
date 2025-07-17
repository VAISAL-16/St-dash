import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Sheet,
  Table,
  Checkbox,
  IconButton,
  Select,
  Option,
  Input,
  Button
} from '@mui/joy';

import Stack from '@mui/material/Stack';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function StudentComponents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({
    roll: '',
    name: '',
    department: '',
    email: '',
    image: '',
    password: ''
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('roll');
  const [page, setPage] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(null); // for confirmation dialog
  const rowsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedStudents = [...students]
  .filter((stu) =>
    !stu.isDeleted && // ✅ filter out soft-deleted
    (stu.name.toLowerCase().includes(search.toLowerCase()) ||
      stu.roll.toLowerCase().includes(search.toLowerCase())) &&
    (filterDept === 'All' || stu.department === filterDept)
  )
  .sort((a, b) => {
    const aVal = a[orderBy]?.toLowerCase?.() || '';
    const bVal = b[orderBy]?.toLowerCase?.() || '';
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const pageCount = Math.ceil(sortedStudents.length / rowsPerPage);
  const paginatedStudents = sortedStudents.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!form.roll || !form.name || !form.department || !form.email) {
      return toast.error('Required fields missing');
    }

    const duplicate = students.some((s, i) => s.roll === form.roll && i !== editIndex);
    if (duplicate) return toast.error('Roll number already exists!');

    const formattedForm = {
      ...form,
      name: form.name.toUpperCase(),
      isDeleted: false, 
    };

    const updated = [...students];
    if (editIndex !== null) {
      updated[editIndex] = formattedForm;
      toast.success('Student updated!');
    } else {
      updated.push(formattedForm);
      toast.success('Student added!');
    }

    setStudents(updated);
    setForm({ roll: '', name: '', department: '', email: '', image: '', password: '' });
    setEditIndex(null);
    setShowForm(false);
  };

  const handleDelete = (index) => {
  const updated = [...students];
  updated[index].isDeleted = true; // ✅ soft-delete
  setStudents(updated);
  toast.success('Student deleted (soft)');
};

  return (
    <Box p={2}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(to right, violet, lightblue)',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          color: 'white',
          textAlign: 'center',
          boxShadow: 'lg'
        }}
      >
        <Typography level="h3" fontWeight="lg">📋 Student Management System</Typography>
        <Typography level="body-md">Manage your student records with style</Typography>
      </Box>

      {/* Filter */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        <Input
          placeholder="Search by name or roll"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filterDept}
          onChange={(_, v) => setFilterDept(v)}
          placeholder="Filter Dept"
        >
          <Option value="All">All</Option>
          <Option value="CSE">CSE</Option>
          <Option value="IT">IT</Option>
          <Option value="ECE">ECE</Option>
          <Option value="EEE">EEE</Option>
          <Option value="MECH">MECH</Option>
          <Option value="CIVIL">CIVIL</Option>
        </Select>
        <Button onClick={() => setShowForm(true)}>Add Student</Button>
      </Box>

      {/* Table */}
      <Sheet variant="outlined" sx={{ borderRadius: 'lg', overflow: 'auto', boxShadow: 'sm', mt: 2 }}>
        <Table borderAxis="both" stickyHeader hoverRow stripe="odd" sx={{
          minWidth: 650,
          '& th': { backgroundColor: '#f0f4f8' },
          '& td, & th': { textAlign: 'center', p: 1.5 },
        }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>
                <Button
                  size="sm"
                  variant="soft"
                  onClick={() => handleSort('roll')}
                  endDecorator={<ArrowDownwardIcon fontSize="small" />}
                >
                  Roll
                </Button>
              </th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, i) => (
              <tr key={i}>
                <td>{i + 1 + page * rowsPerPage}</td>
                <td>{student.roll}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.email || '-'}</td>
                <td>
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Button
                      size="sm"
                      color="primary"
                      variant="soft"
                      onClick={() => {
                        setForm(student);
                        const actualIndex = students.findIndex((s) => s.roll === student.roll);
                        setEditIndex(actualIndex);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="neutral"
                      variant="soft"
                      onClick={() => navigate('/student-view', { state: { student } })}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="soft"
                      onClick={() => {
                        const actualIndex = students.findIndex((s) => s.roll === student.roll);
                        setDeleteIndex(actualIndex);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Box display="flex" justifyContent="space-between" px={2} py={1.5} sx={{
          borderTop: '1px solid #ddd',
          background: '#f8f9fa',
          borderRadius: '0 0 10px 10px',
        }}>
          <Box flex={1}></Box>
          <Box flex={1} display="flex" justifyContent="center" gap={1}>
            <Button
              size="sm"
              variant="outlined"
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              sx={{ minWidth: 40 }}
            >
              &lt;
            </Button>
            <Button
              size="sm"
              variant="outlined"
              disabled={page >= pageCount - 1}
              onClick={() => setPage((prev) => Math.min(prev + 1, pageCount - 1))}
              sx={{ minWidth: 40 }}
            >
              &gt;
            </Button>
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <Typography level="body-sm">
              Showing {paginatedStudents.length} of {sortedStudents.length} entries
            </Typography>
          </Box>
        </Box>
      </Sheet>

      {/* Add/Edit Modal */}
      <Dialog open={showForm} onClose={() => { setShowForm(false); setEditIndex(null); }}>
        <DialogTitle>{editIndex !== null ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <Input
                fullWidth
                required
                placeholder="Roll No"
                value={form.roll}
                onChange={(e) => setForm({ ...form, roll: e.target.value })}
              />
              <Input
                fullWidth
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                fullWidth
                required
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Select
                fullWidth
                required
                placeholder="Select Department"
                value={form.department}
                onChange={(_, v) => setForm({ ...form, department: v })}
                listboxPortal
                slotProps={{
                  listbox: {
                    sx: { zIndex: 1301, position: 'absolute' }
                  }
                }}
              >
                {['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map((dept) => (
                  <Option key={dept} value={dept}>{dept}</Option>
                ))}
              </Select>
              <Input
                fullWidth
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                endDecorator={
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                }
              />
              <Button component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm({ ...form, image: reader.result });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
              {form.image && (
                <Box display="flex" justifyContent="center">
                  <img
                    src={form.image}
                    alt="preview"
                    style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit">{editIndex !== null ? 'Update' : 'Save'}</Button>
            <Button variant="soft" onClick={() => { setShowForm(false); setEditIndex(null); }}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="danger"
            onClick={() => {
              if (deleteIndex !== null) {
                handleDelete(deleteIndex);
                setDeleteIndex(null);
              }
            }}
          >
            Yes, Delete
          </Button>
          <Button variant="soft" onClick={() => setDeleteIndex(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Back to Dashboard */}
      <Box mt={4} display="flex" justifyContent="center">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
        >
          ⬅ Back to Dashboard
        </Link>
      </Box>
    </Box>
  );
}
