import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import HomeImageCarousel from "./HomeImageCarousel";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900";

const fallbackPackages = [
  { title: "Kedarkantha Trek", duration: 5, price: "8,999", rating: "4.9", reviews: 320 },
  { title: "Valley of Flowers Trek", duration: 6, price: "9,999", rating: "4.9", reviews: 256 },
  { title: "Roopkund Trek", duration: 8, price: "11,999", rating: "4.8", reviews: 198 },
  { title: "Nainital Tour", duration: 3, price: "4,999", rating: "4.7", reviews: 210 },
  { title: "Mussoorie Tour", duration: 3, price: "5,499", rating: "4.6", reviews: 160 },
  { title: "Jim Corbett Tour", duration: 4, price: "4,299", rating: "4.8", reviews: 140 },
];

export default function PopularPackages({ data = [] }) {
  const packages = data.length ? data : fallbackPackages;
  const items = packages.slice(0, 8).map((item, index) => {
    const isTrek =
      item.type === "Trek" || item.title?.toLowerCase().includes("trek");
    const stateSlug = item.state
      ? item.state.trim().toLowerCase().replace(/\s+/g, "-")
      : "";

    return {
      id: item._id || `${item.title}-${index}`,
      title: item.title || "Explore Package",
      image: item.bannerImage || item.images?.[0]?.url || FALLBACK_IMAGE,
      href:
        item.slug && stateSlug
          ? `/${isTrek ? "treks" : "tours"}/${stateSlug}/${item.slug}`
          : isTrek
            ? "/treks"
            : "/tours",
      icon: Compass,
    };
  });

  return (
    <section className="tour-section packages-section">
      <div className="tour-container">
        <div className="tour-row-heading">
          <div className="packages-heading"><p className="tour-kicker">◉ POPULAR PACKAGES</p><div className="package-tabs"><Link href="/treks" className="active">TREKS</Link><Link href="/tours">TOURS</Link></div></div>
          <Link href="/tours">View All Packages <ArrowRight size={13} /></Link>
        </div>
        <HomeImageCarousel items={items} label="Popular packages" />
      </div>
    </section>
  );
}