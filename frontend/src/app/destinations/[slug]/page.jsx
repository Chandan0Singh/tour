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
    if (!slug) return;

    const fetchDestination = async () => {
      try {
        const url = `${BACKEND_URL}/api/products/${slug}`;

        console.log("Fetching:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch destination");
        }

        const data = await res.json();

        console.log("Fetched destination data:", data);

        // API array return kar rahi hai
        const destinationData = Array.isArray(data) ? data[0] : data;

        setDestination(destinationData || null);
      } catch (error) {
        console.error("Destination fetch error:", error);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  // -------------------------
  // Loading
  // -------------------------

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // -------------------------
  // Not Found
  // -------------------------

  if (!destination) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Destination Not Found
        </h1>

        <Link
          href="/destinations"
          className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  // -------------------------
  // Data
  // -------------------------

  const {
    title,
    slug: destinationSlug,
    shortDescription,
    description,
    destination: city,
    state,
    country,

    duration = {},
    difficulty,

    price,
    discountPrice,

    availableSeats,

    bannerImage,

    gallery = [],
    images = [],

    highlights = [],
    itinerary = [],

    inclusions = [],
    exclusions = [],

    thingsToCarry = [],

    departureDates = [],

    averageRating = 0,
    totalReviews = 0,
    reviews = [],

    featured,
    bestSeller,

    type,
  } = destination;

  // -------------------------
  // Price
  // -------------------------

  const hasDiscount =
    typeof discountPrice === "number" &&
    typeof price === "number" &&
    discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  // -------------------------
  // Images
  // -------------------------

  const galleryImages = [
    ...gallery.map((item) =>
      typeof item === "string" ? item : item?.url
    ),
    ...images.map((item) =>
      typeof item === "string" ? item : item?.url
    ),
  ].filter(Boolean);

  // -------------------------
  // Banner
  // -------------------------

  const heroImage =
    bannerImage ||
    galleryImages[0] ||
    "/placeholder.jpg";

  return (
    <main className="bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative h-[450px] md:h-[550px] w-full">

        <Image
          src={heroImage}
          alt={title || "Tour"}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-5 pb-12">

            {/* Badges */}

            <div className="flex flex-wrap gap-2 mb-5">

              {bestSeller && (
                <span className="px-4 py-2 rounded-full bg-green-700 text-white text-sm font-medium">
                  Bestseller
                </span>
              )}

              {featured && (
                <span className="px-4 py-2 rounded-full bg-white text-gray-800 text-sm font-medium">
                  Featured
                </span>
              )}

              {type && (
                <span className="px-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm font-medium">
                  {type}
                </span>
              )}

            </div>

            {/* Title */}

            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {title}
            </h1>

            {/* Location */}

            <p className="mt-4 text-lg md:text-xl text-white/90">
              📍 {[city, state, country].filter(Boolean).join(", ")}
            </p>

            {/* Short Description */}

            {shortDescription && (
              <p className="mt-3 max-w-2xl text-white/80 text-lg">
                {shortDescription}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-5 py-14">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="lg:col-span-2">

            {/* Overview */}

            <section>

              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                About This Tour
              </h2>

              {description && (
                <p className="text-gray-600 leading-8 text-lg">
                  {description}
                </p>
              )}

            </section>

            {/* =================================================
                TOUR INFO
            ================================================== */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

              {/* Duration */}

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Duration
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {duration?.days
                    ? `${duration.days} Days`
                    : "N/A"}
                </p>

                {duration?.nights !== undefined && (
                  <p className="text-sm text-gray-500">
                    {duration.nights} Nights
                  </p>
                )}

              </div>

              {/* Difficulty */}

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Difficulty
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {difficulty || "N/A"}
                </p>

              </div>

              {/* Seats */}

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Available Seats
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {availableSeats ?? "N/A"}
                </p>

              </div>

              {/* Rating */}

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Rating
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  ⭐ {averageRating || 0}
                </p>

                <p className="text-sm text-gray-500">
                  {totalReviews || 0} reviews
                </p>

              </div>

            </div>

            {/* =================================================
                HIGHLIGHTS
            ================================================== */}

            {highlights.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Tour Highlights
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {highlights.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-5 bg-gray-50"
                    >
                      <div className="flex gap-3">

                        <span className="text-green-700">
                          ✓
                        </span>

                        <p className="text-gray-700">
                          {item}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                ITINERARY
            ================================================== */}

            {itinerary.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Itinerary
                </h2>

                <div className="space-y-5">

                  {itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-6"
                    >

                      <div className="flex gap-4">

                        <div className="w-10 h-10 shrink-0 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                          {day.day ?? index + 1}
                        </div>

                        <div>

                          <h3 className="text-xl font-semibold text-gray-900">
                            {day.title ||
                              `Day ${index + 1}`}
                          </h3>

                          {day.description && (
                            <p className="mt-2 text-gray-600 leading-7">
                              {day.description}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                INCLUSIONS / EXCLUSIONS
            ================================================== */}

            {(inclusions.length > 0 ||
              exclusions.length > 0) && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Inclusions & Exclusions
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Included */}

                  {inclusions.length > 0 && (
                    <div className="border rounded-xl p-6">

                      <h3 className="text-xl font-semibold text-green-700 mb-4">
                        What's Included
                      </h3>

                      <ul className="space-y-3">

                        {inclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-gray-700"
                          >
                            <span className="text-green-700">
                              ✓
                            </span>

                            {item}
                          </li>
                        ))}

                      </ul>

                    </div>
                  )}

                  {/* Excluded */}

                  {exclusions.length > 0 && (
                    <div className="border rounded-xl p-6">

                      <h3 className="text-xl font-semibold text-red-600 mb-4">
                        What's Not Included
                      </h3>

                      <ul className="space-y-3">

                        {exclusions.map((item, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-gray-700"
                          >
                            <span className="text-red-600">
                              ✕
                            </span>

                            {item}
                          </li>
                        ))}

                      </ul>

                    </div>
                  )}

                </div>

              </section>
            )}

            {/* =================================================
                THINGS TO CARRY
            ================================================== */}

            {thingsToCarry.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Things to Carry
                </h2>

                <div className="flex flex-wrap gap-3">

                  {thingsToCarry.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border rounded-full bg-gray-50 text-gray-700"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                GALLERY
            ================================================== */}

            {galleryImages.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Gallery
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-72 rounded-xl overflow-hidden"
                    >

                      <Image
                        src={image}
                        alt={`${title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />

                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                DEPARTURE DATES
            ================================================== */}

            {departureDates.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Departure Dates
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                  {departureDates.map((date, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-5"
                    >
                      <p className="text-sm text-gray-500">
                        Departure
                      </p>

                      <p className="mt-2 font-semibold">
                        {new Date(date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                FAQ
            ================================================== */}

            {destination.faqs?.length > 0 && (
              <section className="mt-16">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">

                  {destination.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-6"
                    >

                      <h3 className="font-semibold text-lg">
                        {faq.question}
                      </h3>

                      <p className="mt-3 text-gray-600 leading-7">
                        {faq.answer}
                      </p>

                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* =================================================
                REVIEWS
            ================================================== */}

            <section className="mt-16">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Reviews
              </h2>

              {reviews.length === 0 ? (
                <div className="border rounded-xl p-8 text-center">

                  <p className="text-gray-500">
                    No reviews yet.
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Be the first to review this tour.
                  </p>

                </div>
              ) : (
                <div className="space-y-5">

                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-6"
                    >

                      <div className="flex justify-between">

                        <h3 className="font-semibold">
                          {review.userName ||
                            "Anonymous"}
                        </h3>

                        <span>
                          ⭐ {review.rating || 0}
                        </span>

                      </div>

                      {review.comment && (
                        <p className="mt-3 text-gray-600">
                          {review.comment}
                        </p>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </section>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside>

            <div className="sticky top-28 border rounded-2xl p-7 shadow-lg bg-white">

              {/* Price */}

              <div>

                <p className="text-sm text-gray-500">
                  Starting from
                </p>

                <div className="flex items-center flex-wrap gap-3 mt-2">

                  <span className="text-3xl font-bold text-green-700">
                    ₹{finalPrice?.toLocaleString("en-IN")}
                  </span>

                  {hasDiscount && (
                    <span className="text-gray-400 line-through">
                      ₹{price?.toLocaleString("en-IN")}
                    </span>
                  )}

                </div>

                {hasDiscount && (
                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  Per person
                </p>

              </div>

              <hr className="my-6" />

              {/* Details */}

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    📍 Location
                  </span>

                  <span className="font-medium text-right">
                    {city}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    🗓 Duration
                  </span>

                  <span className="font-medium">
                    {duration?.days
                      ? `${duration.days}D / ${
                          duration.nights ?? 0
                        }N`
                      : "N/A"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    🎯 Difficulty
                  </span>

                  <span className="font-medium">
                    {difficulty || "N/A"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    👥 Seats
                  </span>

                  <span className="font-medium">
                    {availableSeats ?? "N/A"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    ⭐ Rating
                  </span>

                  <span className="font-medium">
                    {averageRating || 0}
                  </span>

                </div>

              </div>

              {/* Booking */}

              <button
                disabled={availableSeats === 0}
                className="w-full mt-8 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition"
              >
                {availableSeats === 0
                  ? "Sold Out"
                  : "Book Now"}
              </button>

              <Link
                href="/contact"
                className="block mt-4 w-full text-center border border-gray-300 hover:bg-gray-50 py-4 rounded-xl font-medium transition"
              >
                Enquire Now
              </Link>

              {/* Availability */}

              {typeof availableSeats === "number" && (
                <p className="text-center text-sm text-gray-500 mt-5">
                  {availableSeats > 0
                    ? `${availableSeats} seats available`
                    : "This tour is currently sold out"}
                </p>
              )}

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}