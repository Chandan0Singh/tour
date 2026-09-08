import Image from "next/image";
import Link from "next/link";
import {
  FaMountain,
  FaUsers,
  FaMapMarkedAlt,
  FaAward,
} from "react-icons/fa";

const stats = [
  { value: "5000+", label: "Happy Travelers" },
  { value: "100+", label: "Tour Packages" },
  { value: "50+", label: "Destinations" },
  { value: "10+", label: "Years Experience" },
];

const features = [
  {
    icon: FaMountain,
    title: "Expert Trek Leaders",
    description: "Experienced guides ensuring safe and memorable adventures.",
  },
  {
    icon: FaUsers,
    title: "Trusted by Travelers",
    description: "Thousands of successful trips and happy clients.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Unique Destinations",
    description: "Discover hidden gems and iconic locations.",
  },
  {
    icon: FaAward,
    title: "Premium Experience",
    description: "Comfort, safety, and unforgettable adventures.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section
        aria-label="About Nature Explorer"
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

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-16 text-center text-white sm:px-6 md:py-20">
          <h1
            className="mb-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Us
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            From Mountain Trails to Memorable Journeys
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[#F4F1EA] py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800] sm:text-base">
              Our Story
            </span>

            <h2
              className="mt-3 mb-5 text-3xl font-bold leading-tight text-[#1B5E20] sm:text-4xl md:text-[42px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Creating Adventures That Last a Lifetime
            </h2>

            <div className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
              <p>
                Nature Explorer was founded with a simple vision: to connect
                travelers with breathtaking landscapes, authentic experiences,
                and unforgettable adventures.
              </p>

              <p>
                Whether you're trekking through the Himalayas, discovering
                hidden valleys, or exploring cultural destinations, our mission
                is to make every journey safe, seamless, and inspiring.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                alt="Travelers enjoying an outdoor adventure"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-y-10 sm:gap-y-12 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-3xl font-bold text-[#1B5E20] sm:text-4xl md:text-5xl">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F4F1EA] py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 md:mb-14">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#FF9800]">
              Why Us
            </span>

            <h2
              className="mt-2 text-3xl font-bold text-[#1B5E20] sm:text-4xl md:text-[42px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose Us
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              We focus on safety, authentic experiences, and making every
              journey truly memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-8"
                >
                  <Icon
                    aria-hidden="true"
                    className="mx-auto mb-5 text-4xl text-[#4CAF50] sm:text-5xl"
                  />

                  <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-6 text-gray-600 sm:text-base">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B5E20] py-16 text-center text-white sm:py-20 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
          <h2
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready For Your Next Adventure?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base md:text-lg md:leading-7">
            Explore breathtaking destinations and unforgettable trekking
            experiences with Nature Explorer.
          </p>

          <Link
            href="/tours"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#FF9800] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f57c00] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B5E20] sm:px-8 sm:py-4 sm:text-base"
          >
            Explore Packages
          </Link>
        </div>
      </section>
    </main>
  );
}