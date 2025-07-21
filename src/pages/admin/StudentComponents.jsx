import React, { useEffect, useState } from "react";
import {
  Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, IconButton, TextField, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Select, MenuItem, Snackbar, Alert,
  InputLabel, FormControl, Typography
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { sendNotification} from "../../utils/notificationService";

const defaultFormData = {
  name: "",
  rollNo: "",
  department: "",
  email: "",
  password: ""
};

export default function StudentComponents() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentList);
  };

  const handleOpenDialog = () => {
    setEditingIndex(-1);
    setFormData(defaultFormData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(defaultFormData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdateStudent = async () => {
    try {
      if (editingIndex !== -1) {
        const docRef = doc(db, "students", students[editingIndex].id);
        await updateDoc(docRef, { ...formData });

        await sendNotification({
          title: "Student Updated",
          message: `${formData.name} (${formData.rollNo}) was updated.`,
          role: "institution"
        });

        setSnackbarMessage("Student updated & institution notified.");
      } else {
        await addDoc(collection(db, "students"), formData);

        await sendNotification({
          title: "New Student Added",
          message: `${formData.name} (${formData.rollNo}) was added.`,
          role: "institution"
        });

        setSnackbarMessage("Student added & institution notified.");
      }

      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchStudents();
      handleCloseDialog();
    } catch (error) {
      setSnackbarMessage("Error: " + error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditStudent = (index) => {
    setEditingIndex(index);
    setFormData(students[index]);
    setOpenDialog(true);
  };

  const handleDeleteStudent = async (index) => {
    try {
      const student = students[index];
      await deleteDoc(doc(db, "students", student.id));

      await sendNotification({
        title: "Student Deleted",
        message: `${student.name} (${student.rollNo}) was removed.`,
        role: "institution"
      });

      setSnackbarMessage("Student deleted & institution notified.");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
      fetchStudents();
    } catch (error) {
      setSnackbarMessage("Delete error: " + error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(students.map((_, i) => i));
    } else {
      setSelected([]);
    }
  };

  const handleBulkDelete = async () => {
    for (let index of selected) {
      await handleDeleteStudent(index);
    }
    setSelected([]);
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Student Management</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add Student
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleBulkDelete}
            disabled={selected.length === 0}
          >
            Delete Selected
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === students.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={index} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(index)}
                    onChange={() =>
                      setSelected((prev) =>
                        prev.includes(index)
                          ? prev.filter((i) => i !== index)
                          : [...prev, index]
                      )
                    }
                  />
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.password}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditStudent(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteStudent(index)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{editingIndex !== -1 ? "Edit Student" : "Add Student"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select name="department" value={formData.department} onChange={handleChange} label="Department">
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="EEE">EEE</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
              <MenuItem value="CIVIL">CIVIL</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth margin="dense" label="Email" name="email" value={formData.email} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Password" name="password" value={formData.password} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateStudent} variant="contained">
            {editingIndex !== -1 ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
