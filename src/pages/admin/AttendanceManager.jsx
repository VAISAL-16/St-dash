// src/pages/AttendanceManager.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Box, Typography, Table, Sheet, Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AttendanceManager() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [];
  });

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const markAttendance = (roll, isPresent) => {
    const updated = students.map((student) =>
      student.roll === roll
        ? {
            ...student,
            records: {
              ...(student.records || {}),
              [selectedDate]: isPresent,
            },
          }
        : student
    );

    setStudents(updated);
    toast.success(`Marked ${roll} as ${isPresent ? 'Present' : 'Absent'} for ${selectedDate}`);
  };

  const paginatedStudents = students.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box p={3} minHeight="100vh" bgcolor="background.body">
      {/* Gradient Header */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          color: 'white',
          textAlign: 'center',
          boxShadow: 'lg',
        }}
      >
        <Typography level="h3" fontWeight="lg">
          📅 Attendance Manager
        </Typography>
        <Typography level="body-md">
          Mark attendance by date and department
        </Typography>
      </Box>

      <Box mb={2} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography level="title-md" color="primary">
          Attendance for: {selectedDate}
        </Typography>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid gray',
          }}
        />
      </Box>

      {students.length === 0 ? (
        <Typography color="neutral" textAlign="center">
          No students found. Please add students first.
        </Typography>
      ) : (
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 'lg',
            overflow: 'auto',
            boxShadow: 'sm',
            mt: 2,
          }}
        >
          <Table
            borderAxis="both"
            stickyHeader
            hoverRow
            stripe="odd"
            sx={{
              minWidth: 700,
              '& th': { backgroundColor: '#f0f4f8' },
              '& td, & th': { textAlign: 'center', p: 1.5 },
            }}
          >
            <thead>
              <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => {
                const isPresent = student.records?.[selectedDate];
                return (
                  <tr key={student.roll}>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                    <td>
                      {isPresent === true && (
                        <span style={{ color: 'green' }}>✔ Present</span>
                      )}
                      {isPresent === false && (
                        <span style={{ color: 'red' }}>❌ Absent</span>
                      )}
                      {isPresent === undefined && (
                        <span style={{ color: 'orange' }}>⏳ Not marked</span>
                      )}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="soft"
                        color="success"
                        onClick={() => markAttendance(student.roll, true)}
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        onClick={() => markAttendance(student.roll, false)}
                        sx={{ ml: 1 }}
                      >
                        Absent
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Sheet>
      )}

      {/* Pagination Footer */}
      {students.length > rowsPerPage && (
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          px={1}
        >
          <Typography level="body-sm" textColor="text.secondary">
            Total Entries: {students.length}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              size="sm"
              variant="outlined"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              ⬅ Prev
            </Button>
            <Typography>{page + 1}</Typography>
            <Button
              size="sm"
              variant="outlined"
              disabled={(page + 1) * rowsPerPage >= students.length}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next ➡
            </Button>
          </Box>
        </Box>
      )}

      {/* Back to Dashboard */}
      {/* Back to Dashboard */}
<Box mt={4}>
  <div>
    <Link
      to="/dashboard"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
    >
      ⬅ Back to Dashboard
    </Link>
  </div>
</Box>

    </Box>
  );
}
