import React from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "Top 10 Trekking Destinations in Uttarakhand",
    date: "15 June 2026",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: 2,
    title: "Complete Guide to Kedarnath Yatra",
    date: "10 June 2026",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 3,
    title: "Essential Packing Tips for Mountain Treks",
    date: "05 June 2026",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
];

const Blogs = () => {
  return (
    <section className="py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-[#FF9800] uppercase tracking-wider font-medium">
            Travel Insights
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Latest Travel Blogs
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore travel stories, trekking guides, destination highlights,
            and expert tips for your next adventure.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <FaCalendarAlt className="text-[#4CAF50]" />
                  <span>{blog.date}</span>
                </div>

                <h3 className="text-xl font-semibold text-[#1B5E20] mb-4 leading-snug">
                  {blog.title}
                </h3>

                <button className="flex items-center gap-2 text-[#1B5E20] font-semibold hover:text-[#4CAF50] transition">
                  Read More
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="bg-[#1B5E20] text-white px-8 py-4 rounded-full hover:bg-[#4CAF50] transition-all">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;