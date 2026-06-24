import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        {/* <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        /> */}

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h1>

          <p className="text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Let's plan your next adventure together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <span className="text-[#FF9800] uppercase tracking-wider font-medium">
                Get In Touch
              </span>

              <h2
                className="text-4xl md:text-5xl font-bold text-[#1B5E20] mt-3 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Start Your Journey
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're planning a trek, family vacation, honeymoon, or
                adventure trip, our team is ready to help you create memorable
                travel experiences.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaEnvelope />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-gray-600">
                      info@natureexplorer.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Address</h4>
                    <p className="text-gray-600">
                      Dehradun, Uttarakhand, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1B5E20] p-4 rounded-full text-white">
                    <FaClock />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">Working Hours</h4>
                    <p className="text-gray-600">
                      Mon - Sat: 9:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-[#1B5E20] mb-8">
                Send a Message
              </h3>

              <form className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>

                <div>
                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B5E20] text-white py-4 rounded-xl font-semibold hover:bg-[#4CAF50] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px]">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=dehradun&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
}