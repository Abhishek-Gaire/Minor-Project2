export interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string; // Optional, depending on your application
  grade?: string;
  subjects?: string[];
}

export interface Admin {
  id: string;
  name?: string;
  email: string;
  schoolId: string;
}

export interface LoginResponse {
  userData: User | null;
  error: string | null;
}

export interface AdminContextType {
  admin: Admin | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<LoginResponse>;
  adminLogout: () => void;
  refreshAuth: () => void;
}
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    role?: string
  ) => Promise<LoginResponse>;
  logout: () => void;
  refreshAuth: () => void;
}

export interface ClassSession {
  id: string;
  title: string;
  description: string;
  instructor: string;
  startTime: Date;
  endTime: Date;
  status: "upcoming" | "ongoing" | "finished";
}

export interface Submission {
  id: number;
  assignmentId: number;
  studentId: string;
  studentName: string;
  feedback: string;
  grade: number;
  gradedAt: string;
  submissionDate: string;
  submissionFile: string | null;
  submissionUrl: string;
}

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  pointsPossible: number;
  status: string;
  submissions: Submission[];
  teacherName: string;
  totalStudents: number | null;
  updatedAt: string;
}

export interface TeacherGrade {
  studentId: string;
  studentName: string;
  subject: string;
  assignmentTitle: string;
  pointsPossible: number;
  submission: {
    id: number;
    grade: number;
    feedback: string;
    submissionDate: string;
    submissionFile: string | null;
    submissionUrl: string;
    assignmentId: number;
  };
}

export interface StudentGrade {
  id: number;
  studentId: string;
  studentName: string;
  grade: number;
  submissionDate: string;
  feedback: string;
  assignment: {
    title: string;
    subject: string;
    teacherName: string;
    pointsPossible: number;
  };
}
