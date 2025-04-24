import { createContext } from "react";
import { AdminContextType, LoginResponse } from "../utils/types.ts";

export const AdminContext = createContext<AdminContextType>({
  admin: null,
  loading: true,
  adminLogin: async (): Promise<LoginResponse> => {
    return { userData: null, error: "Admin login function not implemented" };
  },
  adminLogout: () => {},
  refreshAuth: () => {},
});