import React from "react";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const packages = [
  {
    id: 1,
    title: "Kedarnath Trek",
    location: "Uttarakhand",
    duration: "5 Days",
    rating: 4.9,
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: 2,
    title: "Valley of Flowers",
    location: "Chamoli",
    duration: "6 Days",
    rating: 4.8,
    price: "₹14,499",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 3,
    title: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    duration: "4 Days",
    rating: 4.7,
    price: "₹10,999",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
];

const BestSellers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-[#FF9800] uppercase tracking-wider font-medium">
            Most Popular
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Best Seller Packages
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our most loved adventures, chosen by thousands of happy
            travelers.
          </p>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 left-4 bg-[#FF9800] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Best Seller
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="text-[#4CAF50]" />
                  <span>{item.location}</span>
                </div>

                <h3 className="text-2xl font-semibold text-[#1B5E20] mb-4">
                  {item.title}
                </h3>

                <div className="flex justify-between items-center mb-5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-[#4CAF50]" />
                    <span>{item.duration}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaStar className="text-[#FF9800]" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="border-t pt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting From</p>
                    <h4 className="text-2xl font-bold text-[#1B5E20]">
                      {item.price}
                    </h4>
                  </div>

                  <button className="bg-[#1B5E20] text-white px-5 py-3 rounded-xl hover:bg-[#4CAF50] transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <button className="bg-[#1B5E20] text-white px-8 py-4 rounded-full hover:bg-[#4CAF50] transition-all">
            Explore All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;