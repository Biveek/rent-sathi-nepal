"use client";

import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileActions from "@/components/profile/ProfileActions";
import useProfile from "@/hooks/useProfile";

export default function ProfilePage() {
  const {
    user,
    loading,
    uploadPhoto,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        My Profile
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6">
          <ProfileAvatar
            user={user}
            uploadPhoto={uploadPhoto}
          />

          <ProfileInfo
            user={user}
          />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ProfileStats
            user={user}
          />

          <ProfileActions />
        </div>
      </div>
    </main>
  );
}