"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold">Your Profile</h1>
      <div className="space-y-4 text-gray-800">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Name</h2>
          <p className="text-lg font-medium">{user.name}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Email</h2>
          <p className="text-lg font-medium">{user.email}</p>
        </div>
        {user.phone && (
          <div>
            <h2 className="text-sm font-medium text-gray-500">Phone</h2>
            <p className="text-lg font-medium">{user.phone}</p>
          </div>
        )}
        <div>
          <h2 className="text-sm font-medium text-gray-500">Role</h2>
          <p className="text-lg font-medium">{user.role || "User"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
