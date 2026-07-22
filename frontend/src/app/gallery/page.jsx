"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/keyword";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BACKEND_URL}/api/gallery/`);

      console.log("Gallery Response:", res.data);

      const data = Array.isArray(res.data) ? res.data : [];

      setGalleryImages(data);
      setFilteredImages(data);

      const uniqueCategories = [
        "All",
        ...new Set(data.map((item) => item.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.log("Gallery Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(
        galleryImages.filter(
          (item) => item.category === activeCategory
        )
      );
    }
  }, [activeCategory, galleryImages]);

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
            Explore breathtaking moments from our adventures around the world.
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

          {/* Categories */}

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

          {/* Loading */}

          {loading && (
            <div className="text-center py-20 text-xl">
              Loading Gallery...
            </div>
          )}

          {/* Empty */}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No Images Found.
            </div>
          )}

          {/* Gallery */}

          {!loading && filteredImages.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((item) => (
                <div
                  key={item._id}
                  className="relative overflow-hidden rounded-3xl break-inside-avoid shadow-lg group cursor-pointer"
                >
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm mt-2">
                        {item.location}
                      </p>

                      <span className="inline-block mt-3 bg-[#FF9800] px-3 py-1 rounded-full text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
