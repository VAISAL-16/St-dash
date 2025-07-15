// src/pages/AttendanceSummary.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  Sheet,
  Button,
  IconButton
} from "@mui/joy";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function AttendanceSummary() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);

  const calculateSummary = (records = {}) => {
    const entries = Object.entries(records);
    const totalDays = entries.length;
    const presentDays = entries.filter(([_, isPresent]) => isPresent === true).length;
    const absentDays = entries.filter(([_, isPresent]) => isPresent === false).length;
    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : "N/A";
    return { totalDays, presentDays, absentDays, percentage };
  };

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const paginated = students.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Box p={3} minHeight="100vh" bgcolor="background.body">
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #667eea, #764ba2)",
          borderRadius: "12px",
          p: 3,
          mb: 3,
          color: "white",
          textAlign: "center",
          boxShadow: "lg",
        }}
      >
        <Typography level="h3" fontWeight="lg">
          📊 Monthly Attendance Summary
        </Typography>
        <Typography level="body-md">
          View attendance records summary for all students
        </Typography>
      </Box>

      {students.length === 0 ? (
        <Typography color="neutral" textAlign="center">
          No students found.
        </Typography>
      ) : (
        <>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "lg",
              overflow: "auto",
              boxShadow: "sm",
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
                "& th": { backgroundColor: "#f0f4f8" },
                "& td, & th": { textAlign: "center", p: 1.5 },
              }}
            >
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Total Days</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((student) => {
                  const { presentDays, absentDays, totalDays, percentage } = calculateSummary(student.records);
                  return (
                    <tr key={student.roll}>
                      <td>{student.roll}</td>
                      <td>{student.name}</td>
                      <td>{student.department}</td>
                      <td style={{ color: "green", fontWeight: 600 }}>{presentDays}</td>
                      <td style={{ color: "red", fontWeight: 600 }}>{absentDays}</td>
                      <td>{totalDays}</td>
                      <td style={{ color: "#4c51bf", fontWeight: 600 }}>
                        {percentage === "N/A" ? "—" : `${percentage}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Sheet>

          {/* Pagination Controls */}
          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Typography level="body-sm" sx={{ ml: 2 }}>
              Showing {page * rowsPerPage + 1}–
              {Math.min((page + 1) * rowsPerPage, students.length)} of {students.length} entries
            </Typography>

            <Box display="flex" justifyContent="center" flex={1} gap={1}>
              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
              >
                <ArrowLeft size={18} />
              </IconButton>

              <IconButton
                variant="outlined"
                color="neutral"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
              >
                <ArrowRight size={18} />
              </IconButton>
            </Box>
          </Box>
        </>
      )}

      {/* Back Button */}
      <Box mt={5}>
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
