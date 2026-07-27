"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { BACKEND_URL } from "@/keyword";

const API_URL = BACKEND_URL;

const STATUS_STYLES = {
  Approved: "bg-[#EEF1EC] text-[#5E6B58] border border-[#5E6B58]",
  Pending: "bg-[#FBF3E4] text-[#8A6A2A] border border-[#8A6A2A]",
  Rejected: "bg-[#F7E9E7] text-[#9B4A3F] border border-[#9B4A3F]",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [actionId, setActionId] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load reviews.");
      }

      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message || "Something went wrong while loading reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (id) => {
    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}/approve`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not approve this review.");
      }

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Approved" } : r))
      );

      setSelected((prev) =>
        prev && prev._id === id ? { ...prev, status: "Approved" } : prev
      );
    } catch (err) {
      alert(err.message || "Could not approve this review.");
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id) => {
    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}/reject`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not reject this review.");
      }

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Rejected" } : r))
      );

      setSelected((prev) =>
        prev && prev._id === id ? { ...prev, status: "Rejected" } : prev
      );
    } catch (err) {
      alert(err.message || "Could not reject this review.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not delete this review.");
      }

      setReviews((prev) => prev.filter((r) => r._id !== id));
      setSelected((prev) => (prev && prev._id === id ? null : prev));
    } catch (err) {
      alert(err.message || "Could not delete this review.");
    } finally {
      setActionId(null);
    }
  };

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const packageName = r.productId?.name || "";

      const matchSearch =
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        packageName.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" ? true : r.status === statusFilter;

      const matchRating =
        ratingFilter === "All" ? true : r.rating === Number(ratingFilter);

      return matchSearch && matchStatus && matchRating;
    });
  }, [reviews, search, statusFilter, ratingFilter]);

  const stats = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === "Approved").length;
    const pending = reviews.filter((r) => r.status === "Pending").length;
    const rejected = reviews.filter((r) => r.status === "Rejected").length;
    const avg =
      total > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
        : "0.0";

    return { total, approved, pending, rejected, avg };
  }, [reviews]);

  const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2E2E28]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Review Management
        </h1>
        <p className="text-[#6B6B63] mt-2">
          Manage customer reviews and approvals across all packages.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-5 mb-8">
        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Total Reviews</p>
          <h2 className="text-3xl font-bold mt-2 text-[#2E2E28]">{stats.total}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Approved</p>
          <h2 className="text-3xl font-bold mt-2 text-[#5E6B58]">{stats.approved}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-[#8A6A2A]">{stats.pending}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Rejected</p>
          <h2 className="text-3xl font-bold mt-2 text-[#9B4A3F]">{stats.rejected}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Average Rating</p>
          <h2 className="text-3xl font-bold mt-2 text-[#2E2E28]">{stats.avg} ⭐</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E4E0D4] p-5 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by customer or package..."
          className="flex-1 border border-[#E4E0D4] px-4 py-3 bg-[#F8F5EE] focus:outline-none focus:border-[#5E6B58]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-[#E4E0D4] px-4 py-3 bg-[#F8F5EE]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>

        <select
          className="border border-[#E4E0D4] px-4 py-3 bg-[#F8F5EE]"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-[#F7E9E7] border border-[#9B4A3F] text-[#9B4A3F] px-5 py-4 mb-6">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-[#E4E0D4] overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F5EE] border-b border-[#E4E0D4]">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Customer</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Package</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Rating</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Date</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Status</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[#6B6B63]">
                  Loading reviews...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[#6B6B63]">
                  No reviews match these filters.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((review) => (
                <tr key={review._id} className="border-t border-[#E4E0D4] hover:bg-[#F8F5EE]">
                  <td className="px-5 py-4 font-medium text-[#2E2E28]">{review.name}</td>

                  <td className="px-5 py-4 text-[#4A4A44]">
                    {review.productId?.name || "—"}
                  </td>

                  <td className="px-5 py-4">{"⭐".repeat(review.rating)}</td>

                  <td className="px-5 py-4 text-[#4A4A44]">{formatDate(review.createdAt)}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 text-sm ${
                        STATUS_STYLES[review.status] || "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(review)}
                        className="border border-[#2E2E28] text-[#2E2E28] px-4 py-2 hover:bg-[#2E2E28] hover:text-white transition-colors"
                      >
                        View
                      </button>

                      {review.status !== "Approved" && (
                        <button
                          onClick={() => handleApprove(review._id)}
                          disabled={actionId === review._id}
                          className="border border-[#5E6B58] text-[#5E6B58] px-4 py-2 hover:bg-[#5E6B58] hover:text-white transition-colors disabled:opacity-50"
                        >
                          {actionId === review._id ? "..." : "Approve"}
                        </button>
                      )}

                      {review.status !== "Rejected" && (
                        <button
                          onClick={() => handleReject(review._id)}
                          disabled={actionId === review._id}
                          className="border border-[#9B4A3F] text-[#9B4A3F] px-4 py-2 hover:bg-[#9B4A3F] hover:text-white transition-colors disabled:opacity-50"
                        >
                          {actionId === review._id ? "..." : "Reject"}
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(review._id)}
                        disabled={actionId === review._id}
                        className="border border-[#9B4A3F] text-[#9B4A3F] px-4 py-2 hover:bg-[#9B4A3F] hover:text-white transition-colors disabled:opacity-50"
                      >
                        {actionId === review._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl p-8 border border-[#E4E0D4]">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-2xl font-bold text-[#2E2E28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Review Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-3xl leading-none text-[#6B6B63] hover:text-[#2E2E28]"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-[#2E2E28]">
              <p><strong>Customer:</strong> {selected.name}</p>
              <p><strong>Package:</strong> {selected.productId?.name || "—"}</p>
              <p><strong>Rating:</strong> {"⭐".repeat(selected.rating)}</p>
              <p><strong>Date:</strong> {formatDate(selected.createdAt)}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 text-sm ${
                    STATUS_STYLES[selected.status] || "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                  }`}
                >
                  {selected.status}
                </span>
              </p>

              {selected.title && (
                <p><strong>Title:</strong> {selected.title}</p>
              )}

              <div className="bg-[#F8F5EE] border border-[#E4E0D4] p-5 text-[#4A4A44]">
                {selected.review}
              </div>

              {selected.images?.length > 0 && (
                <div className="flex gap-3 flex-wrap pt-2">
                  {selected.images.map((src, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={idx}
                      src={src}
                      alt={`Review attachment ${idx + 1}`}
                      className="w-20 h-20 object-cover border border-[#E4E0D4]"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {selected.status !== "Approved" && (
                <button
                  onClick={() => handleApprove(selected._id)}
                  disabled={actionId === selected._id}
                  className="flex-1 bg-[#5E6B58] text-white px-4 py-3 hover:opacity-90 disabled:opacity-50"
                >
                  {actionId === selected._id ? "Approving..." : "Approve Review"}
                </button>
              )}

              {selected.status !== "Rejected" && (
                <button
                  onClick={() => handleReject(selected._id)}
                  disabled={actionId === selected._id}
                  className="flex-1 border border-[#9B4A3F] text-[#9B4A3F] px-4 py-3 hover:bg-[#9B4A3F] hover:text-white disabled:opacity-50"
                >
                  {actionId === selected._id ? "Rejecting..." : "Reject Review"}
                </button>
              )}

              <button
                onClick={() => handleDelete(selected._id)}
                disabled={actionId === selected._id}
                className="flex-1 border border-[#9B4A3F] text-[#9B4A3F] px-4 py-3 hover:bg-[#9B4A3F] hover:text-white disabled:opacity-50"
              >
                {actionId === selected._id ? "Deleting..." : "Delete Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
