"use client";

import { useState } from "react";
import { BACKEND_URL } from "@/keyword";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Subscription failed.");

      setMessage(result.message || "Successfully subscribed to the newsletter.");
      setEmail("");
    } catch (submitError) {
      setError(true);
      setMessage(submitError.message || "Could not subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-900 to-green-700 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Stay Updated
        </h2>

        <p className="text-green-100 text-lg mb-8">
          Get the latest travel offers, trekking updates, and exclusive tour
          packages delivered to your inbox.
        </p>

        {message ? (
          <p role="status" className={error ? "text-red-200" : "text-green-100"}>
            {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full sm:w-96 px-5 py-4 rounded-full bg-white text-gray-800 outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition disabled:opacity-60"
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;