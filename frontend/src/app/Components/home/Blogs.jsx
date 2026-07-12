import React from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const Blogs = ({ data = [] }) => {
  console.log("blogs:", data);

  return (
    <section className="py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <FaCalendarAlt className="text-[#4CAF50]" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[#1B5E20] mb-4">
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