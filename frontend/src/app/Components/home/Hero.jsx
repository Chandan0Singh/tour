"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2000",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000",
  "https://images.unsplash.com/photo-1464278533981-50106e6176b1?q=80&w=2000",
];

export default function Hero({ data }) {
  const hero = data?.hero;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [
    hero?.backgroundImage || HERO_IMAGES[0],
    ...HERO_IMAGES.slice(1),
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const showSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <section
      className="tour-hero"
      aria-label="Featured travel destinations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((image, index) => (
        <div
          key={`hero-slide-${index}`}
          className="tour-hero__image"
          aria-hidden="true"
          style={{
            backgroundImage: `url("${image}")`,
            opacity: activeSlide === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
      <div className="tour-hero__shade" />
      <div className="tour-container tour-hero__content">
        <p className="tour-kicker">YOUR ADVENTURE, OUR EXPERTISE</p>
        <h1>
          {hero?.title || "Explore Uttarakhand"}
          <br />
          <span>{hero?.subtitle || "with Laviadventure"}</span>
        </h1>
        <p className="tour-hero__description">
          {hero?.description ||
            "From thrilling treks to peaceful getaways, we craft unforgettable travel experiences in the Himalayas."}
        </p>
        <div className="tour-proof">
          <span>
            <MapPin size={14} /> Expert Local Guides
          </span>
          <span>
            <CheckCircle2 size={14} /> Best Price Guarantee
          </span>
          <span>
            <ShieldCheck size={14} /> Safe & Secure Travel
          </span>
        </div>
        <div className="tour-actions">
          <Link
            className="tour-button tour-button--green"
            href={hero?.primaryButton?.link || "/tours"}
          >
            {hero?.primaryButton?.text || "Explore Packages"}
            <ArrowRight size={16} />
          </Link>
          <Link
            className="tour-button tour-button--light"
            href={hero?.secondaryButton?.link || "/contact"}
          >
            {hero?.secondaryButton?.text || "Book on WhatsApp"}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 sm:right-8">
        <button
          type="button"
          aria-label="Previous hero image"
          onClick={() => showSlide(activeSlide - 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-black/25 text-white transition hover:bg-black/50"
        >
          <ArrowLeft size={16} />
        </button>
        {slides.map((image, index) => (
          <button
            key={`hero-indicator-${index}`}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
            onClick={() => showSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === index
                ? "w-7 bg-white"
                : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
        <button
          type="button"
          aria-label="Next hero image"
          onClick={() => showSlide(activeSlide + 1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-black/25 text-white transition hover:bg-black/50"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
