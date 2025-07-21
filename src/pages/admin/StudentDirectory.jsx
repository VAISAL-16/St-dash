// src/pages/StudentDirectory.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust path if needed

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const studentCollection = collection(db, "student");
    const studentSnapshot = await getDocs(studentCollection);
    const studentList = studentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setStudents(studentList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Student Directory</h2>
      <ul className="space-y-2">
        {students.map(student => (
          <li key={student.id} className="border p-3 rounded shadow">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Department:</strong> {student.department}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDirectory;
