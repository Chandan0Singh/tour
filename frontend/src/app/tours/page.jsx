"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_URL } from "@/keyword";

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
    title: "Trip-Specific Safety Details",
    desc: "Review each package itinerary for route, accommodation, and safety information.",
  },
  {
    icon: "🎒",
    title: "Customisable Packages",
    desc: "Customization depends on the package, route, and available dates.",
  },
  {
    icon: "💬",
    title: "Customer Support",
    desc: "Contact the travel desk Monday to Saturday, 9am to 7pm IST.",
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

function TourCard({ tour, isWishlisted, onToggleWishlist }) {
  const image = tour?.bannerImage || tour?.images?.[0]?.url || FALLBACK_IMAGE;
  const stateSlug = String(tour?.state || tour?.destination || "destination")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  const tourSlug = tour?.slug || tour?._id;
  const price = tour?.discountPrice || tour?.price || 0;
  const hasDiscount = tour?.discountPrice && tour?.discountPrice < tour?.price;
  const rating = Number(tour?.averageRating || 0);
  const reviewCount = tour?.totalReviews ?? tour?.reviews?.length ?? 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={tour?.images?.[0]?.alt || tour?.title || "Tour package"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {tour?.bestSeller && (
            <span className="rounded-full bg-[#FF9800] px-2.5 py-1 text-[10px] font-bold text-white shadow">
              🏆 Best Seller
            </span>
          )}
          {tour?.featured && (
            <span className="rounded-full bg-[#1B5E20] px-2.5 py-1 text-[10px] font-bold text-white shadow">
              ⭐ Featured
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          onClick={() => onToggleWishlist(tour?._id)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg transition-transform hover:scale-110"
        >
          {isWishlisted ? "❤️" : "♡"}
        </button>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {tour?.duration?.days != null && (
            <span className="rounded-full bg-black/40 px-3 py-1 text-sm font-medium text-white backdrop-blur">
              🕐 {tour.duration.days}D / {tour.duration.nights ?? 0}N
            </span>
          )}
          {tour?.difficulty && (
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${difficultyStyle[tour.difficulty] || "bg-gray-100 text-gray-600"}`}>
              {tour.difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-500">
          <span className="text-[#4CAF50]">📍</span>
          <span>{tour?.destination}{tour?.state ? `, ${tour.state}` : ""}</span>
        </div>
        <h3
          className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-[#1B5E20]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {tour?.title || "Untitled Tour"}
        </h3>
        {tour?.shortDescription && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-500">
            {tour.shortDescription}
          </p>
        )}
        {rating > 0 && (
          <div className="mb-4 flex items-center gap-1 text-sm font-semibold text-gray-700">
            <span className="text-[#FF9800]">★</span> {rating.toFixed(1)}
            <span className="text-xs font-normal text-gray-400">({reviewCount} reviews)</span>
          </div>
        )}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <span>👥 Max {tour?.groupSize?.max || "—"} travellers</span>
          {tour?.inclusions?.[0] && (
            <span className="max-w-[50%] truncate">✓ {tour.inclusions[0]}</span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1B5E20]">
                ₹{Number(price).toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{Number(tour.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400">per person</p>
          </div>
          <Link
            href={`/tours/${stateSlug}/${tourSlug}`}
            className="rounded-xl bg-[#1B5E20] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#4CAF50] hover:shadow-lg"
          >
            View Tour →
          </Link>
        </div>
      </div>
    </article>
  );
}

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

      const res = await axios.get(`${BACKEND_URL}/api/products`, {
        params,
      });

      const fetchedTours = res.data?.products || [];

      setTours((prev) =>
        page === 1 ? fetchedTours : [...prev, ...fetchedTours],
      );
      setTotal(res.data?.total || 0);
    } catch (err) {
      console.log(err);
      setTours((prev) => (page === 1 ? [] : prev));
    } finally {
      setLoading(false);
    }
  };

  // Reset page when filters change by setting page in the handlers below.

  useEffect(() => {
    let cancelled = false;

    const doFetch = async () => {
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

        const res = await axios.get(`${BACKEND_URL}/api/products`, {
          params,
        });

        if (cancelled) return;

        const fetchedTours = res.data?.products || [];

        setTours((prev) => (page === 1 ? fetchedTours : [...prev, ...fetchedTours]));
        setTotal(res.data?.total || 0);
      } catch (err) {
        if (cancelled) return;
        console.log(err);
        setTours((prev) => (page === 1 ? [] : prev));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    doFetch();

    return () => {
      cancelled = true;
    };
    // intentionally only depend on these values
  }, [activeCategory, budget, sortBy, page]);

  return (
    <>
      <div
        className="min-h-screen bg-[#F9F7F4]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');.fd{font-family:'Playfair Display',serif}`}</style>

        {/* HERO */}
        <section className="relative flex h-[65vh] items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
            alt="Scenic tour destination"
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            style={{ animation: "subtleZoom 12s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FF9800]">
              Curated Journeys
            </p>
            <h1
              className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Tours
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85 md:text-xl">
              Discover unforgettable destinations, vibrant cultures, and journeys
              thoughtfully planned for every kind of traveller.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{total}+</p>
                <p>Tours Available</p>
              </div>
              <div className="h-10 w-px bg-white/30" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">4.8★</p>
                <p>Avg Rating</p>
              </div>
              <div className="h-10 w-px bg-white/30" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">15k+</p>
                <p>Happy Travellers</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1 text-xs text-white/60">
            <span>Scroll</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-0 z-20 border-b border-gray-100 bg-white shadow-md">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex min-w-[220px] flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-[#F4F1EA] px-3 py-2.5 text-sm text-gray-500">
                <span>Budget / person</span>
                <input
                  type="range"
                  min="3000"
                  max="30000"
                  value={budget}
                  aria-label="Maximum budget per person"
                  onChange={(e) => {
                    setBudget(Number(e.target.value));
                    setPage(1);
                  }}
                  className="min-w-[70px] flex-1 accent-[#1B5E20]"
                />
                <span className="whitespace-nowrap font-semibold text-[#1B5E20]">
                  ₹{budget.toLocaleString("en-IN")}
                </span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                aria-label="Sort tours"
                className="rounded-xl border border-gray-200 bg-[#F4F1EA] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration</option>
                <option>Rating</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All Tours");
                  setBudget(30000);
                  setSortBy("Popularity");
                  setPage(1);
                }}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "border-[#1B5E20] bg-[#1B5E20] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-400">
                {total} tour{total !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </section>

        {/* TOUR GRID */}
        <section id="tour-grid" className="bg-[#F4F1EA] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <span className="text-sm font-medium uppercase tracking-wider text-[#FF9800]">
                {activeCategory === "All Tours" ? "Find your next journey" : activeCategory}
              </span>
              <h2
                className="mt-2 text-3xl font-bold text-[#1B5E20] md:text-4xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeCategory === "All Tours" ? "Explore All Tours" : `${activeCategory} Tours`}
              </h2>
            </div>

            {loading && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-lg">
                    <div className="h-64 bg-gray-200" />
                    <div className="space-y-3 p-6">
                      <div className="h-3 w-1/3 rounded bg-gray-200" />
                      <div className="h-5 w-2/3 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-100" />
                      <div className="mt-4 h-10 rounded-xl bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && tours.length === 0 && (
              <div className="py-24 text-center">
                <div className="mb-4 text-7xl" aria-hidden="true">🧭</div>
                <h3
                  className="mb-3 text-2xl font-bold text-gray-700"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  No Tours Found
                </h3>
                <p className="mb-6 text-gray-400">
                  Try adjusting your category or budget.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All Tours");
                    setBudget(30000);
                    setPage(1);
                  }}
                  className="rounded-xl bg-[#1B5E20] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4CAF50]"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {!loading && tours.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard
                    key={tour._id}
                    tour={tour}
                    isWishlisted={wishlist.includes(tour._id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )}

            {!loading && tours.length > 0 && tours.length < total && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:border-[#1B5E20] hover:text-[#1B5E20]"
                >
                  Load More Tours
                </button>
              </div>
            )}
          </div>
        </section>

        {/* WHY US */}
        <section id="why-us" className="bg-white border-t border-gray-100 py-12 px-5">
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
            Can&apos;t find the right fit?
          </span>
          <h2 className="fd text-3xl mt-3 mb-3">Build Your Own Tour</h2>
          <p className="text-white/65 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Tell us your destination, dates, and group size. Our travel experts
            will put together a custom itinerary within 24 hours — free of
            charge.
          </p>
          <button
            type="button"
            onClick={() => (window.location.href = "/contact")}
            className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
          >
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
