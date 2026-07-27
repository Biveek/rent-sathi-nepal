// src/app/admin/layout.js
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("rentsathi_user") || "null");
    if (!user) router.push("/login");
    else if (user.role !== "admin" && user.role !== "SUPER_ADMIN") {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}