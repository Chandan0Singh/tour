"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLoginModal from "./AdminLoginModal";

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
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const adminAuthenticated =
      localStorage.getItem("adminAuthenticated");

    if (adminAuthenticated === "true") {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("adminAuthenticated", "true");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");

    setAuthenticated(false);
    setSidebarOpen(false);
  };

  // Authentication check
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-800" />

          <p className="text-sm text-gray-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in → show login popup
  if (!authenticated) {
    return (
      <AdminLoginModal
        onSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-[#1B5E20] px-4 py-4 shadow lg:hidden">

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
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg bg-white/10 px-3 py-2 text-xl text-white"
        >
          ☰
        </button>
      </header>

      <div className="flex min-h-screen">

        {/* Mobile Overlay */}
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
              onClick={handleLogout}
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