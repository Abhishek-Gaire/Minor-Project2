interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
}

export const fetchTeachers = async (): Promise<Teacher[]> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve([
    { id: 1, name: "Mr. Smith", subject: "Math", experience: 10 },
    { id: 2, name: "Ms. Johnson", subject: "Science", experience: 5 },
  ]);
};

export const createTeacher = async (
  teacher: Omit<Teacher, "id">
): Promise<Teacher> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve({ id: Math.random(), ...teacher });
};

export const updateTeacher = async (
  id: number,
  teacher: Partial<Teacher>
): Promise<Teacher> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve({ id, ...teacher });
};

export const deleteTeacher = async (id: number): Promise<void> => {
  // Placeholder: Replace with actual API call
  return Promise.resolve();
};
