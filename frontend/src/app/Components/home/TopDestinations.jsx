export default function TopDestinations({ data = [] }) {

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-5xl">
            Top Destinations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src={item.bannerImage}
                alt={item.destination}
                className="h-[450px] w-full object-cover"
              />

              <div className="p-5 bg-white">
                <h3 className="text-2xl font-semibold">
                  {item.destination}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.state}, {item.country}
                </p>

                <p className="mt-3 font-semibold text-green-700">
                  Starting ₹{item.discountPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}