import { ArrowRight } from "lucide-react";

export default function FeaturedTreks({ data }) {
  const experiences = [
    { title: "Treks", text: "Explore the best Himalayan treks", image: data?.[0]?.bannerImage },
    { title: "Tour Packages", text: "Scenic tours & family vacations", image: data?.[1]?.bannerImage },
    { title: "Camping", text: "Stay close to nature under the stars", image: data?.[2]?.bannerImage },
    { title: "Bike Trips", text: "Epic road trips for thrill seekers", image: data?.[3]?.bannerImage },
    { title: "Weekend Getaways", text: "Short trips, big memories", image: data?.[0]?.bannerImage },
    { title: "Custom Trips", text: "Customized itineraries just for you", image: data?.[1]?.bannerImage },
  ];
  return (
    <section className="tour-section tour-section--tight">
      <div className="tour-container">
        <div className="tour-section-heading"><p className="tour-kicker">EXPLORE EXPERIENCES <ArrowRight size={14} /></p></div>
        <div className="experience-grid">
          {experiences.map((item) => <article className="experience-card" key={item.title}><img src={item.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=700"} alt="" /><div><h3>{item.title}</h3><p>{item.text}</p><span className="round-arrow"><ArrowRight size={13} /></span></div></article>)}
        </div>
      </div>
    </section>
  );
}