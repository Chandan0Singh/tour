"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function FeaturedTreks({ data }) {
  const carouselRef = useRef(null);
  const experiences = [
    { title: "Treks", text: "Explore the best Himalayan treks", image: data?.[0]?.bannerImage, href: "/treks" },
    { title: "Tour Packages", text: "Scenic tours & family vacations", image: data?.[1]?.bannerImage, href: "/tours" },
    { title: "Camping", text: "Stay close to nature under the stars", image: data?.[2]?.bannerImage },
    { title: "Bike Trips", text: "Epic road trips for thrill seekers", image: data?.[3]?.bannerImage },
    { title: "Weekend Getaways", text: "Short trips, big memories", image: data?.[0]?.bannerImage },
    { title: "Custom Trips", text: "Customized itineraries just for you", image: data?.[1]?.bannerImage },
  ];

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const card = carousel.querySelector(".experience-card");
    const gap = Number.parseFloat(window.getComputedStyle(carousel).gap) || 0;
    carousel.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width || carousel.clientWidth) + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="tour-section tour-section--tight">
      <div className="tour-container experience-section-heading">
        <div className="tour-section-heading"><p className="tour-kicker">EXPLORE EXPERIENCES <ArrowRight size={14} /></p></div>
      </div>
      <div className="experience-carousel" role="region" aria-label="Explore experiences">
        <button
          type="button"
          className="experience-carousel__control experience-carousel__control--previous"
          aria-label="Show previous experiences"
          onClick={() => scrollCarousel(-1)}
        >
          <ArrowRight size={22} />
        </button>
        <div className="experience-grid" ref={carouselRef} tabIndex={0} aria-label="Experience cards">
          {experiences.map((item) => (
            <article className="experience-card" key={item.title}>
              {item.href ? (
                <Link href={item.href} aria-label={`Explore ${item.title}`}>
                  <img src={item.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=700"} alt={item.title} />
                  <div><h3>{item.title}</h3><p>{item.text}</p><span className="round-arrow"><ArrowRight size={13} /></span></div>
                </Link>
              ) : (
                <>
                  <img src={item.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=700"} alt={item.title} />
                  <div><h3>{item.title}</h3><p>{item.text}</p><span className="round-arrow"><ArrowRight size={13} /></span></div>
                </>
              )}
            </article>
          ))}
        </div>
        <button
          type="button"
          className="experience-carousel__control experience-carousel__control--next"
          aria-label="Show next experiences"
          onClick={() => scrollCarousel(1)}
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </section>
  );
}