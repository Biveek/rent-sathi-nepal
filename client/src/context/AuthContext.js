"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { login as loginApi, signup as signupApi } from "@/api/auth";

const USER_STORAGE_KEY = "rentsathi_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore user session:", error);
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const authUser = await loginApi(credentials);

    setUser(authUser);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(authUser)
      );
    }

    return authUser;
  };

  const signup = async (userData) => {
    const authUser = await signupApi(userData);

    setUser(authUser);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(authUser)
      );
    }

    return authUser;
  };

  const logout = () => {
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}