"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditProfileForm({
  user,
  updating,
  success,
  error,
  updateProfile,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  function onSubmit(data) {
    updateProfile(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">
        Edit Profile
      </h2>

      {success && (
        <div className="mb-5 rounded-lg bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            {...register("name")}
            className="w-full rounded-xl border p-3 outline-none focus:border-violet-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            {...register("phone")}
            className="w-full rounded-xl border p-3 outline-none focus:border-violet-600"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={updating}
        className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {updating ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}