import { ArrowRight } from "lucide-react";

export default function TopDestinations({ data = [] }) {

  return (
    <section className="tour-section tour-section--destinations">
      <div className="tour-container">
        <div className="tour-row-heading"><p className="tour-kicker">◉ POPULAR DESTINATIONS</p><a href="/destinations">View All Destinations <ArrowRight size={13} /></a></div>
        <div className="destination-grid">
          {data.slice(0, 8).map((item) => (
            <div key={item._id} className="destination-card">
              <img
                src={item.bannerImage}
                alt={item.destination}
              />
              <strong>{item.destination}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}