"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LOGIN_ROUTE } from "@/constants/routes";
import { signup } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function SubmitForm(data) {
    setLoading(true);
    setError("");

    try {
      // 1. Register as a default user
      await signup({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: "CUSTOMER", // Default backend role
      });

      // 2. Automatically log in after registration
      await login({ email: data.email, password: data.password });

      // 3. Redirect to homepage
      router.push("/");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full bg-white rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            Create an Account
          </h1>

          {/* Error Banner */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-900/40 dark:text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(SubmitForm)} className="space-y-4 md:space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("name", { required: true })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Your Email
              </label>
              <input
                type="email"
                placeholder="name@xyz.com"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", { required: true })}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="98xxxxxxxx"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("phone", { required: true })}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 mt-0.5"
                {...register("terms", { required: true })}
              />
              <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                I accept the{" "}
                <Link href="#" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="text-white w-full bg-violet-600 hover:bg-violet-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 transition"
            >
              {loading ? "Creating account..." : "Create an Account"}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <Link href={LOGIN_ROUTE} className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;