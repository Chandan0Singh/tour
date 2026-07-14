"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function Hero({ data }) {
  const hero = data?.hero;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            hero?.backgroundImage ||
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
          })`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <p className="uppercase tracking-[4px] text-green-300 mb-4 text-sm font-medium">
          Adventure • Nature • Exploration
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {hero?.title}
          <br />
          {hero?.subtitle}
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10">
          {hero?.description}
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl p-4 max-w-5xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Destination"
              className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 outline-none"
            />

            <select className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700">
              <option>Duration</option>
              <option>1-3 Days</option>
              <option>4-7 Days</option>
              <option>7+ Days</option>
            </select>

            <select className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700">
              <option>Budget</option>
              <option>₹5,000+</option>
              <option>₹10,000+</option>
              <option>₹20,000+</option>
            </select>

            <button className="bg-[#1B5E20] hover:bg-[#14461A] text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition">
              <Search size={18} />
              Search Trips
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href={hero?.primaryButton?.link || "#"}>
            <button className="bg-[#FF9800] hover:bg-[#e68900] text-white px-8 py-4 rounded-full font-semibold transition">
              {hero?.primaryButton?.text}
            </button>
          </Link>

          <Link href={hero?.secondaryButton?.link || "#"}>
            <button className="border border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-semibold transition">
              {hero?.secondaryButton?.text}
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}