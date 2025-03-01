import React, { createContext, useEffect, useState } from "react";
import { AuthContextType, LoginResponse, User } from "../utils/types.ts";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async (): Promise<LoginResponse> => {
    return { user: null, error: "Login function not implemented" };
  },
  logout: () => {},
});

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const login = async (
    email: string,
    password: string,
    role?: string
  ): Promise<LoginResponse> => {
    setLoading(true);
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
        credentials: "include", // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user); // Update the user state
      return { user: data.user, error: null }; // Return success data
    } catch (error: Error | any) {
      console.error("Login error:", error);
      setUser(null); // Clear the user state on error
      return { user: null, error: error.message }; // Return error
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies if needed
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null); // Clear the user after logout
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Define the async function
    const verifyUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URI}/api/v1/auth/verify`, {
          method: "GET",
          credentials: "include",
          signal: abortController.signal, // Attach abort signal
        });

        if (!response.ok) throw new Error("Verification failed");
        const data = await response.json();
        setUser(data.user);
      } catch (error: Error | any) {
        if (error.name !== "AbortError") {
          // Ignore abort errors
          console.error("Error:", error);
          setUser(null);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // Call the function and handle the promise
    verifyUser().catch((error) => {
      // This catch is technically redundant due to the try/catch,
      // but it silences the linter warning
      console.error("Unhandled error:", error);
    });

    // Cleanup: Abort the request on unmount
    return () => abortController.abort();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
