"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BACKEND_URL } from "@/keyword";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/products?limit=100`
      );

      const data = await res.json();

      if (data.success) {
        setDestinations(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xl">
        Loading destinations...
      </div>
    );
  }

  return (
    <main className="bg-[#F4F1EA] min-h-screen">
      {/* Hero */}
      <section className="bg-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold">Top Destinations</h1>
          <p className="mt-4 text-lg text-green-100">
            Discover the most beautiful places across India.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <Link
              key={item._id}
              href={`/destinations/${item.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={
                    item.bannerImage ||
                    item.images?.[0]?.url ||
                    "/placeholder.jpg"
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-green-700 font-medium">
                  {item.destination}
                </span>

                <h2 className="text-2xl font-bold mt-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {item.shortDescription}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <div>
                    <p className="text-green-700 text-xl font-bold">
                      ₹{item.discountPrice || item.price}
                    </p>

                    {item.discountPrice && (
                      <p className="line-through text-gray-400 text-sm">
                        ₹{item.price}
                      </p>
                    )}
                  </div>

                  <span className="text-yellow-500">
                    ⭐ {item.averageRating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!destinations.length && (
          <div className="text-center text-gray-500 py-20">
            No destinations found.
          </div>
        )}
      </section>
    </main>
  );
}
