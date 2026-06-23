import React from "react";

const tours = [
  {
    id: 1,
    title: "Rajasthan Heritage Tour",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    duration: "7 Days",
    price: "₹15,999",
  },
  {
    id: 2,
    title: "Kashmir Paradise Tour",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    duration: "6 Days",
    price: "₹18,999",
  },
  {
    id: 3,
    title: "Leh Ladakh Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    duration: "8 Days",
    price: "₹22,999",
  },
];

const FeaturedTours = () => {
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
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-green-700 font-medium">
                    {tour.duration}
                  </span>

                  <span className="text-orange-500 font-bold">
                    {tour.price}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {tour.title}
                </h3>

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