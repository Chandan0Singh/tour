"use client";

import { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "@/keyword";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${BACKEND_URL}/api/contact/send`, form);

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
<section className="relative h-[42vh] min-h-[340px] overflow-hidden flex items-center justify-center bg-[#1B5E20]">

  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-150053085085085?w=1600"
    alt="Nature and travel destination"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Theme-matched Green Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#123D20]/85 via-[#1B5E20]/65 to-[#1B5E20]/45" />

  {/* Subtle Bottom Shade */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

  {/* Hero Content */}
  <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto">

    {/* Eyebrow */}
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="w-8 h-[2px] bg-[#FF9800]" />

      <span className="text-[#A5D6A7] text-xs md:text-sm uppercase tracking-[0.18em] font-medium">
        Get In Touch
      </span>

      <span className="w-8 h-[2px] bg-[#FF9800]" />
    </div>

    {/* Heading */}
    <h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
      style={{ fontFamily: "var(--font-display)" }}
    >
      Contact Us
    </h1>

    {/* Accent */}
    <div className="w-14 h-1 bg-[#FF9800] rounded-full mx-auto mb-5" />

    {/* Description */}
    <p className="text-lg md:text-base text-white max-w-xl mx-auto leading-7">
      Have questions about your next adventure?
      Let us help you plan a memorable journey into nature.
    </p>

  </div>
</section>

      {/* Contact Section */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <span className="text-[#FF9800] uppercase tracking-wider font-medium">
                Get In Touch
              </span>

              <h2
                className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Start Your Journey
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're planning a trek, family vacation, honeymoon, or
                adventure trip, our team is ready to help you create memorable
                travel experiences.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-gray-600">+91 90450 89285</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-gray-600">code.chandansingh@gmai.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Address</h4>
                    <p className="text-gray-600">
                      Dehradun, Uttarakhand, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaClock />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Working Hours</h4>
                    <p className="text-gray-600">
                      Mon - Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-[#1B5E20] mb-8">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-semibold transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1B5E20] hover:bg-[#4CAF50] text-white"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px]">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=dehradun&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
}
