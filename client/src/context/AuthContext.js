"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as loginApi, signup as signupApi } from "@/api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("rentsathi_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("rentsathi_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (data) => {
    const authUser = await loginApi(data);
    setUser(authUser);
    localStorage.setItem("rentsathi_user", JSON.stringify(authUser));
    return authUser;
  };

  const signup = async (data) => {
    const authUser = await signupApi(data);
    setUser(authUser);
    localStorage.setItem("rentsathi_user", JSON.stringify(authUser));
    return authUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentsathi_user");
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
