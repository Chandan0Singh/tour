"use client";

import { use } from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/keyword";

export default function TrekDetailPage({ params }) {
  const { slug } = use(params);
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTrek();
  }, []);

  const fetchTrek = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${slug}`);

      const data = await res.json();

      const jsonString = JSON.stringify(data, null, 2);

      console.log("Fetched Trek Data:", jsonString); // Debugging line

      if (data) {
        setTrek(data);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  console.log("Trek Data in Component:", trek); // Debugging line

  if (loading) {
    return <div className="py-32 text-center text-xl">Loading Trek...</div>;
  }

  if (!trek) {
    return (
      <div className="py-32 text-center text-red-500">Trek not found.</div>
    );
  }

  return (
    <div className="bg-[#F4F1EA]">
      {/* Hero */}
      <div className="relative h-[550px]">
        <Image
          src={trek.images?.[0]?.url || "/placeholder.jpg"}
          alt={trek.images?.[0]?.alt || trek.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-5xl font-bold">{trek.title}</h1>

            <div className="flex gap-8 mt-6 text-lg">
              <span>📍 {trek.location}</span>

              <span>
                {trek.duration?.days} Days / {trek.duration?.nights} Nights
              </span>

              <span>⭐ {trek.difficulty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
        {/* Left */}

        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-5">Overview</h2>

            <p className="text-gray-700 leading-8">{trek.description}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-5">Trek Highlights</h2>

            <ul className="space-y-3">
              {trek.highlights?.map((item, index) => (
                <li key={index} className="flex gap-3">
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-5">Itinerary</h2>

            <div className="space-y-6">
              {trek.itinerary?.map((day, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow">
                  <h3 className="font-semibold text-xl mb-2">
                    Day {day.day}: {day.title}
                  </h3>

                  <p>{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Included</h2>

              <ul className="space-y-2">
                {trek.included?.map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Excluded</h2>

              <ul className="space-y-2">
                {trek.excluded?.map((item, i) => (
                  <li key={i}>✖ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Card */}

        <div>
          <div className="sticky top-28 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-4xl font-bold text-green-700">₹{trek.price}</h3>

            <p className="text-gray-500 mt-2">Per Person</p>

            <hr className="my-6" />

            <div className="space-y-4">
              <div>
                📅 Duration : {trek.duration?.days} Days /{" "}
                {trek.duration?.nights} Nights
              </div>

              <div>📍 Location : {trek.location}</div>

              <div>
                👥 Group Size : {trek.groupSize?.min} - {trek.groupSize?.max}{" "}
                People
              </div>

              <div>⭐ Difficulty : {trek.difficulty}</div>
            </div>

            <button onClick={() => router.push(`/booking/${trek.slug}`)} className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}

      {trek.images?.length > 1 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold mb-8">Gallery</h2>

          <div className="grid md:grid-cols-4 gap-5">
            {trek.images.map((img, index) => (
              <div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden"
              >
                <Image
                  src={img.url}
                  fill
                  alt={img.alt}
                  className="object-cover hover:scale-110 duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Explore More Treks</h2>

          <Link
            href="/treks"
            className="inline-block bg-green-700 text-white px-8 py-4 rounded-xl"
          >
            View All Treks
          </Link>
        </div>
      </section>
    </div>
  );
}
