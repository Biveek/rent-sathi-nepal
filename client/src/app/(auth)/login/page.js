"use client";

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function submitForm(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid Email");
      return;
    }

    setError("");

    setLoading(true);

    setTimeout(() => {
      console.log(email, password);
      setLoading(false);
    }, 3000);
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Rental Sathi</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={submitForm} noValidate>
          <div className="flex flex-col gap-4">

            <label className="font-medium">Email</label>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black "
              />
            </div>

            <label className="font-medium">Password</label>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
