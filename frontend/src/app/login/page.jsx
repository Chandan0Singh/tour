"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaLock,
  FaMountain,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");

      // Admin Redirect
      if (data.user.role === "admin") {

        router.push("/admin");
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-[#1B5E20] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')",
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-6">
            <FaMountain size={40} />
            <h1 className="text-4xl font-bold">
              Nature Explorer
            </h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Welcome Back
          </h2>

          <p className="text-lg text-gray-200 max-w-lg">
            Sign in to manage your bookings, save favourite
            destinations and continue your next adventure.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-[#F4F1EA] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2
              className="text-4xl font-bold text-[#1B5E20]"
              style={{ fontFamily: "Playfair Display" }}
            >
              Sign In
            </h2>

            <p className="text-gray-500 mt-2">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-[#1B5E20] font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E20] hover:bg-[#154918] text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-gray-500 text-sm">
              OR
            </span>
          </div>

          {/* Google Login */}
          <button className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50">
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#1B5E20] font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}