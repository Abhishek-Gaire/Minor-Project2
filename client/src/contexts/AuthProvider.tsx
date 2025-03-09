import React, { useEffect, useState, useCallback } from "react";
import { LoginResponse, User } from "../utils/types.ts";

import { AuthContext } from "./AuthContext.tsx";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (
    email: string,
    password: string,
    role?: string
  ): Promise<LoginResponse> => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const responseData = await response.json();
      const user = responseData.data;
      setUser(user.userExists);
      return { userData: user, error: null };
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      return { userData: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/verify`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Verification failed");
      const responseData = await response.json();
      setUser(responseData.data);
    } catch (error) {
      console.error("Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshAuth: verifyUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
