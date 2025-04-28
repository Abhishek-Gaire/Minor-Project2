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
