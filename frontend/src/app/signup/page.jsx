"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMountain,
} from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Account created successfully!");

      window.location.href = "/";
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
            <h1 className="text-4xl font-bold">Nature Explorer</h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Start Your Adventure
          </h2>

          <p className="text-lg text-gray-200 max-w-lg">
            Create an account to book treks, save destinations, track bookings,
            and explore unforgettable journeys.
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
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">Join Nature Explorer today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

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

            {/* Phone */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaPhone className="text-gray-400 mr-3" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
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

            {/* Confirm Password */}
            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1" />I agree to the
              Terms & Conditions and Privacy Policy
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E20] hover:bg-[#154918] text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-gray-500 text-sm">
              OR
            </span>
          </div>

          <button className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50">
            Sign Up with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1B5E20] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
