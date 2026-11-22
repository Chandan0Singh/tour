
"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/keyword";

export default function DestinationHero({ stateName }) {
    const [destination, setDestination] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!stateName) return;

        const fetchDestination = async () => {
            try {
                setLoading(true);

                const slug = encodeURIComponent(
                    stateName.toLowerCase().trim().replace(/\s+/g, "-")
                );

                const response = await fetch(
                    `${BACKEND_URL}/api/destinations/${slug}`
                );

                if (!response.ok) {
                    throw new Error("Destination not found");
                }

                const data = await response.json();

                setDestination(data.destination);
                setCurrentImage(0);
            } catch (error) {
                console.error("DESTINATION HERO ERROR:", error);
                setDestination(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [stateName]);

    // Automatically change banner image
    useEffect(() => {
        if (!destination?.bannerImage?.length) return;

        if (destination.bannerImage.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImage((prev) =>
                (prev + 1) % destination.bannerImage.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [destination]);

    // Loading state
    if (loading) {
        return (
            <section className="relative flex min-h-[350px] items-center bg-[#5E6B58] py-20 md:min-h-[450px] md:py-28">
                <div className="mx-auto w-full max-w-7xl animate-pulse px-6">
                    <div className="h-4 w-32 rounded bg-white/20" />
                    <div className="mt-6 h-12 w-72 max-w-full rounded bg-white/20 md:h-16" />
                    <div className="mt-6 h-5 w-full max-w-xl rounded bg-white/20" />
                </div>
            </section>
        );
    }

    const images = destination?.bannerImage || [];
    const activeImage = images[currentImage];

    return (
        <section className="relative isolate flex min-h-[400px] items-center overflow-hidden bg-[#5E6B58] py-20 md:min-h-[520px] md:py-28">

            {/* Background images */}
            {activeImage && (
                <div
                    className="absolute inset-0 -z-20 bg-cover bg-center transition-all duration-700"
                    style={{
                        backgroundImage: `url("${activeImage}")`,
                    }}
                />
            )}

            {/* Background overlay */}
            <div className="absolute inset-0 -z-10 bg-black/50" />

            {/* Content */}
            <div className="mx-auto w-full max-w-7xl px-6">

                <p className="text-sm uppercase tracking-[0.25em] text-white/80">
                    Explore {destination?.country || "India"}
                </p>

                <h1 className="mt-4 max-w-4xl font-['Playfair_Display'] text-4xl font-medium text-white md:text-6xl lg:text-7xl">
                    {destination?.heroTitle || stateName}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/90 md:text-lg">
                    {destination?.heroSubtitle ||
                        destination?.description ||
                        `Discover our handpicked tours and travel experiences in ${stateName}.`}
                </p>

                {/* Image indicators */}
                {images.length > 1 && (
                    <div className="mt-8 flex items-center gap-3">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentImage(index)}
                                aria-label={`Show banner ${index + 1}`}
                                aria-current={currentImage === index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentImage === index
                                        ? "w-10 bg-white"
                                        : "w-2 bg-white/50 hover:bg-white/80"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
