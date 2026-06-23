"use client";
import { useState } from "react";

const categories = [
  "All Tours", "Himalayan", "Weekend Getaway", "Wildlife",
  "Heritage & Culture", "Beach & Island", "Family Friendly", "Honeymoon",
];

const tours = [
  {
    id: 1,
    title: "Nainital & Corbett Explorer",
    category: "Family Friendly",
    duration: "5 Days / 4 Nights",
    maxGroup: 12,
    difficulty: "Easy",
    type: "Family",
    rating: 4.9,
    reviews: 218,
    price: 6999,
    originalPrice: 8500,
    badge: "Bestseller",
    badgeColor: "bg-[#FF9800]",
    includes: ["🏨 Hotel", "🍽 Meals", "🚌 Transport", "🧭 Guide"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
  },
  {
    id: 2,
    title: "Rishikesh Spiritual & Rafting",
    category: "Weekend Getaway",
    duration: "3 Days / 2 Nights",
    maxGroup: 10,
    difficulty: "Moderate",
    type: "Adventure",
    rating: 4.8,
    reviews: 176,
    price: 4999,
    originalPrice: null,
    badge: null,
    includes: ["🏕 Camp", "🍽 Meals", "🚣 Rafting", "🧘 Yoga"],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80",
  },
  {
    id: 3,
    title: "Manali & Solang Valley Tour",
    category: "Himalayan",
    duration: "5 Days / 4 Nights",
    maxGroup: 14,
    difficulty: "Moderate",
    type: "Scenic",
    rating: 4.7,
    reviews: 142,
    price: 6499,
    originalPrice: null,
    badge: "New Route",
    badgeColor: "bg-[#1B5E20]",
    includes: ["🏨 Hotel", "🍽 Breakfast", "🚌 Transport", "🧭 Guide"],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80",
  },
  {
    id: 4,
    title: "Kashmir Great Lakes Tour",
    category: "Himalayan",
    duration: "9 Days / 8 Nights",
    maxGroup: 8,
    difficulty: "Challenging",
    type: "Scenic",
    rating: 5.0,
    reviews: 89,
    price: 14999,
    originalPrice: 18999,
    badge: "Premium",
    badgeColor: "bg-[#8D6E63]",
    includes: ["🏨 Houseboat", "🍽 All Meals", "✈️ Flights", "🧭 Expert Guide"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  },
  {
    id: 5,
    title: "Goa Weekend Escape",
    category: "Beach & Island",
    duration: "3 Days / 2 Nights",
    maxGroup: 20,
    difficulty: "Easy",
    type: "Beach",
    rating: 4.6,
    reviews: 303,
    price: 5999,
    originalPrice: null,
    badge: null,
    includes: ["🏨 Resort", "🍽 Breakfast", "🚌 Airport Drop"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
  },
  {
    id: 6,
    title: "Spiti Valley Circuit",
    category: "Himalayan",
    duration: "11 Days / 10 Nights",
    maxGroup: 6,
    difficulty: "Challenging",
    type: "Off-beat",
    rating: 4.9,
    reviews: 67,
    price: 16999,
    originalPrice: null,
    badge: "Limited Slots",
    badgeColor: "bg-[#FF9800]",
    includes: ["🏕 Homestay", "🍽 All Meals", "🚙 4WD", "🧭 Expert Guide"],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
  },
];

const difficultyStyle = {
  Easy: "bg-[#E8F5E9] text-[#2E7D32]",
  Moderate: "bg-[#FFF3E0] text-[#E65100]",
  Challenging: "bg-[#FFEBEE] text-[#B71C1C]",
};

const typeStyle = {
  Family: "bg-[#E3F2FD] text-[#1565C0]",
  Adventure: "bg-[#F3E5F5] text-[#6A1B9A]",
  Scenic: "bg-[#E3F2FD] text-[#1565C0]",
  Beach: "bg-[#FCE4EC] text-[#880E4F]",
  "Off-beat": "bg-[#E3F2FD] text-[#1565C0]",
};

const whyUs = [
  { icon: "🏆", title: "Best Price Guarantee", desc: "Find it cheaper? We'll match it — no questions asked." },
  { icon: "🧭", title: "Expert Local Guides", desc: "Guides who grew up on these trails and speak the terrain." },
  { icon: "🔒", title: "Safe & Vetted Travel", desc: "First-aid trained teams, verified accommodation, 24/7 support." },
  { icon: "🎒", title: "Customisable Packages", desc: "Every tour can be tailored to your pace, group, and budget." },
  { icon: "💬", title: "24/7 Customer Support", desc: "A real person picks up — before, during, and after your trip." },
];

const testimonials = [
  { initials: "AK", name: "Aarav Kapoor", tour: "Kashmir Great Lakes, Jun 2025", color: "bg-[#A5D6A7] text-[#1B5E20]", text: "\"The Kashmir Lakes tour was faultless. Small group, incredible guide, logistics completely handled. We just showed up and experienced it.\"" },
  { initials: "SM", name: "Sneha Mathur", tour: "Nainital & Corbett, May 2025", color: "bg-[#FFE0B2] text-[#E65100]", text: "\"Travelled with my parents to Nainital. The team was brilliant with elderly travellers — patient, thoughtful, never rushed. Will book again.\"" },
  { initials: "RV", name: "Rohan Verma", tour: "Spiti Valley Circuit, Apr 2025", color: "bg-[#E3F2FD] text-[#1565C0]", text: "\"Spiti on a shoestring? We didn't expect this level of quality at this price. Homestays were warm, food was incredible, roads were wild.\"" },
];

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState("All Tours");
  const [budget, setBudget] = useState(18000);
  const [sortBy, setSortBy] = useState("Popularity");
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtered = tours.filter((t) => {
    const catMatch = activeCategory === "All Tours" || t.category === activeCategory;
    const budgetMatch = t.price <= budget;
    return catMatch && budgetMatch;
  });

  return (
    <div className="min-h-screen bg-[#F9F7F4]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');.fd{font-family:'Playfair Display',serif}`}</style>

      {/* NAV */}
      <header className="bg-[#1B5E20] text-white">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 28 28"><polygon points="14,3 27,24 1,24" fill="#4CAF50"/><polygon points="14,9 23,24 5,24" fill="#A5D6A7" opacity="0.6"/></svg>
            <span className="fd text-lg">Nature Explorer</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            {["Home","Treks","Tours","Destinations","Blog","Contact"].map((n) => (
              <a key={n} href="#" className={`hover:text-white transition-colors ${n==="Tours"?"text-white border-b border-[#4CAF50] pb-0.5 font-semibold":""}`}>{n}</a>
            ))}
          </nav>
          <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">Book Now</button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#1B5E20] text-white pt-10 pb-0 px-5">
        <div className="max-w-7xl mx-auto flex items-end gap-10 pb-12 flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">Curated Tour Packages</span>
            <h1 className="fd text-4xl mt-3 mb-3 leading-tight">India's Most Memorable<br/>Tour Experiences</h1>
            <p className="text-white/65 text-sm leading-relaxed max-w-md">From Himalayan valleys to Goan shores — handcrafted itineraries for every kind of traveller.</p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors">Explore All Tours</button>
              <button className="bg-white/10 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors">How It Works</button>
            </div>
          </div>
          <div className="flex gap-3 pb-0 flex-wrap">
            {[["50+","Tour Packages"],["15k+","Happy Travellers"],["30+","Destinations"]].map(([n,l])=>(
              <div key={l} className="bg-white/10 rounded-2xl px-5 py-4 text-center min-w-[90px]">
                <div className="text-[#4CAF50] text-2xl font-bold">{n}</div>
                <div className="text-white/55 text-xs mt-1 font-medium">{l}</div>
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
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap transition-all ${activeCategory===cat?"bg-[#1B5E20] text-white":"text-gray-500 hover:text-[#1B5E20] hover:bg-[#E8F5E9]"}`}>
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
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Budget / person</p>
          <input type="range" min="3000" max="30000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full accent-[#1B5E20]"/>
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹3k</span><span className="text-[#1B5E20] font-semibold">₹{budget.toLocaleString()}</span><span>₹30k</span></div>
          {[["Duration",["1–3 Days","4–7 Days","8–14 Days","15+ Days"]],["Difficulty",["Easy","Moderate","Challenging"]],["Group Size",["Solo / Private","Small Group (≤12)","Large Group"]],["Season",["Summer","Monsoon","Winter"]]].map(([label,opts])=>(
            <div key={label}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-4 mb-2">{label}</p>
              {opts.map((o)=>(
                <label key={o} className="flex items-center gap-2 text-xs text-gray-500 py-1 cursor-pointer">
                  <input type="checkbox" defaultChecked={["1–3 Days","4–7 Days","Easy","Moderate","Small Group (≤12)","Summer","Monsoon"].includes(o)} className="accent-[#1B5E20]"/>
                  {o}
                </label>
              ))}
            </div>
          ))}
          <button className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-xs py-2.5 rounded-xl mt-5 transition-colors">Apply Filters</button>
          <button className="w-full text-xs text-gray-400 mt-2 hover:text-gray-600 transition-colors">Reset all</button>
        </aside>

        {/* GRID */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <p className="text-sm text-gray-400"><span className="text-[#1B5E20] font-semibold">{filtered.length} tours</span> found</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by</span>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}
                className="text-xs font-medium border border-gray-200 rounded-xl px-3 py-1.5 text-gray-500 bg-white outline-none cursor-pointer">
                {["Popularity","Price: Low to High","Price: High to Low","Duration","Rating"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((tour) => (
              <article key={tour.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="relative">
                  <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover"/>
                  {tour.badge && (
                    <span className={`absolute top-3 left-3 ${tour.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>{tour.badge}</span>
                  )}
                  <button onClick={() => toggleWishlist(tour.id)}
                    className="absolute top-3 right-3 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-base hover:scale-110 transition-transform">
                    {wishlist.includes(tour.id) ? "❤️" : "♡"}
                  </button>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex gap-2 items-center mb-2 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyStyle[tour.difficulty]}`}>{tour.difficulty}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeStyle[tour.type]}`}>{tour.type}</span>
                  </div>
                  <h3 className="fd text-base text-[#1B3A1F] leading-snug mb-2">{tour.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FF9800] text-xs">{"★".repeat(Math.floor(tour.rating))}{"☆".repeat(5-Math.floor(tour.rating))}</span>
                    <span className="text-xs text-gray-400">{tour.rating} ({tour.reviews})</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400 mb-3">
                    <span>📅 {tour.duration}</span>
                    <span>👥 Max {tour.maxGroup}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tour.includes.map((inc) => (
                      <span key={inc} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">{inc}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {tour.originalPrice && <div className="text-xs text-gray-400 line-through">₹{tour.originalPrice.toLocaleString()}</div>}
                      <div className="text-xl font-bold text-[#1B5E20]">₹{tour.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">/ person</span></div>
                    </div>
                    <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">Book Now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-base">No tours match your current filters.</p>
              <button onClick={()=>{setActiveCategory("All Tours");setBudget(30000)}} className="mt-4 text-sm text-[#1B5E20] font-semibold underline">Reset filters</button>
            </div>
          )}

          <div className="text-center mt-10">
            <button className="border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-semibold text-sm px-10 py-3 rounded-full transition-all">Load More Tours</button>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <section className="bg-white border-t border-gray-100 py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="fd text-2xl text-[#1B3A1F] text-center mb-8">Why Travellers Choose Us</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {whyUs.map(({icon,title,desc})=>(
              <div key={title} className="px-3">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-sm font-semibold text-[#1B3A1F] mb-1">{title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F0F7F0] py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="fd text-2xl text-[#1B3A1F] text-center mb-7">What Our Travellers Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map(({initials,name,tour,color,text})=>(
              <div key={name} className="bg-white rounded-2xl p-5 border border-[#E8F5E9]">
                <div className="text-[#FF9800] text-sm mb-3">★★★★★</div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-sm font-semibold flex-shrink-0`}>{initials}</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{name}</div>
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
        <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">Can't find the right fit?</span>
        <h2 className="fd text-3xl mt-3 mb-3">Build Your Own Tour</h2>
        <p className="text-white/65 text-sm max-w-md mx-auto mb-6 leading-relaxed">Tell us your destination, dates, and group size. Our travel experts will put together a custom itinerary within 24 hours — free of charge.</p>
        <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors">Request Custom Tour</button>
      </section>

      <footer className="bg-[#0D3B12] text-white/40 text-xs text-center py-5">
        © 2025 Nature Explorer. From Mountain Trails to Memorable Journeys.
      </footer>
    </div>
  );
}