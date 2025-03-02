interface Student {
  id: number;
  name: string;
  grade: string;
  age: number;
}

export const fetchStudents = async (): Promise<Student[]> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve([
    { id: 1, name: "John Doe", grade: "10", age: 16 },
    { id: 2, name: "Jane Smith", grade: "11", age: 17 },
  ]);
};

export const createStudent = async (
  student: Omit<Student, "id">
): Promise<Student> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve({ id: Math.random(), ...student });
};

export const updateStudent = async (
  id: number,
  student: Partial<Student>
): Promise<Student> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve({ id, ...student });
};

export const deleteStudent = async (id: number): Promise<void> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve();
};

export const bulkCreateStudents = async (
  students: Omit<Student, "id">[]
): Promise<Student[]> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve(
    students.map((student) => ({ id: Math.random(), ...student }))
  );
};
