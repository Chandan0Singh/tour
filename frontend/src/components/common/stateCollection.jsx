"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/keyword";

export default function DestinationPage() {
  const params = useParams();

  const state = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) return;

    fetchProducts();
  }, [state]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const decodedState = decodeURIComponent(state);

      const apiUrl = `${BACKEND_URL}/api/products/${decodedState}`;

      const res = await fetch(apiUrl, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(
          `API request failed: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.data)) {
        setProducts(data.data);
      } else {
        console.error("Expected array but received:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load destinations.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Convert URL state into nice heading.
   *
   * delhi      -> Delhi
   * himachal   -> Himachal
   * uttarakhand -> Uttarakhand
   */
  const stateName = state
    ? decodeURIComponent(state)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Destinations";

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-[#2E2E2A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative bg-[#5E6B58] py-20 md:py-28">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-white/70 text-sm uppercase tracking-[0.25em]">
            Explore India
          </p>

          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl text-white font-medium mt-4">
            {stateName}
          </h1>

          <p className="text-white/80 max-w-2xl mt-5 text-lg leading-8">
            Discover our handpicked tours and travel experiences
            in {stateName}.
          </p>

        </div>

      </section>


      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">

        {/* TOP BAR */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <p className="text-sm uppercase tracking-[0.2em] text-[#5E6B58]">
              Destinations
            </p>

            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mt-2">
              Tours in {stateName}
            </h2>

          </div>

          {!loading && !error && (
            <p className="text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "tour" : "tours"} available
            </p>
          )}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {[1, 2, 3].map((item) => (
              <ProductSkeleton key={item} />
            ))}

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (

          <div className="bg-white border border-[#E4E0D8] p-10 text-center">

            <h2 className="font-['Playfair_Display'] text-2xl">
              Something went wrong
            </h2>

            <p className="text-gray-500 mt-3">
              {error}
            </p>

            <button
              onClick={fetchProducts}
              className="inline-block mt-6 bg-[#5E6B58] text-white px-6 py-3"
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && !error && products.length === 0 && (

          <div className="bg-white border border-[#E4E0D8] p-12 text-center">

            <h2 className="font-['Playfair_Display'] text-3xl">
              No Tours Found
            </h2>

            <p className="text-gray-500 mt-3">
              We couldn't find any tours in {stateName}.
            </p>

            <Link
              href="/destinations"
              className="inline-block mt-6 bg-[#5E6B58] text-white px-6 py-3"
            >
              View All Destinations
            </Link>

          </div>

        )}


        {/* =================================================
            PRODUCT ARRAY
        ================================================= */}

        {!loading && !error && products.length > 0 && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {products.map((product) => (

              <ProductCard
                key={product?._id || product?.slug}
                product={product}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product }) {

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


  /* ==========================================================
     IMAGE
  ========================================================== */

  const firstImage =
    images?.[0]?.url ||
    images?.[0] ||
    gallery?.[0]?.url ||
    gallery?.[0] ||
    bannerImage ||
    "/placeholder.jpg";


  /* ==========================================================
     PRICE
  ========================================================== */

  const finalPrice =
    discountPrice || price || 0;

  const hasDiscount =
    discountPrice &&
    price &&
    discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((price - discountPrice) / price) * 100
      )
    : 0;


  /* ==========================================================
     DETAIL URL
     
     Since this is now a state listing page,
     individual product can go to:
     
     /destinations/delhi/golden-triangle-tour
     
     ========================================================== */

  const stateSlug =
    String(state || destination || "destination")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

  const productSlug =
    slug ||
    _id;


  const detailUrl =
    `/destinations/${stateSlug}/${productSlug}`;


  return (

    <article className="group bg-white border border-[#E4E0D8] overflow-hidden">

      {/* ==================================================
          IMAGE
      ================================================== */}

      <Link
        href={detailUrl}
        className="block"
      >

        <div className="relative h-[260px] overflow-hidden bg-gray-100">

          <img
            src={firstImage}
            alt={title || "Tour"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />


          {/* IMAGE OVERLAY */}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />


          {/* BADGES */}

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">

            {bestSeller && (
              <span className="bg-[#5E6B58] text-white px-3 py-1.5 text-[11px] uppercase tracking-wider">
                Bestseller
              </span>
            )}

            {featured && (
              <span className="bg-white text-[#5E6B58] px-3 py-1.5 text-[11px] uppercase tracking-wider">
                Featured
              </span>
            )}

          </div>


          {/* DISCOUNT */}

          {hasDiscount && (

            <span className="absolute top-4 right-4 bg-white text-[#2E2E2A] px-3 py-1.5 text-xs font-semibold">
              {discountPercentage}% OFF
            </span>

          )}

        </div>

      </Link>


      {/* ==================================================
          CARD CONTENT
      ================================================== */}

      <div className="p-6">


        {/* TYPE */}

        {type && (

          <p className="text-[11px] uppercase tracking-[0.18em] text-[#5E6B58] mb-2">
            {type}
          </p>

        )}


        {/* TITLE */}

        <Link href={detailUrl}>

          <h3 className="font-['Playfair_Display'] text-2xl leading-tight hover:text-[#5E6B58] transition-colors">
            {title || "Untitled Tour"}
          </h3>

        </Link>


        {/* LOCATION */}

        {(destination || state || country) && (

          <p className="text-sm text-gray-500 mt-3">

            {[destination, state, country]
              .filter(Boolean)
              .join(", ")}

          </p>

        )}


        {/* DESCRIPTION */}

        {(shortDescription || description) && (

          <p className="text-gray-600 text-sm leading-6 mt-4 line-clamp-2">
            {shortDescription || description}
          </p>

        )}


        {/* ==================================================
            QUICK INFO
        ================================================== */}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-5 border-t border-[#E4E0D8]">

          {duration?.days && (

            <div className="text-sm">

              <span className="text-gray-400">
                Duration
              </span>

              <span className="ml-2 font-medium">
                {duration.days}D
                {duration.nights !== undefined &&
                  ` / ${duration.nights}N`}
              </span>

            </div>

          )}


          {difficulty && (

            <div className="text-sm">

              <span className="text-gray-400">
                Difficulty
              </span>

              <span className="ml-2 font-medium">
                {difficulty}
              </span>

            </div>

          )}

        </div>


        {/* ==================================================
            RATING
        ================================================== */}

        <div className="flex items-center gap-2 mt-4">

          <span className="text-sm">
            ★
          </span>

          <span className="font-medium text-sm">
            {Number(averageRating).toFixed(1)}
          </span>

          <span className="text-gray-400 text-sm">
            ({totalReviews} reviews)
          </span>

        </div>


        {/* ==================================================
            PRICE + BUTTON
        ================================================== */}

        <div className="flex items-end justify-between gap-4 mt-6">

          <div>

            {hasDiscount && (

              <p className="text-sm text-gray-400 line-through">
                ₹{Number(price).toLocaleString("en-IN")}
              </p>

            )}

            <p className="text-2xl font-semibold">
              ₹{Number(finalPrice).toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-gray-400 mt-0.5">
              per person
            </p>

          </div>


          <Link
            href={detailUrl}
            className="bg-[#5E6B58] hover:bg-[#4d5949] text-white px-5 py-3 text-sm uppercase tracking-wider transition-colors"
          >
            View Tour
          </Link>

        </div>


        {/* AVAILABLE SEATS */}

        {availableSeats !== undefined && (

          <div className="mt-4">

            {availableSeats > 0 ? (

              <p className="text-xs text-gray-500">
                <span className="text-[#5E6B58] font-medium">
                  {availableSeats}
                </span>{" "}
                seats available
              </p>

            ) : (

              <p className="text-xs text-red-600 font-medium">
                Sold Out
              </p>

            )}

          </div>

        )}

      </div>

    </article>

  );
}


/* ============================================================
   LOADING SKELETON
============================================================ */

function ProductSkeleton() {

  return (

    <div className="bg-white border border-[#E4E0D8] overflow-hidden animate-pulse">

      <div className="h-[260px] bg-gray-200" />

      <div className="p-6">

        <div className="h-3 bg-gray-200 w-20 mb-4" />

        <div className="h-7 bg-gray-200 w-3/4 mb-3" />

        <div className="h-4 bg-gray-200 w-1/2 mb-5" />

        <div className="h-4 bg-gray-200 w-full mb-2" />

        <div className="h-4 bg-gray-200 w-4/5 mb-6" />

        <div className="border-t border-gray-100 pt-5">

          <div className="h-4 bg-gray-200 w-1/3 mb-4" />

          <div className="h-7 bg-gray-200 w-1/2" />

        </div>

      </div>

    </div>

  );
}

