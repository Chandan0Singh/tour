"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/keyword";

export default function DestinationDetailPage() {
  const { slug } = useParams();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  const fetchDestination = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/products/${slug}`
      );

      const data = await res.json();

      setDestination(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="py-24 text-center text-red-500">
        Destination Not Found
      </div>
    );
  }

  return (
    <>
      {/* Banner */}

      <section className="relative h-[450px]">
        <Image
          src={
            destination.bannerImage ||
            destination.images?.[0]?.url ||
            "/placeholder.jpg"
          }
          alt={destination.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">
              {destination.title}
            </h1>

            <p className="mt-4 text-lg">
              {destination.destination}
            </p>
          </div>
        </div>
      </section>

      {/* Main */}

      <section className="max-w-7xl mx-auto px-5 py-16">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left */}

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold mb-6">
              About Destination
            </h2>

            <p className="leading-8 text-gray-700">
              {destination.description}
            </p>

            {/* Gallery */}

            {destination.images?.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mt-16 mb-6">
                  Gallery
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {destination.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-72 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Highlights */}

            {destination.highlights?.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mt-16 mb-6">
                  Highlights
                </h2>

                <ul className="space-y-3">
                  {destination.highlights.map((item, index) => (
                    <li key={index}>
                      ✅ {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* FAQ */}

            {destination.faqs?.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mt-16 mb-6">
                  FAQs
                </h2>

                <div className="space-y-6">
                  {destination.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-5"
                    >
                      <h4 className="font-semibold">
                        {faq.question}
                      </h4>

                      <p className="mt-2 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}

          <div>

            <div className="sticky top-28 border rounded-xl p-8 shadow">

              <h3 className="text-3xl font-bold text-green-700">

                ₹{destination.discountPrice || destination.price}

              </h3>

              {destination.discountPrice && (
                <p className="line-through text-gray-500">
                  ₹{destination.price}
                </p>
              )}

              <div className="space-y-3 mt-6">

                <p>
                  📍 {destination.destination}
                </p>

                <p>
                  ⛰ {destination.altitude} m
                </p>

                <p>
                  ⭐ {destination.averageRating}
                </p>

                <p>
                  👥 {destination.groupSize?.min} - {destination.groupSize?.max}
                </p>

                <p>
                  🎯 {destination.difficulty}
                </p>

              </div>

              <button className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg">
                Book Now
              </button>

              <Link
                href="/contact"
                className="block mt-4 text-center border py-3 rounded-lg"
              >
                Enquire Now
              </Link>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}
