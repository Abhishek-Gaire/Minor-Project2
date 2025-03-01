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
  email: string;
  role?: string; // Optional, depending on your application
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
}
