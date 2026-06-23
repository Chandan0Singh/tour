"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Menu, X, ChevronDown, Mountain, Search,
  Heart, ShoppingCart, User, CalendarPlus, Phone, Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Treks",
    children: [
      { label: "All Treks", href: "/treks" },
      { label: "Best Treks", href: "/treks/best" },
      { label: "Difficulty Levels", href: "/treks/difficulty" },
      { label: "Best Season", href: "/treks/season" },
    ],
  },
  {
    label: "Tours",
    children: [
      { label: "All Tours", href: "/tours" },
      { label: "Himalayan Tours", href: "/tours/himalayan" },
      { label: "Wildlife Tours", href: "/tours/wildlife" },
      { label: "Weekend Getaways", href: "/tours/weekend" },
    ],
  },
  {
    label: "Destinations",
    children: [
      { label: "Uttarakhand", href: "/destinations/uttarakhand" },
      { label: "Himachal Pradesh", href: "/destinations/himachal" },
      { label: "Kashmir", href: "/destinations/kashmir" },
      { label: "Rajasthan", href: "/destinations/rajasthan" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function DropdownMenu({ item, mobile = false, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={
          mobile
            ? "flex items-center w-full px-1 py-3 text-[15px] font-medium text-gray-800 border-b border-gray-100 hover:text-green-800 transition-colors"
            : "flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-gray-700 rounded-md hover:bg-green-50 hover:text-green-900 transition-colors"
        }
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className={mobile ? "w-full" : "relative"}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-haspopup="true"
        className={
          mobile
            ? "flex items-center justify-between w-full px-1 py-3 text-[15px] font-medium text-gray-800 border-b border-gray-100 hover:text-green-800 transition-colors"
            : "flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-gray-700 rounded-md hover:bg-green-50 hover:text-green-900 transition-colors cursor-pointer"
        }
      >
        {item.label}
        <ChevronDown
          size={13}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Desktop dropdown */}
      {open && !mobile && (
        <ul
          role="menu"
          className="absolute top-[calc(100%+8px)] left-0 z-50 min-w-[210px] bg-white border border-gray-200 rounded-xl shadow-[0_8px_24px_rgba(27,94,32,0.10)] py-1.5 list-none m-0 p-1.5 animate-[dropIn_0.15s_ease]"
        >
          {item.children.map((child) => (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-lg text-[13px] text-gray-700 hover:bg-green-50 hover:text-green-900 transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile accordion */}
      {open && mobile && (
        <ul className="pl-4 mb-1 border-l-2 border-green-200 ml-1 list-none p-0">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onClose}
                className="flex items-center px-2 py-2 text-[14px] text-gray-600 hover:text-green-800 rounded-md hover:bg-green-50 transition-colors"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header>
      {/* ── Top Bar ── */}
      <div className="bg-green-900 text-white/75 text-[11px] font-medium">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between py-1.5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={11} aria-hidden="true" />
              +91 98765 43210
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail size={11} aria-hidden="true" />
              info@natureexplorer.in
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            {["Instagram", "Facebook", "YouTube"].map((s) => (
              <a
                key={s}
                href={`https://${s.toLowerCase()}.com`}
                aria-label={s}
                className="text-white/60 hover:text-green-300 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
        aria-label="Main navigation"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Nature Explorer home"
            className="flex items-center gap-2.5 shrink-0 no-underline"
          >
            <span className="w-9 h-9 bg-green-900 rounded-lg flex items-center justify-center text-green-300 shrink-0">
              <Mountain size={20} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-[17px] font-bold text-green-900 tracking-tight">
                Nature Explorer
              </span>
              <span className="hidden sm:block text-[9px] font-medium uppercase tracking-widest text-amber-800">
                From Mountain Trails to Memorable Journeys
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center list-none m-0 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <DropdownMenu item={item} />
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {[
              { icon: <Search size={17} />, label: "Search" },
              { icon: <Heart size={17} />, label: "Wishlist" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-900 hover:border-green-200 transition-colors"
              >
                {icon}
              </button>
            ))}

            {/* Cart with notification dot */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-900 hover:border-green-200 transition-colors"
            >
              <ShoppingCart size={17} aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-orange-500 border-[1.5px] border-white"
              />
            </Link>

            <Link
              href="/account"
              aria-label="My account"
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-900 hover:border-green-200 transition-colors"
            >
              <User size={17} aria-hidden="true" />
            </Link>

            <Link
              href="/booking"
              className="flex items-center gap-1.5 bg-green-900 hover:bg-green-800 text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-colors"
            >
              <CalendarPlus size={14} aria-hidden="true" />
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-green-50 transition-colors"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <DropdownMenu
                  key={item.label}
                  item={item}
                  mobile
                  onClose={() => setMobileOpen(false)}
                />
              ))}

              <div className="flex gap-3 pt-4 mt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center border border-green-900 text-green-900 font-semibold text-[13px] py-2.5 rounded-full hover:bg-green-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-green-900 hover:bg-green-800 text-white font-semibold text-[13px] py-2.5 rounded-full transition-colors"
                >
                  <CalendarPlus size={14} aria-hidden="true" />
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Dropdown keyframe — one tiny <style> block, no external CSS needed */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}