"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { BACKEND_URL } from "@/keyword";

import DestinationHero from "../../../components/productpage/DestinationHero";
import ProductCard from "../../../components/productpage/ProductCard";
import ProductSkeleton from "../../../components/productpage/ProductSkeleton";

export default function DestinationPage() {
    const params = useParams();

    const state = Array.isArray(params?.slug)
        ? params.slug[0]
        : params?.slug;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    let stateName = state
        ? decodeURIComponent(state)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
        : "Destinations";

        if (stateName === "Jammu And Kashmir") {
    stateName = stateName.replace("And", "&");
}

        console.log("stateName :", stateName)

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

            console.log("Current state:", decodedState);
            console.log("API URL:", apiUrl);

            const res = await fetch(apiUrl, {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(
                    `API request failed: ${res.status} ${res.statusText}`
                );
            }

            const data = await res.json();

            console.log("Full API response:", data);

            if (Array.isArray(data)) {
                setProducts(data);
            } else if (Array.isArray(data?.data)) {
                setProducts(data.data);
            } else {
                console.error(
                    "Expected array but received:",
                    data
                );

                setProducts([]);
            }

        } catch (err) {
            console.error(
                "Failed to fetch products:",
                err
            );

            setError("Unable to load destinations.");
            setProducts([]);

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8F5EE] text-[#2E2E2A]">

            <DestinationHero stateName={stateName} />

            <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">

                {/* Top Bar */}
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#5E6B58]">
                            Destinations
                        </p>

                        <h2 className="mt-2 font-['Playfair_Display'] text-3xl md:text-4xl">
                            Tours in {stateName}
                        </h2>
                    </div>

                    {!loading && !error && (
                        <p className="text-gray-500">
                            {products.length}{" "}
                            {products.length === 1
                                ? "tour"
                                : "tours"}{" "}
                            available
                        </p>
                    )}

                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <ProductSkeleton key={item} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="border border-[#E4E0D8] bg-white p-10 text-center">

                        <h2 className="font-['Playfair_Display'] text-2xl">
                            Something went wrong
                        </h2>

                        <p className="mt-3 text-gray-500">
                            {error}
                        </p>

                        <button
                            onClick={fetchProducts}
                            className="mt-6 bg-[#5E6B58] px-6 py-3 text-white"
                        >
                            Try Again
                        </button>

                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    products.length === 0 && (
                        <div className="border border-[#E4E0D8] bg-white p-12 text-center">

                            <h2 className="font-['Playfair_Display'] text-3xl">
                                No Tours Found
                            </h2>

                            <p className="mt-3 text-gray-500">
                                We couldn't find any tours in{" "}
                                {stateName}.
                            </p>

                            <Link
                                href="/destinations"
                                className="mt-6 inline-block bg-[#5E6B58] px-6 py-3 text-white"
                            >
                                View All Destinations
                            </Link>

                        </div>
                    )}

                {/* Products */}
                {!loading &&
                    !error &&
                    products.length > 0 && (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {products.map((product) => (
                                <ProductCard
                                    key={
                                        product?._id ||
                                        product?.slug
                                    }
                                    product={product}
                                />
                            ))}

                        </div>
                    )}

            </section>
        </main>
    );
}