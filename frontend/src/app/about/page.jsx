import {
  FaMountain,
  FaUsers,
  FaMapMarkedAlt,
  FaAward,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center text-white px-6">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Us
          </h1>

          <p className="max-w-2xl mx-auto text-lg">
            From Mountain Trails to Memorable Journeys
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#FF9800] uppercase tracking-wider font-medium">
              Our Story
            </span>

            <h2
              className="text-4xl font-bold text-[#1B5E20] mt-3 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Creating Adventures That Last a Lifetime
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              Nature Explorer was founded with a simple vision: to connect
              travelers with breathtaking landscapes, authentic experiences,
              and unforgettable adventures.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Whether you're trekking through the Himalayas, discovering hidden
              valleys, or exploring cultural destinations, our mission is to
              make every journey safe, seamless, and inspiring.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Travel Adventure"
              className="rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-[#1B5E20]">5000+</h3>
              <p className="text-gray-600 mt-2">Happy Travelers</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#1B5E20]">100+</h3>
              <p className="text-gray-600 mt-2">Tour Packages</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#1B5E20]">50+</h3>
              <p className="text-gray-600 mt-2">Destinations</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#1B5E20]">10+</h3>
              <p className="text-gray-600 mt-2">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold text-[#1B5E20]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <FaMountain className="text-5xl text-[#4CAF50] mx-auto mb-5" />
              <h3 className="font-semibold text-xl mb-3">
                Expert Trek Leaders
              </h3>
              <p className="text-gray-600">
                Experienced guides ensuring safe adventures.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <FaUsers className="text-5xl text-[#4CAF50] mx-auto mb-5" />
              <h3 className="font-semibold text-xl mb-3">
                Trusted by Travelers
              </h3>
              <p className="text-gray-600">
                Thousands of successful trips and happy clients.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <FaMapMarkedAlt className="text-5xl text-[#4CAF50] mx-auto mb-5" />
              <h3 className="font-semibold text-xl mb-3">
                Unique Destinations
              </h3>
              <p className="text-gray-600">
                Discover hidden gems and iconic locations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <FaAward className="text-5xl text-[#4CAF50] mx-auto mb-5" />
              <h3 className="font-semibold text-xl mb-3">
                Premium Experience
              </h3>
              <p className="text-gray-600">
                Comfort, safety, and memorable adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1B5E20] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready For Your Next Adventure?
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Explore breathtaking destinations and unforgettable trekking
            experiences with Nature Explorer.
          </p>

          <button className="bg-[#FF9800] px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Explore Packages
          </button>
        </div>
      </section>
    </>
  );
}