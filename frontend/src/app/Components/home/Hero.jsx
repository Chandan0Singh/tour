"use client";

import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero({ data }) {
  const hero = data?.hero;

  return (
    <section className="tour-hero">
      <div
        className="tour-hero__image"
        style={{
          backgroundImage: `url(${
            hero?.backgroundImage ||
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000"
          })`,
        }}
      />

      <div className="tour-hero__shade" />
      <div className="tour-container tour-hero__content">
        <p className="tour-kicker">YOUR ADVENTURE, OUR EXPERTISE</p>
        <h1>
          {hero?.title || "Explore Uttarakhand"}
          <br />
          <span>{hero?.subtitle || "with TourTrek"}</span>
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
    </section>
  );
}
