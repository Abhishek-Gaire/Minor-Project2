import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "shadcn-ui";
import { Button, Input } from "shadcn-ui";
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  generateStudentPassword,
} from "../api/studentApi";

interface Student {
  id: number;
  name: string;
  grade: string;
  age: number;
  email: string;
  password?: string;
}

// Secure password generator
const generateSecurePassword = (length: number = 12): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  return Array.from(
    randomValues,
    (byte) => charset[byte % charset.length]
  ).join("");
};

// Simulated email function
const sendPasswordEmail = async (
  email: string,
  password: string
): Promise<void> => {
  console.log(`Sending password "${password}" to ${email}`);
  return Promise.resolve();
};

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<
    Omit<Student, "id" | "password">
  >({ name: "", grade: "", age: 0, email: "" });
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to load students.");
      }
    };
    loadStudents();
  }, []);

  const handleCreate = async () => {
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents([...students, createdStudent]);
      const password = generateSecurePassword();
      await sendPasswordEmail(createdStudent.email, password);
      setGeneratedPassword(password);
      setNewStudent({ name: "", grade: "", age: 0, email: "" });
    } catch (err) {
      setError("Failed to create student.");
    }
  };

  const handleGeneratePassword = async (id: number, email: string) => {
    try {
      const newPassword = generateSecurePassword();
      await sendPasswordEmail(email, newPassword);
      setGeneratedPassword(newPassword);
    } catch (err) {
      setError("Failed to generate password.");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h1 className="text-2xl font-bold mb-4">Students Management</h1>

      {/* Create Student Form */}
      <div className="mb-4 space-y-2">
        <Input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <Input
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) =>
            setNewStudent({ ...newStudent, grade: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="Age"
          value={newStudent.age}
          onChange={(e) =>
            setNewStudent({ ...newStudent, age: Number(e.target.value) })
          }
        />
        <Input
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />
        <Button onClick={handleCreate}>Add Student</Button>
      </div>

      {/* Students Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleGeneratePassword(student.id, student.email)
                  }
                >
                  Generate Password
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Generated Password Modal */}
      {generatedPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Generated Password</h2>
            <p>Password: {generatedPassword}</p>
            <p className="text-sm text-gray-500">
              User will be prompted to reset password on first login.
            </p>
            <Button onClick={() => setGeneratedPassword(null)} className="mt-4">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
