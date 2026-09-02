"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, Download, MapPin, MessageCircleMore, Route, ShieldCheck, Star, Users } from "lucide-react";
import { BACKEND_URL } from "@/keyword";

const fallbackItinerary = [
  { day: 1, title: "Arrival & Welcome", description: "Check in, meet your host, and begin with a relaxed local orientation." },
  { day: 2, title: "Sightseeing Day", description: "Visit the popular locations and enjoy the best photo spots and local cuisine." },
  { day: 3, title: "Departure", description: "Return with unforgettable memories and a comfortable transfer to the station." }
];

export default function TourDetailPage({ params }) {
  const { slug } = use(params);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${slug}`);
        const data = await res.json();
        setTour(data || null);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [slug]);

  if (loading) {
    return <div className="tour-detail-loading">Loading Tour...</div>;
  }

  if (!tour) {
    return <div className="tour-detail-loading tour-detail-loading--error">Tour not found.</div>;
  }

  const heroImage = tour.bannerImage || tour.images?.[0]?.url || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600";
  const location = [tour.destination, tour.state, tour.country].filter(Boolean).join(", ") || "Uttarakhand, India";
  const price = tour.discountPrice || tour.price || 6999;
  const rating = tour.averageRating || 4.8;
  const reviews = tour.totalReviews || 126;
  const itinerary = tour.itinerary?.length ? tour.itinerary : fallbackItinerary;
  const highlights = tour.highlights?.length ? tour.highlights : ["Curated sightseeing", "Local experiences", "Comfortable stays", "Travel support"];
  const inclusions = tour.inclusions?.length ? tour.inclusions : ["Accommodation on double sharing", "Breakfast and dinner", "Private transfers", "Local guide"]; 
  const exclusions = tour.exclusions?.length ? tour.exclusions : ["Personal expenses", "Travel insurance", "Any add-ons not mentioned"];
  const faqs = tour.faqs?.length ? tour.faqs : [
    { question: "What is included in the tour package?", answer: "The package includes sightseeing, meals, stay, transfers, and local support as specified in the itinerary." },
    { question: "Can I customize the itinerary?", answer: "Yes, we can customize a tour based on your preferred pace, destination, and travel dates." },
    { question: "Is the trip suitable for families?", answer: "Yes, our family-friendly tours are designed to balance comfort, relaxation, and sightseeing." }
  ];
  const gallery = (tour.gallery && tour.gallery.length ? tour.gallery : tour.images?.map((img) => img.url) || []).slice(0, 4);

  return (
    <div className="tour-detail-page">
      <header className="tour-detail-hero">
        <img src={heroImage} alt={tour.title} />
        <div className="tour-detail-hero__overlay" />
        <div className="tour-container tour-detail-hero__content">
          <nav className="tour-detail-breadcrumb">Home <span>›</span> Tours <span>›</span> <strong>{tour.title}</strong></nav>
          <h1>{tour.title}</h1>
          <div className="tour-detail-meta">
            <span><Star size={13} fill="currentColor" /> {rating.toFixed(1)} ({reviews} Reviews)</span>
            <span><MapPin size={13} /> {location}</span>
          </div>
          <p className="tour-detail-description">{tour.shortDescription || tour.description}</p>

          <div className="tour-detail-stats">
            <div><Clock3 size={15} /> <span><strong>{tour.duration?.days || 3}</strong> Days / <strong>{tour.duration?.nights || 2}</strong> Nights</span></div>
            <div><Route size={15} /> <span><strong>{tour.difficulty || "Easy"}</strong> Difficulty</span></div>
            <div><Users size={15} /> <span><strong>{tour.groupSize?.min || 2}</strong> - <strong>{tour.groupSize?.max || 8}</strong> People</span></div>
            <div><ShieldCheck size={15} /> <span><strong>Best Time</strong> {tour.startingPoint || "Year Round"}</span></div>
          </div>

          <div className="tour-detail-actions">
            <button className="tour-button tour-button--green">Book This Tour <ArrowRight size={15} /></button>
            <button className="tour-button tour-button--light"><Download size={15} /> Download Itinerary</button>
            <button className="tour-button tour-button--light"><MessageCircleMore size={15} /> Enquire Now</button>
          </div>
        </div>

        <aside className="tour-detail-price-card">
          <span>Starting from</span>
          <strong>₹{Number(price).toLocaleString("en-IN")}</strong>
          <small>per person</small>
          <div className="tour-detail-price-card__guarantee"><ShieldCheck size={13} /> Best Price Guarantee</div>
        </aside>
      </header>

      <main className="tour-container tour-detail-main">
        <div className="tour-detail-main__left">
          <section className="detail-panel detail-panel--info">
            <div className="detail-panel__header">Overview</div>
            <p>{tour.description}</p>
            <div className="tour-detail-tags">
              {highlights.slice(0, 4).map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <div className="detail-panel__header">Detailed Itinerary</div>
            <div className="tour-detail-itinerary">
              {itinerary.map((day, idx) => (
                <div key={`${day.day || idx}-${day.title || "day"}`} className="tour-detail-day">
                  <div className="tour-detail-day__dot" />
                  <div className="tour-detail-day__content">
                    <h3>Day {day.day}: {day.title}</h3>
                    <p>{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-panel detail-panel--two-col">
            <div>
              <div className="detail-panel__header">Inclusions</div>
              <ul className="tour-detail-list">
                {inclusions.map((item, idx) => <li key={idx}><Check size={14} /> {item}</li>)}
              </ul>
            </div>
            <div>
              <div className="detail-panel__header">Exclusions</div>
              <ul className="tour-detail-list tour-detail-list--muted">
                {exclusions.map((item, idx) => <li key={idx}><Check size={14} /> {item}</li>)}
              </ul>
            </div>
          </section>

          <section className="detail-panel">
            <div className="detail-panel__header">Gallery</div>
            <div className="tour-detail-gallery">
              {gallery.map((img, index) => (
                <img key={`${img}-${index}`} src={img} alt={`${tour.title} gallery ${index + 1}`} />
              ))}
            </div>
          </section>

          <section className="detail-panel detail-panel--reviews">
            <div className="detail-panel__header detail-panel__header--row"><span>What Our Travelers Say</span><Link href="/reviews">View All Reviews <ArrowRight size={12} /></Link></div>
            <div className="tour-detail-review-grid">
              {(tour.reviews?.length ? tour.reviews : [
                { name: "Ankit Sharma", review: "Amazing experience with TourTrek. Everything was well-organized and the team was very helpful.", rating: 5 },
                { name: "Priya Mehta", review: "The tour was perfectly paced and the views were amazing. I would definitely recommend this package.", rating: 5 },
                { name: "Rohit Negi", review: "Professional team and a memorable holiday. The itinerary was very well planned.", rating: 5 }
              ]).slice(0, 3).map((review, idx) => (
                <article key={`${review.name}-${idx}`} className="tour-review-card">
                  <div className="tour-review-card__top"><span className="tour-review-avatar">{review.name?.split(" ").map((n) => n[0]).join("").slice(0,2).toUpperCase()}</span><div><h4>{review.name}</h4><small>{tour.destination}</small></div></div>
                  <div className="tour-review-stars">{[...Array(review.rating || 5)].map((_, i) => (<Star key={i} size={11} fill="currentColor" />))}</div>
                  <p>{review.review}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="tour-detail-main__right">
          <section className="detail-panel detail-panel--compact">
            <div className="detail-panel__header">Tour Highlights</div>
            <ul className="tour-detail-feature-list">
              {highlights.map((item, index) => <li key={index}><span className="check-bullet">✓</span> {item}</li>)}
            </ul>
          </section>

          <section className="detail-panel detail-panel--compact">
            <div className="detail-panel__header">Upcoming Departures</div>
            <ul className="tour-detail-upcoming">
              {[{date: "25 May - 27 May 2024", amount: "₹6,999"}, {date: "01 Jun - 03 Jun 2024", amount: "₹6,999"}, {date: "08 Jun - 10 Jun 2024", amount: "₹6,999"}, {date: "15 Jun - 17 Jun 2024", amount: "₹6,999"}].map((slot, index) => (
                <li key={index}><span>{slot.date}</span><strong>{slot.amount}</strong></li>
              ))}
            </ul>
          </section>

          <section className="detail-panel detail-panel--compact">
            <div className="detail-panel__header">Frequently Asked Questions</div>
            <div className="tour-detail-faq">
              {faqs.map((faq, idx) => (
                <div key={idx} className="tour-detail-faq__item">
                  <div className="tour-detail-faq__question"><span>{faq.question}</span><ChevronDown size={12} /></div>
                  <div className="tour-detail-faq__answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
