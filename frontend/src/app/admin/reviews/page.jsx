"use client";

import { useMemo, useState } from "react";

const initialReviews = [
  {
    id: 1,
    customer: "Rahul Sharma",
    package: "Kedarnath Trek",
    rating: 5,
    review:
      "Amazing experience! Everything was perfectly managed. Highly recommended.",
    date: "25 Jun 2026",
    status: "Published",
  },
  {
    id: 2,
    customer: "Priya Verma",
    package: "Goa Tour",
    rating: 4,
    review:
      "Hotels were good and the trip was enjoyable.",
    date: "22 Jun 2026",
    status: "Published",
  },
  {
    id: 3,
    customer: "Amit Singh",
    package: "Manali Tour",
    rating: 2,
    review:
      "The transport was delayed and food quality could be improved.",
    date: "18 Jun 2026",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Neha Gupta",
    package: "Valley of Flowers Trek",
    rating: 5,
    review:
      "Beautiful trek and excellent guides. Loved every moment!",
    date: "15 Jun 2026",
    status: "Published",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return reviews.filter((item) => {
      const matchSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.package.toLowerCase().includes(search.toLowerCase());

      const matchRating =
        rating === "All" ? true : item.rating === Number(rating);

      return matchSearch && matchRating;
    });
  }, [reviews, search, rating]);

  const deleteReview = (id) => {
    if (!confirm("Delete this review?")) return;

    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Review Management</h1>
        <p className="text-gray-500 mt-2">
          Manage customer reviews and ratings.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-2">
            {reviews.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Published</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {reviews.filter(r => r.status === "Published").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {reviews.filter(r => r.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Average Rating</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {(reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)} ⭐
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search review..."
          className="flex-1 border rounded-lg px-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option>All</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left">Customer</th>
              <th className="px-5 py-4 text-left">Package</th>
              <th className="px-5 py-4 text-left">Rating</th>
              <th className="px-5 py-4 text-left">Date</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((review) => (

              <tr
                key={review.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium">
                  {review.customer}
                </td>

                <td className="px-5 py-4">
                  {review.package}
                </td>

                <td className="px-5 py-4">
                  {"⭐".repeat(review.rating)}
                </td>

                <td className="px-5 py-4">
                  {review.date}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      review.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.status}
                  </span>
                </td>

                <td className="px-5 py-4 flex gap-2">

                  <button
                    onClick={() => setSelected(review)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Review Modal */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl w-full max-w-2xl p-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Review Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">

              <p><strong>Customer:</strong> {selected.customer}</p>

              <p><strong>Package:</strong> {selected.package}</p>

              <p><strong>Rating:</strong> {"⭐".repeat(selected.rating)}</p>

              <p><strong>Date:</strong> {selected.date}</p>

              <p><strong>Status:</strong> {selected.status}</p>

              <div className="bg-gray-100 rounded-lg p-5">
                {selected.review}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}