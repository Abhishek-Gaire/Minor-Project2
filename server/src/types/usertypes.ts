export type UserRole = "student" | "teacher" | "school_admin";

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}
