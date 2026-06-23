"use client";

import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    category: "Treks",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
  },
  {
    id: 2,
    category: "Tours",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
  },
  {
    id: 3,
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
  },
  {
    id: 4,
    category: "Treks",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
  },
  {
    id: 5,
    category: "Tours",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
  },
  {
    id: 6,
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200",
  },
  {
    id: 7,
    category: "Treks",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200",
  },
  {
    id: 8,
    category: "Tours",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  const categories = ["All", "Treks", "Tours", "Adventure"];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
          alt="Gallery Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white">
          <h1
            className="text-5xl md:text-7xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Travel Gallery
          </h1>

          <p className="mt-4 text-lg max-w-2xl mx-auto px-4">
            Explore breathtaking moments from our adventures around
            the world.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <span className="text-[#FF9800] uppercase tracking-wider font-medium">
              Memories
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Adventure Gallery
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-[#1B5E20] text-white"
                    : "bg-white text-gray-700 hover:bg-[#A5D6A7]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-3xl break-inside-avoid shadow-lg group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold">
                      {item.category}
                    </h3>

                    <p className="text-sm mt-2">
                      Explore the journey
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}