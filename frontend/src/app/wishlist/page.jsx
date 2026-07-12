"use client";

import { useState } from "react";
import { Heart, MapPin, Clock, Users, ShoppingBag, Star } from "lucide-react";

// ---- static placeholder data ---------------------------------------
// Swap this out for a real fetch (e.g. GET /api/wishlist/:userId) whenever
// the wishlist backend is ready — the rest of the page won't need to change.

const INITIAL_WISHLIST = [
  {
    id: "w1",
    type: "Trek",
    title: "Kedarkantha Trek",
    location: "Uttarakhand",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    groupSize: "Up to 15",
    price: 6999,
    originalPrice: 8499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
  },
  {
    id: "w2",
    type: "Trek",
    title: "Hampta Pass Trek",
    location: "Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate",
    groupSize: "Up to 12",
    price: 7999,
    originalPrice: null,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
  {
    id: "w3",
    type: "Tour",
    title: "Kashmir Valley Tour",
    location: "Jammu & Kashmir",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    groupSize: "Up to 20",
    price: 14999,
    originalPrice: 17999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80",
  },
  {
    id: "w4",
    type: "Trek",
    title: "Valley of Flowers Trek",
    location: "Uttarakhand",
    duration: "6 Days / 5 Nights",
    difficulty: "Easy",
    groupSize: "Up to 15",
    price: 8999,
    originalPrice: null,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  },
  {
    id: "w5",
    type: "Tour",
    title: "Goa Beach Tour",
    location: "Goa",
    duration: "4 Days / 3 Nights",
    difficulty: "Easy",
    groupSize: "Up to 25",
    price: 7999,
    originalPrice: 9499,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="py-16 border-b border-[#E4E0D8]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[4px] text-[#5E6B58] text-sm mb-3">
            Saved For Later
          </p>
          <h1
            className="text-5xl text-[#2D2D2D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Wishlist
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            {wishlist.length > 0
              ? `${wishlist.length} ${wishlist.length === 1 ? "trip" : "trips"} you've saved to plan for later.`
              : "Treks and tours you save will show up here."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {wishlist.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#E4E0D8]">
            <div className="w-16 h-16 rounded-full bg-[#F8F5EE] border border-[#E4E0D8] flex items-center justify-center mx-auto mb-5">
              <Heart size={26} className="text-[#5E6B58]" />
            </div>
            <h2
              className="text-3xl text-[#2D2D2D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Wishlist is Empty
            </h2>
            <p className="mt-4 text-gray-500">
              Tap the heart icon on any trek or tour to save it here.
            </p>
            <a
              href="/treks"
              className="inline-block mt-6 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px]"
            >
              Explore Treks &amp; Tours
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E4E0D8] group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors"
                  >
                    <Heart size={17} className="fill-[#C97B63] text-[#C97B63]" />
                  </button>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-[1px] text-[#5E6B58]">
                    {item.type}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPin size={13} />
                    {item.location}
                  </div>

                  <h3
                    className="text-xl text-[#2D2D2D] mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} />
                      {item.groupSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={13} className="fill-[#5E6B58] text-[#5E6B58]" />
                      {item.rating}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#E4E0D8]">
                    <div>
                      {item.originalPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-lg font-semibold text-[#2D2D2D]">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#5E6B58] text-white text-xs uppercase tracking-[1px] hover:bg-[#4b5847] transition-colors">
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}