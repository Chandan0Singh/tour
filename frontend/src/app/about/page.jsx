import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Trekking Adventures",
    description:
      "Explore Himalayan trails, beautiful valleys, alpine meadows and breathtaking mountain landscapes.",
  },
  {
    title: "Holiday Packages",
    description:
      "Discover beautiful destinations through carefully planned tours and holidays.",
  },
  {
    title: "Group Departures",
    description:
      "Meet like-minded travellers and create unforgettable memories together.",
  },
  {
    title: "Customized Trips",
    description:
      "Travel your way with itineraries designed around your interests and preferences.",
  },
  {
    title: "Offbeat Experiences",
    description:
      "Discover hidden gems, local culture and places beyond the usual tourist routes.",
  },
];

const reasons = [
  "Carefully planned itineraries.",
  "Experienced local travel support.",
  "Transparent pricing with clear inclusions.",
  "Comfortable stays and transportation arrangements.",
  "Personalized assistance before and during your trip.",
  "Experiences designed for solo travellers, couples, families and groups.",
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <section
        aria-label="About Lavi Adventure"
        className="relative flex min-h-[55vh] items-center justify-center sm:min-h-[60vh]"
      >
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
          alt="Beautiful mountain landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-16 text-center text-white sm:px-6 md:py-20">
          <h1
            className="mb-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Lavi Adventure
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            Every Journey Has a Story. Let&apos;s Make Yours Unforgettable.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F1EA] py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Our Story
            </span>
            <h2
              className="mb-5 mt-3 text-3xl font-bold leading-tight text-[#1B5E20] sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every Journey Has a Story. Let&apos;s Make Yours Unforgettable.
            </h2>
            <div className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
              <p>
                At Lavi Adventure, we believe travelling is more than just
                visiting new places. It&apos;s about discovering new experiences,
                meeting new people, exploring different cultures and creating
                memories that stay with you forever.
              </p>
              <p>
                Born in the heart of Uttarakhand, Lavi Adventure is a travel and
                adventure company dedicated to bringing people closer to the
                mountains, nature and meaningful travel experiences.
              </p>
              <p>
                From peaceful hill stations and scenic road trips to thrilling
                Himalayan treks and offbeat destinations, we bring together
                journeys that let you experience the beauty of travel in its
                truest form.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Travellers enjoying an outdoor adventure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Who We Are
            </span>
            <h2
              className="mb-5 mt-3 text-3xl font-bold text-[#1B5E20] sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Travel with people who love the journey
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
            <p>
              We are a team of travel enthusiasts who believe that the best
              journeys are not always about reaching a destination, but about
              everything you experience along the way.
            </p>
            <p>
              Our goal is to make travel easy, memorable and accessible for
              everyone. Whether you are planning your first mountain trip,
              looking for an adventurous trekking experience or simply want a
              peaceful escape from everyday life, we help you find the right
              journey.
            </p>
            <p>
              At Lavi Adventure, every trip is planned with attention to detail,
              comfort and a genuine passion for exploration.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F1EA] py-14 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              What We Do
            </span>
            <h2
              className="mb-4 mt-3 text-3xl font-bold text-[#1B5E20] sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thoughtfully planned travel experiences
            </h2>
            <p className="text-sm leading-6 text-gray-600 sm:text-base">
              We offer thoughtfully planned travel experiences across
              Uttarakhand and beyond.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5E9] text-sm font-bold text-[#1B5E20]">
                  0{index + 1}
                </span>
                <h3
                  className="mb-3 text-lg font-semibold text-[#1B5E20] sm:text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Why Travel With Lavi Adventure?
            </span>
            <h2
              className="mb-4 mt-3 text-3xl font-bold text-[#1B5E20] sm:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every detail, thoughtfully considered
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-3 rounded-xl border border-[#E8E5DC] bg-[#F4F1EA]/60 p-5 text-sm leading-6 text-gray-700"
              >
                <span className="font-bold text-[#4CAF50]" aria-hidden="true">
                  ✓
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#F4F1EA] py-14 sm:py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-7 shadow-md sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Our Mission
            </span>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Our mission is to make meaningful travel experiences accessible
              to more people while promoting responsible tourism and supporting
              local communities.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              We want every traveller to experience the mountains with respect,
              curiosity and a sense of adventure.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-7 shadow-md sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Our Vision
            </span>
            <p className="mt-4 text-base leading-7 text-gray-600">
              To become a trusted travel and adventure brand known for
              authentic experiences, reliable service and unforgettable
              journeys across India.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#1B5E20] py-16 text-center text-white sm:py-20 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
          <h2
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let&apos;s Explore Together!
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base md:text-lg">
            The mountains are calling, the roads are waiting and countless
            stories are yet to be written. Whether it&apos;s your first adventure
            or your next big escape, Lavi Adventure is here to make it special.
          </p>
          <Link
            href="/tours"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#FF9800] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f57c00] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B5E20] sm:px-8 sm:py-4 sm:text-base"
          >
            Explore Packages
          </Link>
          <p className="mt-8 text-sm font-semibold text-white/90 sm:text-base">
            Lavi Adventure – Explore More. Experience More. Live More.
          </p>
        </div>
      </section>
    </main>
  );
}
