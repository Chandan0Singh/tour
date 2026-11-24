import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import HomeImageCarousel from "./HomeImageCarousel";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900";

export default function TopDestinations({ data = [] }) {
  const items = data.slice(0, 8).map((item, index) => {
    const stateSlug = item.state
      ? item.state.trim().toLowerCase().replace(/\s+/g, "-")
      : "";

    return {
      id: item._id || `${item.destination || item.state}-${index}`,
      title: item.destination || item.state || "Explore Destination",
      image: item.bannerImage || item.images?.[0]?.url || FALLBACK_IMAGE,
      href: stateSlug ? `/destinations/${stateSlug}` : "/destinations",
      icon: MapPin,
    };
  });

  return (
    <section className="tour-section tour-section--destinations">
      <div className="tour-container">
        <div className="tour-row-heading">
          <p className="tour-kicker">◉ POPULAR DESTINATIONS</p>
          <Link href="/destinations">
            View All Destinations <ArrowRight size={13} />
          </Link>
        </div>
        <HomeImageCarousel items={items} label="Popular destinations" />
      </div>
    </section>
  );
}