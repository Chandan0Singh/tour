"use client";

import { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLoginModal({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter admin password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/check-admin-password`,
        {
          password,
        }
      );

      console.log("Admin password check response:", response);

      if (response.data.success) {
        // Save login status
        localStorage.setItem("adminAuthenticated", "true");

        // Tell AdminLayout login was successful
        onSuccess?.();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Incorrect password. Please try again.");
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.message || "Password is required.");
      } else {
        setError("Unable to connect to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        {/* Icon */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-800 text-3xl">
            🔐
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter the admin password to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Admin Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              required
              autoFocus
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-800 py-3 font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking..." : "Access Admin Panel"}
          </button>

        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Authorized access only
        </p>

      </div>
    </div>
  );
}