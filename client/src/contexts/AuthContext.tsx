import { createContext } from "react";
import { AuthContextType, LoginResponse } from "../utils/types.ts";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async (): Promise<LoginResponse> => {
    return { userData: null, error: "Login function not implemented" };
  },
  logout: () => {},
  refreshAuth: () => {},
});
