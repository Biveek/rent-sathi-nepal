"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const ProfilePage = () => {
  const { register, handleSubmit } = useForm();

  // Dummy data for checking the UI
  const user = {
    name: "shyam shrestha",
    email: "shyam@gmail.com",
    phone: "9878347958",
    role: "owner",
    trust_score: 4,
    profile_photo: "",
  };

  function onSubmit(data) {
    console.log("Update profile:", data);
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
                {user.profile_photo ? (
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
                />
              </label>

              {/* Name */}
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h2>

              {/* Role Badge */}
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
                {user.role}
              </span>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Email and trust score => Read Only */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trust Score</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">⭐ {user.trust_score}</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Edit Form */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              {/* Name */}
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
                  defaultValue={user.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your full name"
                  {...register("name")}
                />
              </div>

              {/* Phone */}
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
                  defaultValue={user.phone}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="98XXXXXXXX"
                  {...register("phone")}
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save Changes
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;