"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/keyword";

export default function BookingPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();

  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    travelDate: "",
    message: "",
  });

  useEffect(() => {
    fetchTrek();
  }, []);

  const fetchTrek = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${slug}`);

      const data = await res.json();

      setTrek(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    try {
      e.preventDefault();

      console.log({
        trekId: trek._id,
        trekTitle: trek.title,
        ...form,
      });

      // Later:
      await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trekId: trek._id,
          ...form,
        }),
      });

      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking. Please try again.");
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  if (!trek) return <div className="py-20 text-center">Trek not found.</div>;

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 px-6">
        {/* Left */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold">{trek.title}</h1>

          <p className="mt-4 text-gray-600">{trek.description}</p>

          <div className="mt-8 space-y-3">
            <p>
              <strong>Price:</strong> ₹{trek.price}
            </p>

            <p>
              <strong>Duration:</strong> {trek.duration?.days} Days /{" "}
              {trek.duration?.nights} Nights
            </p>

            <p>
              <strong>Destination:</strong> {trek.destination}, {trek.state}
            </p>

            <p>
              <strong>Difficulty:</strong> {trek.difficulty}
            </p>
          </div>
        </div>

        {/* Right */}
        <form
          onSubmit={handleBooking}
          className="bg-white rounded-2xl shadow p-8 space-y-5"
        >
          <h2 className="text-2xl font-bold">Book Your Trek</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="travelers"
            min="1"
            className="w-full border p-3 rounded-lg"
            value={form.travelers}
            onChange={handleChange}
          />

          <input
            type="date"
            name="travelDate"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Special Requests"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
