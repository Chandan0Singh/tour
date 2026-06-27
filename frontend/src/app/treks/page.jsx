"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

const API = "http://localhost:5000";

const DIFFICULTIES = ["Easy", "Moderate", "Difficult"];
const SORT_OPTIONS = [
  { label: "Latest",        value: "latest" },
  { label: "Price: Low",   value: "price_asc" },
  { label: "Price: High",  value: "price_desc" },
  { label: "Top Rated",    value: "rating" },
];

const diffColor = (d) => {
  if (d === "Easy")      return "bg-green-100 text-green-700";
  if (d === "Moderate")  return "bg-orange-100 text-orange-700";
  if (d === "Difficult") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-10 bg-gray-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ─── Trek Card ────────────────────────────────────────────────────────────────
function TrekCard({ trek }) {
  const image =
    trek.bannerImage ||
    (trek.images && trek.images[0]?.url) ||
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800";

  const price = trek.discountPrice || trek.price;
  const hasDiscount = trek.discountPrice && trek.discountPrice < trek.price;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={trek.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {trek.bestSeller && (
            <span className="bg-[#FF9800] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              🏆 Best Seller
            </span>
          )}
          {trek.featured && (
            <span className="bg-[#1B5E20] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Difficulty */}
        <div className="absolute top-4 right-4">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${diffColor(trek.difficulty)}`}>
            {trek.difficulty}
          </span>
        </div>

        {/* Duration bottom */}
        <div className="absolute bottom-4 left-4 text-white">
          {trek.duration?.days && (
            <span className="flex items-center gap-1 text-sm font-medium">
              🕐 {trek.duration.days}D / {trek.duration.nights}N
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
          <span className="text-[#4CAF50]">📍</span>
          <span>{trek.destination}{trek.state ? `, ${trek.state}` : ""}</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-[#1B5E20] mb-3 line-clamp-2 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {trek.title}
        </h3>

        {/* Short Description */}
        {trek.shortDescription && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{trek.shortDescription}</p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {trek.altitude ? (
            <span className="flex items-center gap-1">⛰️ {trek.altitude.toLocaleString()}m</span>
          ) : (
            <span className="flex items-center gap-1">👥 Max {trek.groupSize?.max || "—"} pax</span>
          )}
          {trek.averageRating > 0 && (
            <span className="flex items-center gap-1 font-semibold text-gray-700">
              ⭐ {trek.averageRating.toFixed(1)}
              <span className="text-xs text-gray-400 font-normal">({trek.totalReviews})</span>
            </span>
          )}
        </div>

        {/* Highlights preview */}
        {trek.highlights && trek.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {trek.highlights.slice(0, 2).map((h, i) => (
              <span key={i} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                ✓ {h}
              </span>
            ))}
            {trek.highlights.length > 2 && (
              <span className="text-[10px] text-gray-400">+{trek.highlights.length - 2} more</span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400 font-medium">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#1B5E20]">
                ₹{price?.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{trek.price?.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400">per person</p>
          </div>
          <Link
            href={`/treks/${trek.slug}`}
            className="bg-[#1B5E20] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4CAF50] transition-colors shadow-md hover:shadow-lg"
          >
            View Trek →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TreksPage() {
  const [treks, setTreks]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");

  // Filters
  const [search, setSearch]         = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [minPrice, setMinPrice]     = useState("");
  const [maxPrice, setMaxPrice]     = useState("");
  const [sort, setSort]             = useState("latest");
  const [featured, setFeatured]     = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [page, setPage]             = useState(1);
  const LIMIT = 9;

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTreks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        type: "Trek",
        sort,
        page,
        limit: LIMIT,
        ...(difficulty  && { difficulty }),
        ...(minPrice    && { minPrice }),
        ...(maxPrice    && { maxPrice }),
        ...(featured    && { featured: "true" }),
        ...(bestSeller  && { bestSeller: "true" }),
      };

      const { data } = await axios.get(`http://localhost:5000/api/products`, { params });

      setTreks(data.products || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError("Failed to load treks. Please try again.");
      setTreks([]);
    } finally {
      setLoading(false);
    }
  }, [sort, page, difficulty, minPrice, maxPrice, featured, bestSeller]);

  useEffect(() => { fetchTreks(); }, [fetchTreks]);

  // Search (separate endpoint)
  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setSearch("");
      fetchTreks();
      return;
    }
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(`${API}/api/products/search`, {
        params: { q: searchInput },
      });
      const filtered = (Array.isArray(data) ? data : []).filter((p) => p.type === "Trek");
      setTreks(filtered);
      setTotal(filtered.length);
      setSearch(searchInput);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    fetchTreks();
  };

  const resetFilters = () => {
    setDifficulty("");
    setMinPrice("");
    setMaxPrice("");
    setFeatured(false);
    setBestSeller(false);
    setSort("latest");
    setSearch("");
    setSearchInput("");
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
          alt="Trek Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: "subtleZoom 12s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="text-[#FF9800] uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            Nature Explorer
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Explore Treks
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-8">
            Discover breathtaking mountain trails, pristine valleys and unforgettable high-altitude adventures.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{total}+</p>
              <p>Treks Available</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">4.8★</p>
              <p>Avg Rating</p>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">10k+</p>
              <p>Happy Trekkers</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs flex flex-col items-center gap-1 animate-bounce">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <section className="bg-white shadow-md sticky top-0 z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">

            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search treks…"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
              />
              {searchInput && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">×</button>
              )}
            </div>

            {/* Difficulty */}
            <select
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
            >
              <option value="">All Difficulty</option>
              {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
            </select>

            {/* Min Price */}
            <input
              type="number"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              placeholder="Min ₹"
              className="w-24 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
            />

            {/* Max Price */}
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              placeholder="Max ₹"
              className="w-24 px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
            />

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="px-5 py-2.5 rounded-xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#4CAF50] transition-colors shadow"
            >
              Search
            </button>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Toggle pills */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <button
              onClick={() => { setFeatured(!featured); setPage(1); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                featured ? "bg-[#1B5E20] text-white border-[#1B5E20]" : "bg-white text-gray-600 border-gray-200 hover:border-[#1B5E20] hover:text-[#1B5E20]"
              }`}
            >
              ⭐ Featured Only
            </button>
            <button
              onClick={() => { setBestSeller(!bestSeller); setPage(1); }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                bestSeller ? "bg-[#FF9800] text-white border-[#FF9800]" : "bg-white text-gray-600 border-gray-200 hover:border-[#FF9800] hover:text-[#FF9800]"
              }`}
            >
              🏆 Best Sellers
            </button>

            {/* Active filter chips */}
            {difficulty && (
              <span className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">
                {difficulty}
                <button onClick={() => setDifficulty("")} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-xs font-medium">
                ₹{minPrice || "0"} – ₹{maxPrice || "∞"}
                <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}
            {search && (
              <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                "{search}"
                <button onClick={clearSearch} className="ml-1 hover:text-red-500">×</button>
              </span>
            )}

            <span className="ml-auto text-xs text-gray-400">{total} trek{total !== 1 ? "s" : ""} found</span>
          </div>
        </div>
      </section>

      {/* ── Trek Grid ── */}
      <section className="py-16 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section heading */}
          <div className="text-center mb-12">
            <span className="text-[#FF9800] uppercase tracking-wider font-medium text-sm">
              {search ? `Results for "${search}"` : difficulty ? `${difficulty} Treks` : "All Treks"}
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {featured ? "Featured Treks" : bestSeller ? "Best Seller Treks" : "Explore All Treks"}
            </h2>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm text-center mb-8">
              ⚠️ {error}
              <button onClick={fetchTreks} className="ml-3 underline font-semibold hover:no-underline">Retry</button>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && treks.length === 0 && (
            <div className="text-center py-24">
              <div className="text-7xl mb-4">🏔️</div>
              <h3
                className="text-2xl font-bold text-gray-700 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                No Treks Found
              </h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search query.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-xl bg-[#1B5E20] text-white font-semibold hover:bg-[#4CAF50] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Trek Cards */}
          {!loading && treks.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treks.map((trek) => (
                <TrekCard key={trek._id} trek={trek} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pg = i + 1;
                const show = pg === 1 || pg === totalPages || Math.abs(pg - page) <= 1;
                const isEllipsis = !show && (pg === 2 || pg === totalPages - 1);

                if (isEllipsis) return <span key={pg} className="text-gray-400 px-1">…</span>;
                if (!show) return null;

                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      page === pg
                        ? "bg-[#1B5E20] text-white shadow-md"
                        : "border border-gray-200 text-gray-600 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Trek With Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#FF9800] uppercase tracking-wider font-medium text-sm">Why Choose Us</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1B5E20] mt-2 mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Trek With Confidence
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏕️", title: "Expert Guides", desc: "Certified and experienced mountain guides with 10+ years on trails." },
              { icon: "🛡️", title: "Safety First",  desc: "Full safety equipment, first-aid trained staff and emergency protocols." },
              { icon: "🌿", title: "Eco Friendly",  desc: "Leave-no-trace principles. We protect the trails we love." },
              { icon: "💰", title: "Best Value",    desc: "Transparent pricing with no hidden charges. All-inclusive packages." },
            ].map((item) => (
              <div key={item.title} className="bg-[#F4F1EA] rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1B5E20] text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1B5E20]/85" />
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Book your dream trek today and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-[#FF9800] text-white font-bold text-base hover:bg-[#F57C00] transition-colors shadow-xl"
            >
              Contact Us
            </Link>
            <Link
              href="/tours"
              className="px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-bold text-base hover:bg-white/20 transition-colors backdrop-blur"
            >
              Explore Tours →
            </Link>
          </div>
        </div>
      </section>

      {/* Subtle zoom keyframe */}
      <style>{`
        @keyframes subtleZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
      `}</style>
    </>
  );
}