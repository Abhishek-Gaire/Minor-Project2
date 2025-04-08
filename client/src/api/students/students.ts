import axios from "axios";

interface Student {
  id: number;
  name: string;
  grade: string;
  age: number;
}

// ✅ Get all students
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get("http://localhost:5000/api/students");
  return response.data;
};

// ✅ Create single student
export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  const response = await axios.post("http://localhost:5000/api/students", student);
  return response.data;
};

// ✅ Update a student
export const updateStudent = async (
  id: number,
  student: Partial<Student>
): Promise<Student> => {
  const response = await axios.put(`http://localhost:5000/api/students/${id}`, student);
  return response.data;
};

// ✅ Delete a student
export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/students/${id}`);
};

// ✅ Bulk create students
export const bulkCreateStudents = async (
  students: Omit<Student, "id">[]
): Promise<Student[]> => {
  const response = await axios.post("http://localhost:5000/api/students/bulk", students);
  return response.data;
};
