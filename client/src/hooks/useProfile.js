"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/axios";

export default function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (typeof window === "undefined") return;

      const storedUser = JSON.parse(
        localStorage.getItem("rentsathi_user") || "null"
      );

      if (!storedUser?.token) {
        router.push("/login");
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  async function updateProfile(data) {
    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.put("/auth/me", {
        name: data.name,
        phone: data.phone,
      });

      setUser(response.data.data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  }

  async function uploadPhoto(file) {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profile_photo", file);

      const response = await api.put("/auth/me", formData);

      const updatedUser = response.data.data;

      setUser(updatedUser);

      localStorage.setItem(
        "rentsathi_user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("rentsathi_user")),
          ...updatedUser,
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  return {
    user,
    loading,
    updating,
    success,
    error,
    updateProfile,
    uploadPhoto,
  };
}