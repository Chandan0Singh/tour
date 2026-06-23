"use client";
import { useState } from "react";

const categories = ["All", "Trek Tips", "Travel Guide", "Destination", "Stories", "Wildlife"];

const posts = [
  {
    id: 1,
    category: "Trek Tips",
    title: "Kedarkantha in December: What No One Tells You",
    excerpt:
      "Sub-zero nights, knee-deep snow, and a sunrise that makes every ache worth it. Here's the honest guide to Kedarkantha's winter slot.",
    author: "Riya Sharma",
    date: "Jun 12, 2025",
    readTime: "6 min read",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Destination",
    title: "Valley of Flowers: When to Go and What to Carry",
    excerpt:
      "July and August are the magic months. We break down the bloom calendar, entry rules, and the gear that saved our trek.",
    author: "Arjun Mehta",
    date: "May 28, 2025",
    readTime: "5 min read",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    category: "Stories",
    title: "How a Solo Trip to Spiti Changed My Definition of Solitude",
    excerpt:
      "No cell signal. No schedule. Just a jeep, a guesthouse family, and 4,200 metres of silence I hadn't planned for.",
    author: "Priya Nair",
    date: "May 15, 2025",
    readTime: "8 min read",
    difficulty: null,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    category: "Travel Guide",
    title: "Manali in Three Days: A Tight Itinerary That Actually Works",
    excerpt:
      "Most Manali guides give you a week. This one assumes you have a long weekend and zero tolerance for wasted time.",
    author: "Karan Joshi",
    date: "Apr 30, 2025",
    readTime: "7 min read",
    difficulty: null,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    category: "Wildlife",
    title: "Spotting Snow Leopards in Hemis: Patience as a Trek Strategy",
    excerpt:
      "Hemis National Park in January. Temperature: -18°C. Leopard sightings: 3. This is what patience looks like at altitude.",
    author: "Devika Rao",
    date: "Apr 14, 2025",
    readTime: "9 min read",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1520962880247-cfaf541d8354?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    category: "Trek Tips",
    title: "Altitude Sickness Is Preventable. Here's How We Do It.",
    excerpt:
      "AMS ruins more Himalayan trips than bad weather does. Our medical advisor breaks down the acclimatisation protocol we use on every high-altitude tour.",
    author: "Dr. Suresh Bhat",
    date: "Mar 22, 2025",
    readTime: "6 min read",
    difficulty: null,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80",
    featured: false,
  },
];

const difficultyStyle = {
  Easy: "bg-[#E8F5E9] text-[#2E7D32]",
  Moderate: "bg-[#FFF3E0] text-[#E65100]",
  Hard: "bg-[#FFEBEE] text-[#B71C1C]",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-[#F9F7F4] font-[Poppins,sans-serif]">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* NAV */}
      <header className="bg-[#1B5E20] text-white">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon points="14,3 27,24 1,24" fill="#4CAF50" />
              <polygon points="14,9 23,24 5,24" fill="#A5D6A7" opacity="0.6" />
            </svg>
            <span className="font-display text-xl tracking-tight">Nature Explorer</span>
          </div>
          <nav className="hidden md:flex gap-7 text-sm font-medium text-white/80">
            {["Home", "Treks", "Tours", "Destinations", "Blog", "Contact"].map((n) => (
              <a key={n} href="#" className={`hover:text-white transition-colors ${n === "Blog" ? "text-white border-b border-[#4CAF50] pb-0.5" : ""}`}>{n}</a>
            ))}
          </nav>
          <button className="bg-[#FF9800] hover:bg-[#F57C00] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors">
            Book Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#1B5E20] text-white pt-14 pb-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">Journal & Guides</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">
            From the Trail.<br />Straight to You.
          </h1>
          <p className="mt-4 text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Trek reports, destination guides, packing lists, and honest stories from the mountains — written by guides who've been there.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${
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
      </div>

      <main className="max-w-7xl mx-auto px-5 py-12">
        {/* FEATURED POST */}
        {featured && (
          <article className="mb-14 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 md:flex">
            <div className="md:w-[55%] relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#FF9800] text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
            <div className="md:w-[45%] p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#4CAF50] text-xs font-semibold uppercase tracking-wide">{featured.category}</span>
                {featured.difficulty && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyStyle[featured.difficulty]}`}>
                    {featured.difficulty}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-[#1B3A1F] leading-snug mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#1B5E20] text-sm font-semibold">{featured.author}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{featured.date} · {featured.readTime}</p>
                </div>
                <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-[#1B5E20] hover:text-[#4CAF50] transition-colors group">
                  Read
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        )}

        {/* GRID */}
        {rest.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1B5E20] text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.difficulty && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyStyle[post.difficulty]}`}>
                        {post.difficulty}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg text-[#1B3A1F] leading-snug mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-600">{post.author}</p>
                      <p className="text-xs text-gray-400">{post.date}</p>
                    </div>
                    <a href="#" className="text-xs font-semibold text-[#1B5E20] hover:text-[#4CAF50] flex items-center gap-1 group transition-colors">
                      Read
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>No posts in this category yet. Check back soon.</p>
          </div>
        )}

        {/* LOAD MORE */}
        {filtered.length > 0 && (
          <div className="text-center mt-12">
            <button className="border border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white font-semibold text-sm px-8 py-3 rounded-full transition-all duration-200">
              Load More Articles
            </button>
          </div>
        )}
      </main>

      {/* NEWSLETTER */}
      <section className="bg-[#1B5E20] text-white mt-8 py-16 px-5">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">Stay in the loop</span>
          <h2 className="font-display text-3xl mt-3 mb-3">Get Trek Updates First</h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8">
            New routes, seasonal guides, and early-bird slots — delivered once a month. No fluff.
          </p>
          {subscribed ? (
            <div className="bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-2xl px-6 py-5 text-[#A5D6A7] font-medium">
              ✓ You're in. Watch your inbox before the next season opens.
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-full px-5 py-3 outline-none focus:border-[#4CAF50] transition-colors"
              />
              <button
                onClick={() => email && setSubscribed(true)}
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold text-sm px-7 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D3B12] text-white/60 text-xs py-6 px-5 text-center">
        <p>© 2025 Nature Explorer. From Mountain Trails to Memorable Journeys.</p>
      </footer>
    </div>
  );
}