"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { id: 1, label: "Dashboard", href: "/admin", icon: "📊" },
  { id: 2, label: "Packages", href: "/admin/packages", icon: "📦" },
  { id: 3, label: "Bookings", href: "/admin/bookings", icon: "📅" },
  { id: 4, label: "Customers", href: "/admin/customers", icon: "👥" },
  { id: 5, label: "Enquiries", href: "/admin/enquiries", icon: "💬" },
  { id: 6, label: "Destinations", href: "/admin/destinations", icon: "📍" },
  { id: 7, label: "Blogs", href: "/admin/blogs", icon: "📝" },
  { id: 8, label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
  { id: 9, label: "Reviews", href: "/admin/reviews", icon: "⭐" },
  { id: 10, label: "Users", href: "/admin/users", icon: "👤" },
  { id: 11, label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { id: 12, label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-[#1B5E20] px-4 py-4 shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF9800]">
            🌿
          </div>

          <div>
            <p className="font-bold text-white">
              Nature Explorer
            </p>
            <p className="text-xs text-green-300">
              Admin Panel
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg bg-white/10 px-3 py-2 text-xl text-white"
        >
          ☰
        </button>
      </header>

      <div className="flex min-h-screen">

        {/* Overlay Mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-[#1B5E20] transition-transform duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
            lg:static lg:translate-x-0`}
        >

          {/* Logo */}
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF9800] text-xl shadow-lg">
                🌿
              </div>

              <div>
                <p
                  className="text-base font-bold leading-tight text-white"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Nature Explorer
                </p>

                <p className="text-xs text-green-300">
                  Admin Panel
                </p>
              </div>

            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">

            {menuItems.map((item) => {

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-white/15 text-white shadow-inner"
                        : "text-green-200 hover:bg-white/10 hover:text-white"
                    }`}
                >

                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span>
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#FF9800]" />
                  )}

                </Link>
              );
            })}

          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-white/10 px-4 py-4">

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-300 transition-all hover:bg-red-900/30 hover:text-red-200"
            >
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </button>

          </div>

        </aside>

        {/* Admin Content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}