"use client";

import { useState } from "react";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid Email");  
      return;
    }

    setError("");
    setLoading(true);

    try {
      // TODO: Call the forgot password API endpoint
      // For now, we'll show a success message
      setSuccess("If an account exists with this email, a password reset link has been sent.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Rental Sathi</h1>
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-600">Reset Password</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            <label className="font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
