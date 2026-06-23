import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#16361d] text-white">
      <div className="container mx-auto px-4">
        {/* Top Footer */}
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Nature Explorer
            </h2>

            <p className="text-sm leading-7 text-gray-300">
              From Mountain Trails to Memorable Journeys. Explore the beauty of
              nature through curated trekking adventures and unforgettable
              travel experiences.
            </p>

            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>

              <a href="#" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/treks">Treks</Link>
              </li>
              <li>
                <Link href="/tours">Tours</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Popular Treks */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Popular Treks</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="#">Kedarkantha Trek</Link>
              </li>
              <li>
                <Link href="#">Valley of Flowers</Link>
              </li>
              <li>
                <Link href="#">Har Ki Dun</Link>
              </li>
              <li>
                <Link href="#">Brahmatal Trek</Link>
              </li>
              <li>
                <Link href="#">Dayara Bugyal</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact Us</h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <p>Dehradun, Uttarakhand, India</p>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="shrink-0" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="shrink-0" />
                <p>info@natureexplorer.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 py-10">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            <div>
              <h3 className="text-2xl font-semibold">
                Subscribe To Our Newsletter
              </h3>

              <p className="mt-2 text-gray-300">
                Get updates about upcoming treks and travel offers.
              </p>
            </div>

            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 outline-none"
              />

              <button
                type="submit"
                className="rounded-full bg-orange-500 px-8 py-3 font-medium text-white transition hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Nature Explorer. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}