import { ArrowRight, CalendarDays, Star } from "lucide-react";
import Link from "next/link";

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

  return (
    <section className="tour-section packages-section">
      <div className="tour-container">
        <div className="tour-row-heading">
          <div className="packages-heading"><p className="tour-kicker">◉ POPULAR PACKAGES</p><div className="package-tabs"><span className="active">TREKS</span><span>TOURS</span></div></div>
          <Link href="/tours">View All Packages <ArrowRight size={13} /></Link>
        </div>
        <div className="package-grid">
          {packages.slice(0, 6).map((item, index) => (
            <article className="package-card" key={item._id || item.title || index}>
              <div className="package-image-wrap"><img src={item.bannerImage || `https://images.unsplash.com/photo-${[1464822759023, 1500534623283, 1464278533981, 1530789253388, 1526772662000, 1548013146][index]}?q=80&w=600`} alt={item.title} /><span>{index === 0 ? "Best Seller" : ""}</span></div>
              <div className="package-card__body"><h3>{item.title}</h3><div className="package-meta"><span><CalendarDays size={11} /> {item.duration?.days || item.duration || 3} Days</span><strong>₹{item.discountPrice || item.price || "8,999"}</strong></div><div className="package-rating"><Star size={11} fill="currentColor" /> {item.rating || "4.8"} ({item.reviews || "120"})</div><Link href={`/booking/${item.slug || item._id || "packages"}`}>View Details <ArrowRight size={12} /></Link></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}