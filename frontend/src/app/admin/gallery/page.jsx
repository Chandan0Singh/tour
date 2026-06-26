"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

// ─── Sidebar shared data ───────────────────────────────────────────────────────
const menuItems = [
  { id: "dashboard",    label: "Dashboard",         icon: "🏠", href: "/admin" },
  { id: "packages",     label: "Tour Packages",     icon: "🏔️", href: "/admin/packages" },
  { id: "destinations", label: "Destinations",      icon: "🗺️", href: "/admin/destinations" },
  { id: "bookings",     label: "Bookings",          icon: "📅", href: "/admin/bookings" },
  { id: "customers",    label: "Customers",         icon: "👥", href: "/admin/customers" },
  { id: "blogs",        label: "Travel Blogs",      icon: "✍️", href: "/admin/blogs" },
  { id: "gallery",      label: "Gallery",           icon: "🖼️", href: "/admin/gallery" },
  { id: "enquiries",    label: "Contact Enquiries", icon: "📩", href: "/admin/enquiries" },
  { id: "reviews",      label: "Reviews",           icon: "⭐", href: "/admin/reviews" },
  { id: "coupons",      label: "Coupons",           icon: "🎟️", href: "/admin/coupons" },
  { id: "analytics",    label: "Analytics",         icon: "📊", href: "/admin/analytics" },
  { id: "settings",     label: "Settings",          icon: "⚙️", href: "/admin/settings" },
];

const CATEGORIES = ["Tour","Trek","Destination","Adventure","Camping","Wildlife","Snow","Other"];

const EMPTY_FORM = {
  title: "", description: "", image: "", video: "",
  category: "Other", location: "", featured: false, status: "Active",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusBadge = (s) =>
  s === "Active"
    ? "bg-green-100 text-green-700 border border-green-300"
    : "bg-red-100 text-red-700 border border-red-300";

const catColor = (c) => {
  const map = {
    Tour: "bg-green-100 text-green-700", Trek: "bg-orange-100 text-orange-700",
    Destination: "bg-blue-100 text-blue-700", Adventure: "bg-red-100 text-red-700",
    Camping: "bg-yellow-100 text-yellow-700", Wildlife: "bg-emerald-100 text-emerald-700",
    Snow: "bg-sky-100 text-sky-700", Other: "bg-gray-100 text-gray-600",
  };
  return map[c] || "bg-gray-100 text-gray-600";
};

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="text-lg font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-500 transition-colors text-lg font-bold">
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Gallery Form ─────────────────────────────────────────────────────────────
function GalleryForm({ initial = EMPTY_FORM, onSubmit, loading }) {
  const [form, setForm] = useState(initial);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Title <span className="text-red-500">*</span></label>
        <input
          required value={form.title} onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Sunrise at Kedarnath"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
        <textarea
          rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
          placeholder="Short description of this image…"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA] resize-none"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL <span className="text-red-500">*</span></label>
        <input
          required value={form.image} onChange={(e) => set("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
        />
        {form.image && (
          <div className="mt-2 rounded-xl overflow-hidden h-32 bg-gray-100">
            <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = "none")} />
          </div>
        )}
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Video URL <span className="text-gray-400">(optional)</span></label>
        <input
          value={form.video} onChange={(e) => set("video", e.target.value)}
          placeholder="https://youtube.com/…"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
        />
      </div>

      {/* Category + Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
          <select
            value={form.category} onChange={(e) => set("category", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
          <input
            value={form.location} onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Uttarakhand, India"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
          />
        </div>
      </div>

      {/* Status + Featured */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
          <select
            value={form.status} onChange={(e) => set("status", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] bg-[#F4F1EA]"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set("featured", !form.featured)}
              className={`w-11 h-6 rounded-full transition-colors duration-200 flex items-center px-1 ${form.featured ? "bg-[#FF9800]" : "bg-gray-200"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.featured ? "translate-x-5" : "translate-x-0"}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit" disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#4CAF50] transition-colors disabled:opacity-60 shadow"
        >
          {loading ? "Saving…" : "Save Image"}
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // data
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // modals
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFeatured, setFilterFeatured] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid | table

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:5000/api/gallery");
      setGallery(data);
    } catch (e) {
      setError("Failed to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleAdd = async (form) => {
    try {
      setSaving(true);
      await axios.post("http://localhost:5000/api/gallery/add", form);
      setShowAdd(false);
      fetchGallery();
    } catch (e) {
      setError("Failed to add image.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (form) => {
    try {
      setSaving(true);
      await axios.put(`http://localhost:5000/api/gallery/${editItem._id}`, form);
      setEditItem(null);
      fetchGallery();
    } catch (e) {
      setError("Failed to update image.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await axios.delete(`http://localhost:5000/api/gallery/${deleteItem._id}`);
      setDeleteItem(null);
      fetchGallery();
    } catch (e) {
      setError("Failed to delete image.");
    } finally {
      setSaving(false);
    }
  };

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = gallery.filter((g) => {
    const matchSearch =
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      (g.location || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || g.category === filterCat;
    const matchStatus = filterStatus === "All" || g.status === filterStatus;
    const matchFeat =
      filterFeatured === "All" ||
      (filterFeatured === "Featured" ? g.featured : !g.featured);
    return matchSearch && matchCat && matchStatus && matchFeat;
  });

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalActive   = gallery.filter((g) => g.status === "Active").length;
  const totalFeatured = gallery.filter((g) => g.featured).length;
  const totalVideo    = gallery.filter((g) => g.video).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#F4F1EA] font-[Poppins]">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#1B5E20] z-40 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>

        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF9800] flex items-center justify-center text-xl shadow-lg">🌿</div>
            <div>
              <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Nature Explorer
              </p>
              <p className="text-green-300 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive ? "bg-white/15 text-white shadow-inner" : "text-green-200 hover:bg-white/10 hover:text-white"}`}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF9800]" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all text-sm font-medium">
            <span className="text-lg">🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
            <button className="lg:hidden p-2 rounded-xl text-[#1B5E20] hover:bg-green-50 transition" onClick={() => setSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/admin" className="text-gray-400 hover:text-[#1B5E20] transition">Dashboard</Link>
              <span className="text-gray-300">/</span>
              <span className="text-[#1B5E20] font-semibold">Gallery</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF9800]" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] flex items-center justify-center text-white font-bold text-sm shadow">A</div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition">
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm flex items-center justify-between">
              <span>⚠️ {error}</span>
              <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 font-bold ml-4">×</button>
            </div>
          )}

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                🖼️ Gallery Management
              </h1>
              <p className="text-gray-500 text-sm mt-1">Upload, manage and organise your travel photos & videos.</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#4CAF50] transition-colors shadow-lg hover:shadow-xl hover:scale-105 duration-200"
            >
              <span className="text-base">＋</span> Add Image
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Images", value: gallery.length, icon: "🖼️", bg: "bg-gradient-to-br from-[#1B5E20] to-[#4CAF50]" },
              { label: "Active",       value: totalActive,    icon: "✅", bg: "bg-gradient-to-br from-[#1565C0] to-[#42A5F5]" },
              { label: "Featured",     value: totalFeatured,  icon: "⭐", bg: "bg-gradient-to-br from-[#FF9800] to-[#FFB74D]" },
              { label: "With Video",   value: totalVideo,     icon: "🎬", bg: "bg-gradient-to-br from-[#6A1B9A] to-[#AB47BC]" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-3xl p-4 text-white shadow-xl hover:scale-105 transition-transform duration-200`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/80 text-xs font-medium">{s.label}</p>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters + View Toggle */}
          <div className="bg-white rounded-3xl shadow-xl p-5">
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-[180px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title or location…"
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F4F1EA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                />
              </div>

              {/* Category */}
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F4F1EA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>

              {/* Status */}
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F4F1EA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                <option value="All">All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              {/* Featured */}
              <select value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F4F1EA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                <option value="All">All Types</option>
                <option value="Featured">Featured</option>
                <option value="Regular">Regular</option>
              </select>

              {/* View toggle */}
              <div className="flex items-center gap-1 ml-auto bg-[#F4F1EA] rounded-xl p-1">
                <button onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "grid" ? "bg-[#1B5E20] text-white shadow" : "text-gray-500 hover:text-gray-700"}`}>
                  ⊞ Grid
                </button>
                <button onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === "table" ? "bg-[#1B5E20] text-white shadow" : "text-gray-500 hover:text-gray-700"}`}>
                  ☰ Table
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{filtered.length} image{filtered.length !== 1 ? "s" : ""} found</p>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && filtered.length === 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No images found</h3>
              <p className="text-gray-400 text-sm mb-6">Try adjusting your filters or add a new image.</p>
              <button onClick={() => setShowAdd(true)}
                className="px-6 py-2.5 rounded-xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#4CAF50] transition-colors">
                ＋ Add First Image
              </button>
            </div>
          )}

          {/* ── Grid View ── */}
          {!loading && filtered.length > 0 && viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <div key={item._id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">

                  {/* Image */}
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">🖼️</div>
                    )}

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                      {item.featured && (
                        <span className="bg-[#FF9800] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">⭐ Featured</span>
                      )}
                      {item.video && (
                        <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">🎬 Video</span>
                      )}
                    </div>

                    {/* Status top right */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge(item.status)}`}>{item.status}</span>
                    </div>

                    {/* Action buttons on hover */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => setViewItem(item)}
                        className="w-8 h-8 rounded-xl bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center text-sm shadow transition">👁️</button>
                      <button onClick={() => setEditItem(item)}
                        className="w-8 h-8 rounded-xl bg-[#1B5E20]/90 hover:bg-[#1B5E20] text-white flex items-center justify-center text-sm shadow transition">✏️</button>
                      <button onClick={() => setDeleteItem(item)}
                        className="w-8 h-8 rounded-xl bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center text-sm shadow transition">🗑️</button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.title}
                      </h3>
                      <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>

                    {item.location && (
                      <p className="text-xs text-gray-400 mb-1">📍 {item.location}</p>
                    )}

                    {item.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    )}

                    {/* Bottom actions */}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setEditItem(item)}
                        className="flex-1 py-1.5 rounded-xl border border-[#1B5E20] text-[#1B5E20] text-xs font-semibold hover:bg-[#1B5E20] hover:text-white transition-colors">
                        Edit
                      </button>
                      <button onClick={() => setDeleteItem(item)}
                        className="flex-1 py-1.5 rounded-xl border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Table View ── */}
          {!loading && filtered.length > 0 && viewMode === "table" && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#F4F1EA]">
                      {["Image", "Title", "Category", "Location", "Featured", "Video", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map((item) => (
                      <tr key={item._id} className="hover:bg-[#F4F1EA]/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {item.image
                              ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">🖼️</div>}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-800 max-w-[160px] truncate">{item.title}</p>
                          {item.description && <p className="text-xs text-gray-400 max-w-[160px] truncate">{item.description}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor(item.category)}`}>{item.category}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{item.location || "—"}</td>
                        <td className="px-4 py-3 text-center">{item.featured ? "⭐" : "—"}</td>
                        <td className="px-4 py-3 text-center">{item.video ? "🎬" : "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge(item.status)}`}>{item.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <button onClick={() => setViewItem(item)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm transition" title="View">👁️</button>
                            <button onClick={() => setEditItem(item)} className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-sm transition" title="Edit">✏️</button>
                            <button onClick={() => setDeleteItem(item)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-sm transition" title="Delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              🌿 <span className="font-semibold text-[#1B5E20]">Nature Explorer</span> Admin Dashboard &nbsp;·&nbsp; Gallery Management &nbsp;·&nbsp; © 2026
            </p>
          </div>
        </main>
      </div>

      {/* ══ MODALS ══════════════════════════════════════════════════════════════ */}

      {/* Add Modal */}
      {showAdd && (
        <Modal title="🖼️ Add New Image" onClose={() => setShowAdd(false)}>
          <GalleryForm onSubmit={handleAdd} loading={saving} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editItem && (
        <Modal title="✏️ Edit Image" onClose={() => setEditItem(null)}>
          <GalleryForm initial={editItem} onSubmit={handleEdit} loading={saving} />
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {deleteItem && (
        <Modal title="🗑️ Delete Image" onClose={() => setDeleteItem(null)}>
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
            <h3 className="font-bold text-gray-800 text-base mb-2">Delete this image?</h3>
            <p className="text-gray-500 text-sm mb-1">
              <span className="font-semibold text-gray-700">{deleteItem.title}</span>
            </p>
            <p className="text-gray-400 text-xs mb-6">This action cannot be undone.</p>
            {deleteItem.image && (
              <div className="w-32 h-24 rounded-xl overflow-hidden mx-auto mb-6 bg-gray-100">
                <img src={deleteItem.image} alt={deleteItem.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setDeleteItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 shadow">
                {saving ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View / Preview Modal */}
      {viewItem && (
        <Modal title="👁️ Image Preview" onClose={() => setViewItem(null)}>
          <div className="space-y-4">
            {viewItem.image && (
              <div className="rounded-2xl overflow-hidden max-h-72 bg-gray-100">
                <img src={viewItem.image} alt={viewItem.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Title",     value: viewItem.title },
                { label: "Category",  value: viewItem.category },
                { label: "Location",  value: viewItem.location || "—" },
                { label: "Status",    value: viewItem.status },
                { label: "Featured",  value: viewItem.featured ? "Yes ⭐" : "No" },
                { label: "Has Video", value: viewItem.video ? "Yes 🎬" : "No" },
              ].map((row) => (
                <div key={row.label} className="bg-[#F4F1EA] rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{row.value}</p>
                </div>
              ))}
            </div>
            {viewItem.description && (
              <div className="bg-[#F4F1EA] rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium mb-0.5">Description</p>
                <p className="text-sm text-gray-700">{viewItem.description}</p>
              </div>
            )}
            {viewItem.video && (
              <div className="bg-[#F4F1EA] rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium mb-0.5">Video URL</p>
                <a href={viewItem.video} target="_blank" rel="noreferrer"
                  className="text-sm text-[#1B5E20] underline break-all hover:text-[#4CAF50]">
                  {viewItem.video}
                </a>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setViewItem(null); setEditItem(viewItem); }}
                className="flex-1 py-2.5 rounded-xl bg-[#1B5E20] text-white text-sm font-semibold hover:bg-[#4CAF50] transition-colors shadow">
                ✏️ Edit
              </button>
              <button onClick={() => setViewItem(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}