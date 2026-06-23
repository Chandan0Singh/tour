import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The Kedarnath trek was absolutely amazing. Everything was well organized and the guides were very supportive.",
  },
  {
    id: 2,
    name: "Priya Verma",
    location: "Mumbai",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "One of the best travel experiences I've ever had. Beautiful destinations and seamless booking process.",
  },
  {
    id: 3,
    name: "Amit Singh",
    location: "Bangalore",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    review:
      "Highly recommended! Great service, premium stays, and unforgettable mountain views.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#F4F1EA] py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-[#FF9800] font-medium uppercase tracking-wider">
            Testimonials
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Travelers Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Real stories from adventurers who explored breathtaking destinations
            with us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 text-[#FF9800] mb-5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-8">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#A5D6A7]"
                />

                <div>
                  <h4 className="font-semibold text-[#1B5E20]">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;