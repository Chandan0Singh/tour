import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";

const treks = [
  {
    id: 1,
    title: "Kedarnath Trek",
    location: "Uttarakhand",
    duration: "5 Days",
    difficulty: "Moderate",
    rating: 4.9,
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: 2,
    title: "Valley of Flowers",
    location: "Uttarakhand",
    duration: "6 Days",
    difficulty: "Easy",
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
    difficulty: "Moderate",
    rating: 4.7,
    price: "₹10,999",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
  {
    id: 4,
    title: "Triund Trek",
    location: "Dharamshala",
    duration: "2 Days",
    difficulty: "Easy",
    rating: 4.6,
    price: "₹4,999",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  {
    id: 5,
    title: "Brahmatal Trek",
    location: "Uttarakhand",
    duration: "6 Days",
    difficulty: "Moderate",
    rating: 4.9,
    price: "₹13,999",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    id: 6,
    title: "Everest Base Camp",
    location: "Nepal",
    duration: "12 Days",
    difficulty: "Hard",
    rating: 5.0,
    price: "₹49,999",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969",
  },
];

export default function TreksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Treks"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Treks
          </h1>

          <p className="text-lg max-w-2xl mx-auto">
            Discover breathtaking mountain trails and unforgettable adventures.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search Trek..."
              className="border rounded-xl px-4 py-3 outline-none"
            />

            <select className="border rounded-xl px-4 py-3">
              <option>All Locations</option>
              <option>Uttarakhand</option>
              <option>Himachal Pradesh</option>
              <option>Nepal</option>
            </select>

            <select className="border rounded-xl px-4 py-3">
              <option>Difficulty</option>
              <option>Easy</option>
              <option>Moderate</option>
              <option>Hard</option>
            </select>

            <button className="bg-[#1B5E20] text-white rounded-xl py-3">
              Search Treks
            </button>
          </div>
        </div>
      </section>

      {/* Trek Cards */}
      <section className="py-20 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map((trek) => (
              <div
                key={trek.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition"
              >
                <img
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <FaMapMarkerAlt className="text-[#4CAF50]" />
                    <span>{trek.location}</span>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#1B5E20] mb-4">
                    {trek.title}
                  </h3>

                  <div className="flex justify-between text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#4CAF50]" />
                      {trek.duration}
                    </div>

                    <div className="flex items-center gap-1">
                      <FaStar className="text-[#FF9800]" />
                      {trek.rating}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t pt-5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {trek.difficulty}
                      </p>
                      <h4 className="text-2xl font-bold text-[#1B5E20]">
                        {trek.price}
                      </h4>
                    </div>

                    <button className="bg-[#1B5E20] text-white px-5 py-3 rounded-xl hover:bg-[#4CAF50] transition">
                      View Trek
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-3">
            <button className="w-10 h-10 rounded-full bg-[#1B5E20] text-white">
              1
            </button>

            <button className="w-10 h-10 rounded-full border">
              2
            </button>

            <button className="w-10 h-10 rounded-full border">
              3
            </button>
          </div>
        </div>
      </section>
    </>
  );
}