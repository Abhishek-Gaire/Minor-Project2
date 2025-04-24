import { useContext } from "react";
import { AdminContext } from "./AdminContext";

export const useAdminAuth = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminProvider");
  }

  return context;
};