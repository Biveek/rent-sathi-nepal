"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/api/axios";

const ProfilePage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Fetch user data on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rentsathi_user") || "null");
    if (!storedUser?.token) {
      router.push("/login"); // redirect if not logged in
      return;
    }

    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setValue("name", res.data.name);
        setValue("phone", res.data.phone);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Update profile
  async function onSubmit(data) {
    setUpdating(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.put("/auth/me", {
        name: data.name,
        phone: data.phone,
      });
      setUser(res.data.data);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Try again.");
    } finally {
      setUpdating(false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md md:max-w-lg lg:max-w-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">

            {/* Profile Header */}
            <div className="flex flex-col items-center space-y-3">

              {/* Profile Photo */}
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl">
                {user?.profile_photo ? (
                  <Image
                    src={user.profile_photo}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>

              {/* Change Photo */}
              <label className="cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-400">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files[0])} // connect to Cloudinary later
                />
              </label>

              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h2>

              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
                {user?.role}
              </span>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Read Only Info */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trust Score</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">⭐ {user?.trust_score}</p>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Edit Form */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h3>

            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-300">
                {success}
              </div>
            )}

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your full name"
                  {...register("name")}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="98XXXXXXXX"
                  {...register("phone")}
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full md:w-auto px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;