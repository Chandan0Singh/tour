"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", href: "/admin" },
  { id: "packages", label: "Tour Packages", icon: "🏔️", href: "/admin/packages" },
  { id: "destinations", label: "Destinations", icon: "🗺️", href: "/admin/destinations" },
  { id: "bookings", label: "Bookings", icon: "📅", href: "/admin/bookings" },
  { id: "customers", label: "Customers", icon: "👥", href: "/admin/customers" },
  { id: "blogs", label: "Travel Blogs", icon: "✍️", href: "/admin/blogs" },
  { id: "gallery", label: "Gallery", icon: "🖼️", href: "/admin/gallery" },
  { id: "enquiries", label: "Contact Enquiries", icon: "📩", href: "/admin/enquiries" },
  { id: "reviews", label: "Reviews", icon: "⭐", href: "/admin/reviews" },
  { id: "coupons", label: "Coupons", icon: "🎟️", href: "/admin/coupons" },
  { id: "analytics", label: "Analytics", icon: "📊", href: "/admin/analytics" },
  { id: "settings", label: "Settings", icon: "⚙️", href: "/admin/settings" },
];

const statsCards = [
  {
    label: "Total Revenue",
    value: "₹8,75,000",
    growth: "+18%",
    icon: "💰",
    from: "from-emerald-600",
    to: "to-green-400",
    bg: "bg-gradient-to-br from-[#1B5E20] to-[#4CAF50]",
  },
  {
    label: "Active Tours",
    value: "56",
    growth: "+12%",
    icon: "🏔️",
    bg: "bg-gradient-to-br from-[#FF9800] to-[#FFB74D]",
  },
  {
    label: "Total Bookings",
    value: "248",
    growth: "+9%",
    icon: "📅",
    bg: "bg-gradient-to-br from-[#1565C0] to-[#42A5F5]",
  },
  {
    label: "Customers",
    value: "980",
    growth: "+20%",
    icon: "👥",
    bg: "bg-gradient-to-br from-[#6A1B9A] to-[#AB47BC]",
  },
];

const managementCards = [
  { icon: "🏔️", title: "Tour Packages", desc: "Manage all trekking & tour packages", color: "bg-green-50", border: "border-green-100", href: "/admin/packages" },
  { icon: "🗺️", title: "Destinations", desc: "Add and edit travel destinations", color: "bg-orange-50", border: "border-orange-100", href: "/admin/destinations" },
  { icon: "📅", title: "Bookings", desc: "View and manage tour bookings", color: "bg-blue-50", border: "border-blue-100", href: "/admin/bookings" },
  { icon: "👥", title: "Customers", desc: "Customer profiles and history", color: "bg-purple-50", border: "border-purple-100", href: "/admin/customers" },
  { icon: "✍️", title: "Travel Blogs", desc: "Create and publish travel blogs", color: "bg-yellow-50", border: "border-yellow-100", href: "/admin/blogs" },
  { icon: "🖼️", title: "Gallery", desc: "Manage photo and video gallery", color: "bg-pink-50", border: "border-pink-100", href: "/admin/gallery" },
  { icon: "⭐", title: "Reviews", desc: "Moderate customer reviews", color: "bg-amber-50", border: "border-amber-100", href: "/admin/reviews" },
  { icon: "📩", title: "Contact", desc: "Handle enquiries and messages", color: "bg-teal-50", border: "border-teal-100", href: "/admin/enquiries" },
  { icon: "🎟️", title: "Coupons", desc: "Create discount codes and offers", color: "bg-rose-50", border: "border-rose-100", href: "/admin/coupons" },
  { icon: "📊", title: "Analytics", desc: "Revenue and performance metrics", color: "bg-indigo-50", border: "border-indigo-100", href: "/admin/analytics" },
  { icon: "⚙️", title: "Settings", desc: "Website and account settings", color: "bg-slate-50", border: "border-slate-100", href: "/admin/settings" },
];

const bookings = [
  { traveller: "Rahul Sharma", tour: "Kedarnath Trek", date: "12 Jun 2026", guests: 2, status: "Confirmed", amount: "₹14,999" },
  { traveller: "Aman Singh", tour: "Spiti Valley", date: "18 Jun 2026", guests: 4, status: "Pending", amount: "₹19,999" },
  { traveller: "Neha Verma", tour: "Kashmir Tour", date: "22 Jun 2026", guests: 3, status: "Cancelled", amount: "₹23,999" },
  { traveller: "Priya Mehta", tour: "Manali Trek", date: "25 Jun 2026", guests: 2, status: "Confirmed", amount: "₹11,999" },
  { traveller: "Vikram Das", tour: "Leh Ladakh", date: "27 Jun 2026", guests: 5, status: "Pending", amount: "₹34,999" },
];

const enquiries = [
  { name: "Rahul Gupta", subject: "Need Kashmir package details", date: "Today", unread: true },
  { name: "Priya Sharma", subject: "Corporate group tour enquiry", date: "Yesterday", unread: true },
  { name: "Aman Verma", subject: "Group booking for 20 people", date: "2 days ago", unread: false },
  { name: "Sunita Roy", subject: "Honeymoon package Shimla", date: "3 days ago", unread: false },
];

const reviews = [
  { name: "Ananya Singh", tour: "Kedarnath Trek", rating: 5, text: "Absolutely breathtaking experience! The team was professional and the views were surreal." },
  { name: "Rohan Kapoor", tour: "Spiti Valley", rating: 5, text: "Best trek of my life. Nature Explorer made everything seamless and memorable." },
  { name: "Meera Joshi", tour: "Kashmir Tour", rating: 4, text: "Stunning scenery and great hospitality. Would highly recommend to everyone!" },
];

const analyticsData = [
  { label: "Revenue", value: 87, color: "bg-[#1B5E20]" },
  { label: "Bookings", value: 72, color: "bg-[#4CAF50]" },
  { label: "Visitors", value: 91, color: "bg-[#FF9800]" },
  { label: "Conversions", value: 58, color: "bg-[#1565C0]" },
];

const revenueMonths = [
  { month: "Jan", pct: 40 },
  { month: "Feb", pct: 55 },
  { month: "Mar", pct: 68 },
  { month: "Apr", pct: 60 },
  { month: "May", pct: 75 },
  { month: "Jun", pct: 90 },
];

const activities = [
  { icon: "📅", color: "bg-green-500", text: "New booking: Rahul Sharma — Kedarnath Trek", time: "2 min ago" },
  { icon: "🏔️", color: "bg-orange-500", text: "New tour added: Chopta Chandrashila Trek", time: "1 hr ago" },
  { icon: "🎟️", color: "bg-purple-500", text: "Coupon SUMMER20 created — 20% off", time: "3 hrs ago" },
  { icon: "👤", color: "bg-blue-500", text: "New customer registered: Priya Mehta", time: "5 hrs ago" },
  { icon: "⭐", color: "bg-yellow-500", text: "New 5-star review on Kashmir Tour", time: "Yesterday" },
];

const statusBadge = (status) => {
  const map = {
    Confirmed: "bg-green-100 text-green-700 border border-green-300",
    Pending: "bg-orange-100 text-orange-700 border border-orange-300",
    Cancelled: "bg-red-100 text-red-700 border border-red-300",
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long", year: "numeric", month: "long", day: "numeric",
});

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
const greetIcon = hour < 12 ? "🌅" : hour < 17 ? "☀️" : "🌙";

export default function AdminDashboard() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F4F1EA] font-[Poppins]">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1B5E20] z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-white/15 text-white shadow-inner"
                    : "text-green-200 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF9800]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all text-sm font-medium">
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl text-[#1B5E20] hover:bg-green-50 transition"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search tours, bookings…"
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F4F1EA] border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Bell */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF9800]" />
              </button>

              {/* Admin info */}
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
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-8">

          {/* Welcome Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome Back, Admin 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage tours, bookings and customers from one place.</p>
            </div>

            {/* Greeting card */}
            <div className="flex-shrink-0 bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] rounded-3xl px-5 py-4 text-white shadow-xl min-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{greetIcon}</span>
                <span className="font-semibold text-base">{greeting}!</span>
              </div>
              <p className="text-green-200 text-xs leading-snug">{today}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statsCards.map((card) => (
              <div
                key={card.label}
                className={`${card.bg} rounded-3xl p-5 text-white shadow-xl hover:scale-105 transition-transform duration-200 cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wide">{card.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{card.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shadow-inner">
                    {card.icon}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 font-semibold">{card.growth}</span>
                  <span className="text-white/70 text-xs">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-xl p-5">
            <h2 className="text-base font-bold text-[#1B5E20] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              ⚡ Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "＋ Add Tour", style: "bg-[#1B5E20] text-white hover:bg-[#2E7D32]" },
                { label: "＋ Add Destination", style: "bg-[#4CAF50] text-white hover:bg-[#388E3C]" },
                { label: "✍️ Write Blog", style: "bg-[#FF9800] text-white hover:bg-[#F57C00]" },
                { label: "🖼️ Add Gallery", style: "bg-white border border-[#1B5E20] text-[#1B5E20] hover:bg-green-50" },
                { label: "📅 View Bookings", style: "bg-white border border-[#FF9800] text-[#FF9800] hover:bg-orange-50" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className={`${btn.style} px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Management Cards */}
          <div>
            <h2 className="text-xl font-bold text-[#1B5E20] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              🗂️ Management Hub
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {managementCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group bg-white rounded-3xl shadow-xl border ${card.border} p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 block`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{card.desc}</p>
                  <div className="w-full py-2 rounded-xl bg-[#1B5E20] text-white text-xs font-semibold text-center group-hover:bg-[#4CAF50] transition-colors duration-200 shadow-sm">
                    Manage →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Analytics + Revenue Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Analytics */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-base font-bold text-[#1B5E20] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                📊 Performance Analytics
              </h2>
              <div className="space-y-5">
                {analyticsData.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-gray-800">{item.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue bar chart */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-base font-bold text-[#1B5E20] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                💹 Monthly Revenue (2026)
              </h2>
              <div className="flex items-end gap-2 h-36">
                {revenueMonths.map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-xl bg-gradient-to-t from-[#1B5E20] to-[#4CAF50] transition-all duration-500 hover:from-[#FF9800] hover:to-[#FFB74D]"
                      style={{ height: `${m.pct}%` }} />
                    <span className="text-[10px] text-gray-500 font-medium">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                📅 Recent Bookings
              </h2>
              <button className="text-xs text-[#FF9800] font-semibold hover:underline">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#F4F1EA]">
                    {["Traveller", "Tour", "Date", "Guests", "Status", "Amount"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((b, i) => (
                    <tr key={i} className="hover:bg-[#F4F1EA]/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#4CAF50] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {b.traveller[0]}
                          </div>
                          <span className="font-medium text-gray-800 whitespace-nowrap">{b.traveller}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{b.tour}</td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{b.date}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-center">{b.guests}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(b.status)}`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[#1B5E20] whitespace-nowrap">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enquiries + Reviews Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Enquiries */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  📩 Recent Enquiries
                </h2>
                <button className="text-xs text-[#FF9800] font-semibold hover:underline">View All →</button>
              </div>
              <div className="space-y-3">
                {enquiries.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-[#F4F1EA] transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9800] to-[#FFB74D] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {e.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">{e.name}</p>
                        {e.unread && <span className="w-2 h-2 rounded-full bg-[#FF9800] flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{e.subject}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{e.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-[#1B5E20]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ⭐ Latest Reviews
                </h2>
                <button className="text-xs text-[#FF9800] font-semibold hover:underline">View All →</button>
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F4F1EA] border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-800">{r.name}</p>
                      <span className="text-yellow-400 text-sm">{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="text-xs text-[#4CAF50] font-medium mb-1">{r.tour}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-base font-bold text-[#1B5E20] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              🕐 Recent Activity
            </h2>
            <div className="relative pl-5 space-y-5">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gray-100" />
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-4 h-4 rounded-full ${a.color} flex-shrink-0 relative z-10 mt-0.5 flex items-center justify-center`}>
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              🌿 <span className="font-semibold text-[#1B5E20]">Nature Explorer</span> Admin Dashboard &nbsp;·&nbsp; Version 1.0 &nbsp;·&nbsp; © 2026
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}