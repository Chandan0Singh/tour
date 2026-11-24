"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HomeImageCarousel({ items = [], label }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".home-image-card");
    if (!track || !card) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="home-image-carousel" role="region" aria-label={label}>
      <button
        type="button"
        className="home-image-carousel__control home-image-carousel__control--previous"
        aria-label={`Previous ${label.toLowerCase()}`}
        onClick={() => scroll(-1)}
      >
        <ChevronLeft size={23} />
      </button>
      <div
        className="home-image-carousel__track"
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label} cards`}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              className="home-image-card"
              key={item.id || `${item.title}-${index}`}
              aria-label={item.title}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <span className="home-image-card__shade" />
              <span className="home-image-card__caption">
                {Icon && <Icon size={24} strokeWidth={1.8} aria-hidden="true" />}
                <span>{item.title}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <button
        type="button"
        className="home-image-carousel__control home-image-carousel__control--next"
        aria-label={`Next ${label.toLowerCase()}`}
        onClick={() => scroll(1)}
      >
        <ChevronRight size={23} />
      </button>
    </div>
  );
}
