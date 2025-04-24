import React, { useState, useEffect } from "react";
import { Admin, LoginResponse } from "../utils/types.ts";

import { AdminContext } from "./AdminContext.tsx";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to log in an admin user
  const adminLogin = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Admin login failed");
      }

      const responseData = await response.json();
      const adminData = responseData.data;
      setAdmin(adminData.adminExists);
      return { userData: adminData, error: null };
    } catch (error) {
      console.error("Admin login error:", error);
      setAdmin(null);
      return { userData: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Function to log out an admin user
  const adminLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Admin logout failed");
      }

      setAdmin(null);
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to verify if an admin user is authenticated
  const verifyAdmin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/admin/verify`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Admin verification failed");
      const responseData = await response.json();
      setAdmin(responseData.data);
    } catch (error) {
      console.error("Admin verification error:", error);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{ admin, loading, adminLogin, adminLogout, refreshAuth: verifyAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
}