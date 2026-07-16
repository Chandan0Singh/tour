"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BOOKING_STATUS_STYLES = {
  Confirmed: "bg-[#EAF0F5] text-[#3E5C76] border border-[#3E5C76]",
  Pending: "bg-[#FBF3E4] text-[#8A6A2A] border border-[#8A6A2A]",
  Completed: "bg-[#EEF1EC] text-[#5E6B58] border border-[#5E6B58]",
  Cancelled: "bg-[#F7E9E7] text-[#9B4A3F] border border-[#9B4A3F]",
};

const PAYMENT_STATUS_STYLES = {
  Paid: "bg-[#EEF1EC] text-[#5E6B58] border border-[#5E6B58]",
  Pending: "bg-[#FBF3E4] text-[#8A6A2A] border border-[#8A6A2A]",
  Failed: "bg-[#F7E9E7] text-[#9B4A3F] border border-[#9B4A3F]",
  Refunded: "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]",
};

const BOOKING_STATUS_OPTIONS = ["Pending", "Confirmed", "Completed", "Cancelled"];
const PAYMENT_STATUS_OPTIONS = ["Pending", "Paid", "Failed", "Refunded"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [actionId, setActionId] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/bookings`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load bookings.");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || "Something went wrong while loading bookings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const packageName = (booking) =>
    booking.productId?.title || booking.productId?.name || "—";

  const updateStatus = async (id, bookingStatus) => {
    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingStatus }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not update booking status.");
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, bookingStatus } : b))
      );

      setSelected((prev) => (prev && prev._id === id ? { ...prev, bookingStatus } : prev));
    } catch (err) {
      alert(err.message || "Could not update booking status.");
    } finally {
      setActionId(null);
    }
  };

  const updatePayment = async (id, paymentStatus) => {
    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not update payment status.");
      }

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, paymentStatus } : b))
      );

      setSelected((prev) => (prev && prev._id === id ? { ...prev, paymentStatus } : prev));
    } catch (err) {
      alert(err.message || "Could not update payment status.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking? This cannot be undone.")) return;

    setActionId(id);

    try {
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Could not delete this booking.");
      }

      setBookings((prev) => prev.filter((b) => b._id !== id));
      setSelected((prev) => (prev && prev._id === id ? null : prev));
    } catch (err) {
      alert(err.message || "Could not delete this booking.");
    } finally {
      setActionId(null);
    }
  };

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const pkg = packageName(b).toLowerCase();

      const matchSearch =
        b.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.email?.toLowerCase().includes(search.toLowerCase()) ||
        pkg.includes(search.toLowerCase()) ||
        b._id?.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" ? true : b.bookingStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
    const pending = bookings.filter((b) => b.bookingStatus === "Pending").length;
    const revenue = bookings
      .filter((b) => b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return { total, confirmed, pending, revenue };
  }, [bookings]);

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
          Booking Management
        </h1>
        <p className="text-[#6B6B63] mt-2">
          View and manage customer bookings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2 text-[#2E2E28]">{stats.total}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Confirmed</p>
          <h2 className="text-3xl font-bold mt-2 text-[#3E5C76]">{stats.confirmed}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-[#8A6A2A]">{stats.pending}</h2>
        </div>

        <div className="bg-white border border-[#E4E0D4] p-6">
          <p className="text-[#6B6B63] text-sm">Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-[#5E6B58]">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E4E0D4] p-5 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by customer, email, package, or booking ID..."
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
          {BOOKING_STATUS_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
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
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Booking ID</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Customer</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Package</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Persons</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Travel Date</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Amount</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Payment</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Status</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-[#2E2E28]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-[#6B6B63]">
                  Loading bookings...
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-10 text-center text-[#6B6B63]">
                  No bookings match these filters.
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((booking) => (
                <tr key={booking._id} className="border-t border-[#E4E0D4] hover:bg-[#F8F5EE]">
                  <td className="px-5 py-4 font-medium text-[#2E2E28]">
                    {booking._id.slice(-8).toUpperCase()}
                  </td>

                  <td className="px-5 py-4 text-[#4A4A44]">{booking.name}</td>

                  <td className="px-5 py-4 text-[#4A4A44]">{packageName(booking)}</td>

                  <td className="px-5 py-4 text-[#4A4A44]">{booking.travelers}</td>

                  <td className="px-5 py-4 text-[#4A4A44]">{formatDate(booking.travelDate)}</td>

                  <td className="px-5 py-4 font-semibold text-[#2E2E28]">
                    ₹{(booking.totalAmount || 0).toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={booking.paymentStatus}
                      disabled={actionId === booking._id}
                      onChange={(e) => updatePayment(booking._id, e.target.value)}
                      className={`px-2 py-1 text-sm disabled:opacity-50 ${
                        PAYMENT_STATUS_STYLES[booking.paymentStatus] ||
                        "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                      }`}
                    >
                      {PAYMENT_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={booking.bookingStatus}
                      disabled={actionId === booking._id}
                      onChange={(e) => updateStatus(booking._id, e.target.value)}
                      className={`px-2 py-1 text-sm disabled:opacity-50 ${
                        BOOKING_STATUS_STYLES[booking.bookingStatus] ||
                        "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                      }`}
                    >
                      {BOOKING_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelected(booking)}
                        className="border border-[#2E2E28] text-[#2E2E28] px-4 py-2 hover:bg-[#2E2E28] hover:text-white transition-colors"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(booking._id)}
                        disabled={actionId === booking._id}
                        className="border border-[#9B4A3F] text-[#9B4A3F] px-4 py-2 hover:bg-[#9B4A3F] hover:text-white transition-colors disabled:opacity-50"
                      >
                        {actionId === booking._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl p-8 border border-[#E4E0D4]">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-2xl font-bold text-[#2E2E28]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Booking Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-3xl leading-none text-[#6B6B63] hover:text-[#2E2E28]"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-[#2E2E28]">
              <p><strong>Booking ID:</strong> {selected._id}</p>
              <p><strong>Customer:</strong> {selected.name}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Package:</strong> {packageName(selected)}</p>
              <p><strong>Travelers:</strong> {selected.travelers}</p>
              <p><strong>Travel Date:</strong> {formatDate(selected.travelDate)}</p>
              <p><strong>Booked On:</strong> {formatDate(selected.createdAt)}</p>
              <p><strong>Amount:</strong> ₹{(selected.totalAmount || 0).toLocaleString("en-IN")}</p>

              {selected.message && (
                <div className="bg-[#F8F5EE] border border-[#E4E0D4] p-5 text-[#4A4A44]">
                  {selected.message}
                </div>
              )}

              <div className="flex gap-6 pt-2">
                <div>
                  <p className="text-sm text-[#6B6B63] mb-1">Payment Status</p>
                  <span
                    className={`px-3 py-1 text-sm ${
                      PAYMENT_STATUS_STYLES[selected.paymentStatus] ||
                      "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                    }`}
                  >
                    {selected.paymentStatus}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-[#6B6B63] mb-1">Booking Status</p>
                  <span
                    className={`px-3 py-1 text-sm ${
                      BOOKING_STATUS_STYLES[selected.bookingStatus] ||
                      "bg-[#F0F0EA] text-[#4A4A44] border border-[#E4E0D4]"
                    }`}
                  >
                    {selected.bookingStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleDelete(selected._id)}
                disabled={actionId === selected._id}
                className="flex-1 border border-[#9B4A3F] text-[#9B4A3F] px-4 py-3 hover:bg-[#9B4A3F] hover:text-white disabled:opacity-50"
              >
                {actionId === selected._id ? "Deleting..." : "Delete Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}