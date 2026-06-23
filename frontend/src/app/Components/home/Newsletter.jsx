import React from "react";

const Newsletter = () => {
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-96 px-5 py-4 rounded-full bg-white text-gray-800 outline-none"
          />

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;