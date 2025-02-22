export interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}
export interface User {}
export interface AuthContextType {
  user: User | null;
  loading: boolean;
}
