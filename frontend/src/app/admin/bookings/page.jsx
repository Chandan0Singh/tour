"use client";

import { useMemo, useState } from "react";

const bookingsData = [
  {
    id: "BK1001",
    customer: "Rahul Sharma",
    package: "Kedarnath Trek",
    persons: 4,
    amount: 35996,
    travelDate: "15 Jul 2026",
    bookedOn: "24 Jun 2026",
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "BK1002",
    customer: "Priya Verma",
    package: "Goa Tour",
    persons: 2,
    amount: 19998,
    travelDate: "20 Jul 2026",
    bookedOn: "22 Jun 2026",
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "BK1003",
    customer: "Amit Singh",
    package: "Manali Tour",
    persons: 5,
    amount: 54995,
    travelDate: "30 Jul 2026",
    bookedOn: "20 Jun 2026",
    payment: "Paid",
    status: "Completed",
  },
  {
    id: "BK1004",
    customer: "Neha Gupta",
    package: "Valley of Flowers Trek",
    persons: 3,
    amount: 26997,
    travelDate: "05 Aug 2026",
    bookedOn: "18 Jun 2026",
    payment: "Refunded",
    status: "Cancelled",
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState(bookingsData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return bookings.filter((item) => {
      const matchSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.package.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "All" ? true : item.status === status;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, status]);

  const deleteBooking = (id) => {
    if (!confirm("Delete this booking?")) return;

    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-gray-500 mt-2">
            View and manage customer bookings.
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">
            {bookings.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Confirmed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {bookings.filter((b) => b.status === "Confirmed").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {bookings.filter((b) => b.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ₹
            {bookings
              .filter((b) => b.payment === "Paid")
              .reduce((sum, item) => sum + item.amount, 0)
              .toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search booking..."
          className="flex-1 border rounded-lg px-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-5 py-4 text-left">Booking ID</th>
              <th className="px-5 py-4 text-left">Customer</th>
              <th className="px-5 py-4 text-left">Package</th>
              <th className="px-5 py-4 text-left">Persons</th>
              <th className="px-5 py-4 text-left">Travel Date</th>
              <th className="px-5 py-4 text-left">Amount</th>
              <th className="px-5 py-4 text-left">Payment</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((booking) => (

              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4 font-medium">
                  {booking.id}
                </td>

                <td className="px-5 py-4">
                  {booking.customer}
                </td>

                <td className="px-5 py-4">
                  {booking.package}
                </td>

                <td className="px-5 py-4">
                  {booking.persons}
                </td>

                <td className="px-5 py-4">
                  {booking.travelDate}
                </td>

                <td className="px-5 py-4 font-semibold">
                  ₹{booking.amount.toLocaleString()}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.payment === "Paid"
                        ? "bg-green-100 text-green-700"
                        : booking.payment === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.payment}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                <td className="px-5 py-4 flex gap-2">

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                    View
                  </button>

                  <button
                    onClick={() => deleteBooking(booking.id)}
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

    </div>
  );
}