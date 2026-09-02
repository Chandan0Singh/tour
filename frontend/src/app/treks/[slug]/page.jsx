"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Clock3, Download, MapPin, MessageCircleMore, Route, ShieldCheck, Star, Users } from "lucide-react";
import { BACKEND_URL } from "@/keyword";

const fallbackItinerary = [
  { day: 1, title: "Arrival & Base Camp", description: "Arrive at the base camp, enjoy a welcome briefing, and settle into your overnight stay." },
  { day: 2, title: "Trail Start", description: "Begin the trek with a scenic climb through forest trails and alpine views." },
  { day: 3, title: "Summit Day", description: "Morning push to the summit with breathtaking views of the Himalayan ranges." }
];

export default function TrekDetailPage({ params }) {
  const { slug } = use(params);
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrek = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/products/${slug}`);
        const data = await res.json();
        setTrek(data || null);
      } catch (error) {
        console.error("Error fetching trek:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrek();
  }, [slug]);

  if (loading) {
    return <div className="tour-detail-loading">Loading Trek...</div>;
  }

  if (!trek) {
    return <div className="tour-detail-loading tour-detail-loading--error">Trek not found.</div>;
  }

  const heroImage = trek.bannerImage || trek.images?.[0]?.url || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600";
  const location = [trek.destination, trek.state, trek.country].filter(Boolean).join(", ") || "Uttarakhand, India";
  const price = trek.discountPrice || trek.price || 6999;
  const rating = trek.averageRating || 4.8;
  const reviews = trek.totalReviews || 126;
  const itinerary = trek.itinerary?.length ? trek.itinerary : fallbackItinerary;
  const highlights = trek.highlights?.length ? trek.highlights : ["Scenic alpine trails", "Expert local guides", "Delicious local meals", "Sunrise viewpoints"];
  const inclusions = trek.inclusions?.length ? trek.inclusions : ["Accommodation on double sharing", "Meals", "Pickup and drop", "Local guide"]; 
  const exclusions = trek.exclusions?.length ? trek.exclusions : ["Personal expenses", "Travel insurance", "Any add-ons not mentioned"];
  const faqs = trek.faqs?.length ? trek.faqs : [
    { question: "What is included in the trek package?", answer: "The package includes accommodation, meals, permit support, local guide, and transfers as mentioned in the itinerary." },
    { question: "What is the best time to do this trek?", answer: "The ideal season is from April to June and September to November for the clearest weather and best views." },
    { question: "Is it suitable for beginners?", answer: "Yes, this route is designed for beginners with moderate pace and experienced support staff." }
  ];
  const gallery = (trek.gallery && trek.gallery.length ? trek.gallery : trek.images?.map((img) => img.url) || []).slice(0, 4);

  return (
    <div className="tour-detail-page">
      <header className="tour-detail-hero">
        <img src={heroImage} alt={trek.title} />
        <div className="tour-detail-hero__overlay" />
        <div className="tour-container tour-detail-hero__content">
          <nav className="tour-detail-breadcrumb">Home <span>›</span> Treks <span>›</span> <strong>{trek.title}</strong></nav>
          <h1>{trek.title}</h1>
          <div className="tour-detail-meta">
            <span><Star size={13} fill="currentColor" /> {rating.toFixed(1)} ({reviews} Reviews)</span>
            <span><MapPin size={13} /> {location}</span>
          </div>
          <p className="tour-detail-description">{trek.shortDescription || trek.description}</p>

          <div className="tour-detail-stats">
            <div><Clock3 size={15} /> <span><strong>{trek.duration?.days || 3}</strong> Days / <strong>{trek.duration?.nights || 2}</strong> Nights</span></div>
            <div><Route size={15} /> <span><strong>{trek.difficulty || "Moderate"}</strong> Difficulty</span></div>
            <div><Users size={15} /> <span><strong>{trek.groupSize?.min || 8}</strong> - <strong>{trek.groupSize?.max || 16}</strong> People</span></div>
            <div><ShieldCheck size={15} /> <span><strong>Best Time</strong> {trek.startingPoint || "Mar - Jun"}</span></div>
          </div>

          <div className="tour-detail-actions">
            <button className="tour-button tour-button--green">Book This Trek <ArrowRight size={15} /></button>
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
            <p>{trek.description}</p>
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
                <img key={`${img}-${index}`} src={img} alt={`${trek.title} gallery ${index + 1}`} />
              ))}
            </div>
          </section>

          <section className="detail-panel detail-panel--reviews">
            <div className="detail-panel__header detail-panel__header--row"><span>What Our Travelers Say</span><Link href="/reviews">View All Reviews <ArrowRight size={12} /></Link></div>
            <div className="tour-detail-review-grid">
              {(trek.reviews?.length ? trek.reviews : [
                { name: "Ankit Sharma", review: "Amazing experience with TourTrek. Everything was well-organized and the team was very helpful.", rating: 5 },
                { name: "Priya Mehta", review: "The trek was perfectly paced and the views were stunning. Would definitely recommend it.", rating: 5 },
                { name: "Rohit Negi", review: "Wonderful team, safe route, and memorable scenery. The guide helped us a lot throughout.", rating: 5 }
              ]).slice(0, 3).map((review, idx) => (
                <article key={`${review.name}-${idx}`} className="tour-review-card">
                  <div className="tour-review-card__top"><span className="tour-review-avatar">{review.name?.split(" ").map((n) => n[0]).join("").slice(0,2).toUpperCase()}</span><div><h4>{review.name}</h4><small>{trek.destination}</small></div></div>
                  <div className="tour-review-stars">{[...Array(review.rating || 5)].map((_, i) => (<Star key={i} size={11} fill="currentColor" />))}</div>
                  <p>{review.review}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="tour-detail-main__right">
          <section className="detail-panel detail-panel--compact">
            <div className="detail-panel__header">Trek Highlights</div>
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