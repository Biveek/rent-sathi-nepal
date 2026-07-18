"use client";

import Image from "next/image";

export default function ProfileAvatar({ user, uploadPhoto }) {
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];

    if (file) {
      uploadPhoto(file);
    }
  }

  return (
    <div className="flex flex-col items-center rounded-2xl border bg-white p-8 shadow-sm">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-violet-100">
        {user?.profile_photo ? (
          <Image
            src={user.profile_photo}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-5xl">
            👤
          </div>
        )}
      </div>

      <label className="mt-4 cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700">
        Change Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </label>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">{user?.name}</h2>

      <p className="mt-1 text-gray-500">{user?.email}</p>

      <span className="mt-4 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium capitalize text-violet-700">
        {user?.role}
      </span>
    </div>
  );
}
