"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-wrapper">

        <Link href="/" className="logo">
          <span>🌿</span>
          Nature Explorer
        </Link>

        <nav className={`nav ${open ? "active" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>

          <div className="dropdown">
            <button>
              Treks <ChevronDown size={16} />
            </button>
          </div>

          <div className="dropdown">
            <button>
              Tours <ChevronDown size={16} />
            </button>
          </div>

          <Link href="/blogs">Blogs</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link href="/login" className="login-btn">
            Login
          </Link>

          <Link href="/booking" className="book-btn">
            Book Now
          </Link>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>
    </header>
  );
}