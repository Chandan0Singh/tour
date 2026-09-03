"use client";

import {
  MapPin,
  CalendarDays,
  Clock3,
  Mountain,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  Backpack,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductDetails({ product }) {
  const pathname = usePathname();

  const basePath = `/${pathname.split("/")[1]}`;

  if (!product) return null;

  return (
    <main className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[420px] w-full overflow-hidden">
          <img
            src={product.bannerImage}
            alt={product.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12">
              <div className="max-w-3xl text-white">
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur">
                    {product.type}
                  </span>

                  <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm backdrop-blur">
                    {product.difficulty}
                  </span>

                  {product.bestSeller && (
                    <span className="rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-medium">
                      Best Seller
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold md:text-5xl">
                  {product.title}
                </h1>

                <p className="mt-4 text-lg text-white/90">
                  {product.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-5 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {product.destination}, {product.state}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={18} />
                    {product.duration?.days} Days / {product.duration?.nights}{" "}
                    Nights
                  </div>

                  <div className="flex items-center gap-2">
                    <Star size={18} className="fill-current" />
                    {product.averageRating} ({product.totalReviews} reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
          {/* Left Content */}
          <div>
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold">About This Trek</h2>

              <p className="mt-4 leading-7 text-gray-600">
                {product.description}
              </p>
            </section>

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold">Highlights</h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {product.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
                    >
                      <CheckCircle2
                        className="shrink-0 text-green-600"
                        size={20}
                      />

                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Trek Information */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold">Trek Information</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                  icon={<Mountain size={20} />}
                  label="Altitude"
                  value={`${product.altitude} ft`}
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Starting Point"
                  value={product.startingPoint}
                />

                <InfoCard
                  icon={<MapPin size={20} />}
                  label="Ending Point"
                  value={product.endingPoint}
                />

                <InfoCard
                  icon={<Users size={20} />}
                  label="Group Size"
                  value={`${product.groupSize?.min} - ${product.groupSize?.max} people`}
                />

                <InfoCard
                  icon={<Clock3 size={20} />}
                  label="Duration"
                  value={`${product.duration?.days} Days / ${product.duration?.nights} Nights`}
                />

                <InfoCard
                  icon={<CalendarDays size={20} />}
                  label="Difficulty"
                  value={product.difficulty}
                />
              </div>
            </section>

            {/* Departure Dates */}
            {product.departureDates?.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold">Departure Dates</h2>

                <div className="mt-6 flex flex-wrap gap-3">
                  {product.departureDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <CalendarDays size={18} />
                      {new Date(date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            {product.itinerary?.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold">Itinerary</h2>

                <div className="mt-6 space-y-4">
                  {product.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 p-5"
                    >
                      <h3 className="text-lg font-semibold">
                        {day.title || `Day ${index + 1}`}
                      </h3>

                      {day.description && (
                        <p className="mt-2 leading-6 text-gray-600">
                          {day.description}
                        </p>
                      )}

                      {day.activities && (
                        <p className="mt-2 text-sm text-gray-500">
                          {Array.isArray(day.activities)
                            ? day.activities.join(", ")
                            : day.activities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions / Exclusions */}
            <section className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold">Inclusions</h2>

                <div className="mt-5 space-y-3">
                  {product.inclusions?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 size={19} className="text-green-600" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Exclusions</h2>

                <div className="mt-5 space-y-3">
                  {product.exclusions?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <XCircle size={19} className="text-red-500" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Things To Carry */}
            {product.thingsToCarry?.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold">Things To Carry</h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {product.thingsToCarry.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-4"
                    >
                      <Backpack size={20} />
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {product.gallery?.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold">Gallery</h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {product.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-64 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Price Card */}
          {/* <aside>
                        <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Starting from
                            </p>

                            <div className="mt-2 flex items-end gap-3">
                                <span className="text-3xl font-bold">
                                    ₹{product.discountPrice?.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                                {product.price && (
                                    <span className="mb-1 text-gray-400 line-through">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 text-sm text-gray-500">
                                Per person
                            </p>

                            <div className="mt-6 border-t pt-5">

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">
                                        Available Seats
                                    </span>

                                    <span className="font-medium">
                                        {product.availableSeats}
                                    </span>
                                </div>

                                <div className="flex justify-between py-2">
                                    <span className="text-gray-500">
                                        Difficulty
                                    </span>

                                    <span className="font-medium">
                                        {product.difficulty}
                                    </span>
                                </div>

                            </div>

                        </div>
                    </aside> */}

          <aside>
            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Starting from</p>

              <div className="mt-2 flex items-end gap-3">
                <span className="text-3xl font-bold">
                  ₹{product.discountPrice?.toLocaleString("en-IN")}
                </span>

                {product.price && (
                  <span className="mb-1 text-gray-400 line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-500">Per person</p>

              <div className="mt-6 border-t pt-5">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Available Seats</span>

                  <span className="font-medium">{product.availableSeats}</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Difficulty</span>

                  <span className="font-medium">{product.difficulty}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full rounded-xl bg-[#5E6B58] px-5 py-3.5 text-center font-medium text-white transition hover:bg-[#4f5b4a]"
                >
                  Enquire Now
                </Link>

                <a
    href="https://wa.me/8860968260?text=Hi"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full rounded-xl bg-[#25D366] px-5 py-3.5 text-center font-medium text-white transition hover:bg-[#1ebe5d]"
  >
    WhatsApp Us
  </a>

                <Link
                  href={basePath}
                  className="w-full rounded-xl border border-[#5E6B58] px-5 py-3.5 text-center font-medium text-[#5E6B58] transition hover:bg-[#5E6B58] hover:text-white"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
