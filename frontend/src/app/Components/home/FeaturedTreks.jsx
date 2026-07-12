export default function FeaturedTreks({ data }) {

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-orange-500">Popular Adventures</span>

          <h2 className="mt-2 font-serif text-5xl">
            Featured Treks
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data?.map((trek) => (
            <div
              key={trek._id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <img
                src={trek.bannerImage}
                alt={trek.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {trek.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {trek.shortDescription}
                </p>

                <p className="mt-3 font-semibold text-green-700">
                  ₹{trek.discountPrice}
                </p>

                <button className="mt-4 text-green-700">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}