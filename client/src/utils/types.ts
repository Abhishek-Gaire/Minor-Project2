export interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}

export interface ChatRoomProps {
  gradeLevel: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string; // Optional, depending on your application
  grade?: string;
}

export interface LoginResponse {
  userData: User | null;
  error: string | null;
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
