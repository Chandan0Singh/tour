"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  const {
    _id,
    slug,
    title,
    type,
    destination,
    state,
    country,
    shortDescription,
    description,
    bannerImage,
    images = [],
    gallery = [],
    price,
    discountPrice,
    duration,
    difficulty,
    availableSeats,
    averageRating = 0,
    totalReviews = 0,
    featured,
    bestSeller,
  } = product;

  const firstImage =
    images?.[0]?.url ||
    images?.[0] ||
    gallery?.[0]?.url ||
    gallery?.[0] ||
    bannerImage ||
    "/placeholder.jpg";

  const finalPrice = discountPrice || price || 0;

  const hasDiscount = discountPrice && price && discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  // const stateSlug = String(
  //     state || destination || "destination"
  // )
  //     .trim()
  //     .toLowerCase()
  //     .replace(/\s+/g, "-");

  // const productSlug = slug || _id;

  // const detailUrl = `/destinations/${stateSlug}/${productSlug}`;

  const routeMap = {
    tour: "tours",
    trek: "treks",
    destination: "destinations",
  };

  const stateSlug = String(state || destination || "destination")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const productSlug = slug || _id;

  const baseRoute = routeMap[type?.toLowerCase()] || "destinations";

  const detailUrl = `/${baseRoute}/${stateSlug}/${productSlug}`;

  return (
    <article className="group overflow-hidden border border-[#E4E0D8] bg-white">
      {/* Image */}
      <Link href={detailUrl} className="block">
        <div className="relative h-[260px] overflow-hidden bg-gray-100">
          <img
            src={firstImage}
            alt={title || "Tour"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {bestSeller && (
              <span className="bg-[#5E6B58] px-3 py-1.5 text-[11px] uppercase tracking-wider text-white">
                Bestseller
              </span>
            )}

            {featured && (
              <span className="bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#5E6B58]">
                Featured
              </span>
            )}
          </div>

          {/* Discount */}
          {hasDiscount && (
            <span className="absolute right-4 top-4 bg-white px-3 py-1.5 text-xs font-semibold text-[#2E2E2A]">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Type */}
        {type && (
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#5E6B58]">
            {type}
          </p>
        )}

        {/* Title */}
        <Link href={detailUrl}>
          <h3 className="font-['Playfair_Display'] text-2xl leading-tight transition-colors hover:text-[#5E6B58]">
            {title || "Untitled Tour"}
          </h3>
        </Link>

        {/* Location */}
        {(destination || state || country) && (
          <p className="mt-3 text-sm text-gray-500">
            {[destination, state, country].filter(Boolean).join(", ")}
          </p>
        )}

        {/* Description */}
        {(shortDescription || description) && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
            {shortDescription || description}
          </p>
        )}

        {/* Quick Info */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#E4E0D8] pt-5">
          {duration?.days && (
            <div className="text-sm">
              <span className="text-gray-400">Duration</span>

              <span className="ml-2 font-medium">
                {duration.days}D
                {duration.nights !== undefined && ` / ${duration.nights}N`}
              </span>
            </div>
          )}

          {difficulty && (
            <div className="text-sm">
              <span className="text-gray-400">Difficulty</span>

              <span className="ml-2 font-medium">{difficulty}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm">★</span>

          <span className="text-sm font-medium">
            {Number(averageRating).toFixed(1)}
          </span>

          <span className="text-sm text-gray-400">
            ({totalReviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            {hasDiscount && (
              <p className="text-sm text-gray-400 line-through">
                ₹{Number(price).toLocaleString("en-IN")}
              </p>
            )}

            <p className="text-2xl font-semibold">
              ₹{Number(finalPrice).toLocaleString("en-IN")}
            </p>

            <p className="mt-0.5 text-xs text-gray-400">per person</p>
          </div>

          <Link
            href={detailUrl}
            className="bg-[#5E6B58] px-5 py-3 text-sm uppercase tracking-wider text-white transition-colors hover:bg-[#4d5949]"
          >
            View Tour
          </Link>
        </div>

        {/* Seats */}
        {availableSeats !== undefined && (
          <div className="mt-4">
            {availableSeats > 0 ? (
              <p className="text-xs text-gray-500">
                <span className="font-medium text-[#5E6B58]">
                  {availableSeats}
                </span>{" "}
                seats available
              </p>
            ) : (
              <p className="text-xs font-medium text-red-600">Sold Out</p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
