import React, { createContext, useContext, useState, useEffect } from "react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;
// Define the shape of the user object
interface User {
  id: string;
  email: string;
  role?: string; // Optional, depending on your application
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, role?: string) => Promise<void>;
  login: (email: string, password: string, role?: string) => Promise<void>;
  verifyUser: () => Promise<void>;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  verifyUser: async () => {},
  logout: () => {},
});

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user signup
  const signup = async (email: string, password: string, role?: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
        credentials: "include", // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      setUser(data.user); // Set the user after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user login
  const login = async (email: string, password: string, role?: string) => {
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
      setUser(data.user); // Set the user after successful login
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to verify the user's authentication status
  const verifyUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URI}/api/v1/auth/verify`, {
        method: "GET",
        credentials: "include", // Include cookies if needed
      });

      if (!response.ok) {
        throw new Error("User verification failed");
      }

      const data = await response.json();
      setUser(data.user); // Set the user if verification is successful
    } catch (error) {
      console.error("Verification error:", error);
      setUser(null); // Clear the user if verification fails
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

  // Verify the user on initial load
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, verifyUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
