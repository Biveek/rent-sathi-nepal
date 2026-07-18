"use client";

import EditProfileForm from "@/components/profile/EditProfileForm";
import useProfile from "@/hooks/useProfile";

export default function EditProfilePage() {
  const {
    user,
    loading,
    updating,
    success,
    error,
    updateProfile,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <EditProfileForm
        user={user}
        updating={updating}
        success={success}
        error={error}
        updateProfile={updateProfile}
      />
    </main>
  );
}