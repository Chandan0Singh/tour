"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "All Tours",
  "Himalayan",
  "Weekend Getaway",
  "Wildlife",
  "Heritage & Culture",
  "Beach & Island",
  "Family Friendly",
  "Honeymoon",
];

// Backend enum: ["Easy", "Moderate", "Difficult"]
const difficultyStyle = {
  Easy: "bg-[#E8F5E9] text-[#2E7D32]",
  Moderate: "bg-[#FFF3E0] text-[#E65100]",
  Difficult: "bg-[#FFEBEE] text-[#B71C1C]",
};

// Backend enum: ["Tour", "Trek"]
const typeStyle = {
  Tour: "bg-[#E3F2FD] text-[#1565C0]",
  Trek: "bg-[#F3E5F5] text-[#6A1B9A]",
};

const whyUs = [
  {
    icon: "🏆",
    title: "Best Price Guarantee",
    desc: "Find it cheaper? We'll match it — no questions asked.",
  },
  {
    icon: "🧭",
    title: "Expert Local Guides",
    desc: "Guides who grew up on these trails and speak the terrain.",
  },
  {
    icon: "🔒",
    title: "Safe & Vetted Travel",
    desc: "First-aid trained teams, verified accommodation, 24/7 support.",
  },
  {
    icon: "🎒",
    title: "Customisable Packages",
    desc: "Every tour can be tailored to your pace, group, and budget.",
  },
  {
    icon: "💬",
    title: "24/7 Customer Support",
    desc: "A real person picks up — before, during, and after your trip.",
  },
];

const testimonials = [
  {
    initials: "AK",
    name: "Aarav Kapoor",
    tour: "Kashmir Great Lakes, Jun 2025",
    color: "bg-[#A5D6A7] text-[#1B5E20]",
    text: '"The Kashmir Lakes tour was faultless. Small group, incredible guide, logistics completely handled. We just showed up and experienced it."',
  },
  {
    initials: "SM",
    name: "Sneha Mathur",
    tour: "Nainital & Corbett, May 2025",
    color: "bg-[#FFE0B2] text-[#E65100]",
    text: '"Travelled with my parents to Nainital. The team was brilliant with elderly travellers — patient, thoughtful, never rushed. Will book again."',
  },
  {
    initials: "RV",
    name: "Rohan Verma",
    tour: "Spiti Valley Circuit, Apr 2025",
    color: "bg-[#E3F2FD] text-[#1565C0]",
    text: '"Spiti on a shoestring? We didn\'t expect this level of quality at this price. Homestays were warm, food was incredible, roads were wild."',
  },
];

const FALLBACK_IMAGE = "https://picsum.photos/seed/tourfallback/800/600";

export default function ToursPage() {
  const [wishlist, setWishlist] = useState([]);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All Tours");
  const [budget, setBudget] = useState(18000);
  const [sortBy, setSortBy] = useState("Popularity");

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const fetchTours = async () => {
    try {
      setLoading(true);

      const params = {
        page,
        limit: 9,
        type: "Tour",
        maxPrice: budget,
      };

      if (activeCategory !== "All Tours") {
        params.category = activeCategory;
      }

      switch (sortBy) {
        case "Price: Low to High":
          params.sort = "price_asc";
          break;

        case "Price: High to Low":
          params.sort = "price_desc";
          break;

        case "Rating":
          params.sort = "rating";
          break;

        default:
          params.sort = "latest";
      }

      const res = await axios.get("http://localhost:5000/api/products", {
        params,
      });

      const fetchedTours = res.data?.products || [];

      setTours((prev) => (page === 1 ? fetchedTours : [...prev, ...fetchedTours]));
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.log(err);
      setTours((prev) => (page === 1 ? [] : prev));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [activeCategory, budget, sortBy]);

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, budget, sortBy, page]);

  return (
    <>
      <div
        className="min-h-screen bg-[#F9F7F4]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');.fd{font-family:'Playfair Display',serif}`}</style>


        {/* HERO */}
        <section className="bg-[#1B5E20] text-white pt-10 pb-0 px-5">
          <div className="max-w-7xl mx-auto flex items-end gap-10 pb-12 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">
                Curated Tour Packages
              </span>
              <h1 className="fd text-4xl mt-3 mb-3 leading-tight">
                India's Most Memorable
                <br />
                Tour Experiences
              </h1>
              <p className="text-white/65 text-sm leading-relaxed max-w-md">
                From Himalayan valleys to Goan shores — handcrafted itineraries
                for every kind of traveller.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors">
                  Explore All Tours
                </button>
                <button className="bg-white/10 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
                  How It Works
                </button>
              </div>
            </div>
            <div className="flex gap-3 pb-0 flex-wrap">
              {[
                ["50+", "Tour Packages"],
                ["15k+", "Happy Travellers"],
                ["30+", "Destinations"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="bg-white/10 rounded-2xl px-5 py-4 text-center min-w-[90px]"
                >
                  <div className="text-[#4CAF50] text-2xl font-bold">{n}</div>
                  <div className="text-white/55 text-xs mt-1 font-medium">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-7 bg-[#F9F7F4] rounded-t-3xl"></div>
        </section>

        {/* FILTER BAR */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-5 flex gap-1 py-2.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#1B5E20] text-white"
                    : "text-gray-500 hover:text-[#1B5E20] hover:bg-[#E8F5E9]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-5 py-8 flex gap-7 items-start">
          {/* SIDEBAR */}
          <aside className="w-52 flex-shrink-0 bg-white rounded-2xl p-5 border border-gray-100 sticky top-16 hidden lg:block">
            <h3 className="fd text-base text-[#1B3A1F] mb-4">Filter Tours</h3>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Budget / person
            </p>
            <input
              type="range"
              min="3000"
              max="30000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#1B5E20]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹3k</span>
              <span className="text-[#1B5E20] font-semibold">
                ₹{budget.toLocaleString()}
              </span>
              <span>₹30k</span>
            </div>
            {[
              ["Duration", ["1–3 Days", "4–7 Days", "8–14 Days", "15+ Days"]],
              ["Difficulty", ["Easy", "Moderate", "Difficult"]],
              [
                "Group Size",
                ["Solo / Private", "Small Group (≤12)", "Large Group"],
              ],
              ["Season", ["Summer", "Monsoon", "Winter"]],
            ].map(([label, opts]) => (
              <div key={label}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-4 mb-2">
                  {label}
                </p>
                {opts.map((o) => (
                  <label
                    key={o}
                    className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={[
                        "1–3 Days",
                        "4–7 Days",
                        "Easy",
                        "Moderate",
                        "Small Group (≤12)",
                        "Summer",
                        "Monsoon",
                      ].includes(o)}
                      className="accent-[#1B5E20]"
                    />
                    {o}
                  </label>
                ))}
              </div>
            ))}
            <button className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-xs py-2.5 rounded-xl mt-5 transition-colors">
              Apply Filters
            </button>
            <button className="w-full text-xs text-gray-400 mt-2 hover:text-gray-600 transition-colors">
              Reset all
            </button>
          </aside>

          {/* GRID */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
              <p className="text-sm text-gray-400">
                <span className="text-[#1B5E20] font-semibold">
                  {tours?.length || 0} tours
                </span>{" "}
                found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-medium border border-gray-200 rounded-xl px-3 py-1.5 text-gray-500 bg-white outline-none cursor-pointer"
                >
                  {[
                    "Popularity",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Duration",
                    "Rating",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {tours?.map((tour) => {
                const imageUrl = tour?.images?.[0]?.url || FALLBACK_IMAGE;
                const imageAlt = tour?.images?.[0]?.alt || tour?.title || "Tour package";

                const displayPrice = tour?.discountPrice || tour?.price || 0;
                const hasDiscount =
                  tour?.discountPrice &&
                  tour?.price &&
                  tour.discountPrice < tour.price;

                const durationLabel =
                  tour?.duration?.days != null && tour?.duration?.nights != null
                    ? `${tour.duration.days}D / ${tour.duration.nights}N`
                    : "N/A";

                const maxGroup = tour?.groupSize?.max ?? "N/A";

                const avgRating = tour?.averageRating || 0;
                const reviewCount = tour?.totalReviews ?? tour?.reviews?.length ?? 0;

                const badge = tour?.bestSeller
                  ? "Best Seller"
                  : tour?.featured
                  ? "Featured"
                  : null;
                const badgeColor = tour?.bestSeller
                  ? "bg-[#FF9800]"
                  : "bg-[#1B5E20]";

                return (
                  <article
                    key={tour?._id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-48 object-cover"
                      />
                      {badge && (
                        <span
                          className={`absolute top-3 left-3 ${badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                        >
                          {badge}
                        </span>
                      )}
                      <button
                        onClick={() => toggleWishlist(tour?._id)}
                        className="absolute top-3 right-3 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-base hover:scale-110 transition-transform"
                      >
                        {wishlist.includes(tour?._id) ? "❤️" : "♡"}
                      </button>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex gap-2 items-center mb-2 flex-wrap">
                        {tour?.difficulty && (
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              difficultyStyle[tour.difficulty] ||
                              "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {tour.difficulty}
                          </span>
                        )}
                        {tour?.type && (
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              typeStyle[tour.type] || "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {tour.type}
                          </span>
                        )}
                      </div>
                      <h3 className="fd text-base text-[#1B3A1F] leading-snug mb-1">
                        {tour?.title || "Untitled Tour"}
                      </h3>
                      {tour?.destination && (
                        <p className="text-xs text-gray-400 mb-2">
                          📍 {tour.destination}
                        </p>
                      )}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-[#FF9800] text-xs">
                          {"★".repeat(Math.floor(avgRating))}
                          {"☆".repeat(5 - Math.floor(avgRating))}
                        </span>
                        <span className="text-xs text-gray-400">
                          {avgRating.toFixed ? avgRating.toFixed(1) : avgRating} (
                          {reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400 mb-3">
                        <span>📅 {durationLabel}</span>
                        <span>👥 Max {maxGroup}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(tour?.inclusions || []).slice(0, 4).map((inc, idx) => (
                          <span
                            key={`${tour?._id}-inclusion-${idx}`}
                            className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg"
                          >
                            {inc}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          {hasDiscount && (
                            <div className="text-xs text-gray-400 line-through">
                              ₹{tour.price.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xl font-bold text-[#1B5E20]">
                            ₹{displayPrice.toLocaleString()}{" "}
                            <span className="text-xs font-normal text-gray-400">
                              / person
                            </span>
                          </div>
                        </div>
                        <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {!loading && (!tours || tours.length === 0) && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-base">
                  No tours match your current filters.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All Tours");
                    setBudget(30000);
                  }}
                  className="mt-4 text-sm text-[#1B5E20] font-semibold underline"
                >
                  Reset filters
                </button>
              </div>
            )}

            {loading && (
              <div className="text-center py-14 text-gray-400 text-sm">
                Loading tours...
              </div>
            )}

            {!loading && tours?.length > 0 && tours.length < total && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="border-2 border-[#1B5E20] text-[#1B5E20] px-10 py-3 rounded-full hover:bg-[#1B5E20] hover:text-white transition-colors"
                >
                  Load More Tours
                </button>
              </div>
            )}
          </div>
        </div>

        {/* WHY US */}
        <section className="bg-white border-t border-gray-100 py-12 px-5">
          <div className="max-w-7xl mx-auto">
            <h2 className="fd text-2xl text-[#1B3A1F] text-center mb-8">
              Why Travellers Choose Us
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {whyUs.map(({ icon, title, desc }) => (
                <div key={title} className="px-3">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div className="text-sm font-semibold text-[#1B3A1F] mb-1">
                    {title}
                  </div>
                  <div className="text-xs text-gray-400 leading-relaxed">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[#F0F7F0] py-12 px-5">
          <div className="max-w-7xl mx-auto">
            <h2 className="fd text-2xl text-[#1B3A1F] text-center mb-7">
              What Our Travellers Say
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map(({ initials, name, tour, color, text }) => (
                <div
                  key={name}
                  className="bg-white rounded-2xl p-5 border border-[#E8F5E9]"
                >
                  <div className="text-[#FF9800] text-sm mb-3">★★★★★</div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-sm font-semibold flex-shrink-0`}
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700">
                        {name}
                      </div>
                      <div className="text-xs text-gray-400">{tour}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1B5E20] text-white py-14 px-5 text-center">
          <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">
            Can't find the right fit?
          </span>
          <h2 className="fd text-3xl mt-3 mb-3">Build Your Own Tour</h2>
          <p className="text-white/65 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Tell us your destination, dates, and group size. Our travel experts
            will put together a custom itinerary within 24 hours — free of
            charge.
          </p>
          <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors">
            Request Custom Tour
          </button>
        </section>

        <footer className="bg-[#0D3B12] text-white/40 text-xs text-center py-5">
          © 2025 Nature Explorer. From Mountain Trails to Memorable Journeys.
        </footer>
      </div>
    </>
  );
}