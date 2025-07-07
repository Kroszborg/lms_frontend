"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  role: "admin" | "teacher" | "student";
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user credentials
const USERS = {
  admin: {
    username: "admin",
    password: "admin",
    role: "admin" as const,
    name: "Admin User",
    email: "admin@lms.com",
  },
  teacher: {
    username: "teacher",
    password: "teacher",
    role: "teacher" as const,
    name: "John Teacher",
    email: "teacher@lms.com",
  },
  student: {
    username: "student",
    password: "student",
    role: "student" as const,
    name: "Alice Student",
    email: "student@lms.com",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (authStatus === "true" && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check credentials against dummy users
    const userCreds = Object.values(USERS).find(
      (u) => u.username === username && u.password === password
    );

    if (userCreds) {
      const userData: User = {
        username: userCreds.username,
        role: userCreds.role,
        name: userCreds.name,
        email: userCreds.email,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
