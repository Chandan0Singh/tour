import React from "react";

const FeaturedTours = ({ data }) => {

  return (
    <section className="py-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-green-700 font-semibold uppercase tracking-wider">
            Popular Packages
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mt-3 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Tours
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Discover carefully curated travel experiences designed for
            unforgettable memories and breathtaking destinations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={tour.bannerImage}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-700 font-medium">
                    {tour.duration?.days} Days
                  </span>

                  <span className="text-orange-500 font-bold">
                    ₹{tour.discountPrice || tour.price}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {tour.title}
                </h3>

                <p className="text-gray-600 mb-5 line-clamp-2">
                  {tour.shortDescription}
                </p>

                <button className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl font-medium transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition">
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;