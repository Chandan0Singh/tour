"use client";

import { useMemo, useState } from "react";

const dummyEnquiries = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "9876543210",
    destination: "Kedarnath Trek",
    date: "24 Jun 2026",
    status: "New",
    message:
      "I want to know the itinerary and available dates for Kedarnath Trek.",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "9876501234",
    destination: "Goa Tour",
    date: "22 Jun 2026",
    status: "Contacted",
    message:
      "Please share package details and hotel information.",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "amit@gmail.com",
    phone: "9898989898",
    destination: "Manali Tour",
    date: "20 Jun 2026",
    status: "Closed",
    message:
      "Booking completed successfully.",
  },
];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState(dummyEnquiries);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.destination.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ? true : item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, status]);

  function deleteEnquiry(id) {
    if (!confirm("Delete this enquiry?")) return;

    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Enquiry Management</h1>
        <p className="text-gray-500 mt-2">
          Manage customer enquiries.
        </p>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Total</h3>
          <h2 className="text-3xl font-bold mt-2">
            {enquiries.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">New</h3>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {enquiries.filter((e) => e.status === "New").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="text-gray-500">Closed</h3>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {enquiries.filter((e) => e.status === "Closed").length}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4">

        <input
          className="border rounded-lg px-4 py-3 flex-1"
          placeholder="Search enquiry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Closed</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Phone</th>
              <th className="px-5 py-4 text-left">Destination</th>
              <th className="px-5 py-4 text-left">Date</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium">{item.name}</td>
                <td className="px-5 py-4">{item.email}</td>
                <td className="px-5 py-4">{item.phone}</td>
                <td className="px-5 py-4">{item.destination}</td>
                <td className="px-5 py-4">{item.date}</td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4 flex gap-3">

                  <button
                    onClick={() => setSelected(item)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteEnquiry(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Modal */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-xl w-full p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Enquiry Details
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="text-2xl"
              >
                ×
              </button>

            </div>

            <div className="space-y-3">

              <p><strong>Name:</strong> {selected.name}</p>

              <p><strong>Email:</strong> {selected.email}</p>

              <p><strong>Phone:</strong> {selected.phone}</p>

              <p><strong>Destination:</strong> {selected.destination}</p>

              <p><strong>Status:</strong> {selected.status}</p>

              <p><strong>Message:</strong></p>

              <div className="bg-gray-100 rounded-lg p-4">
                {selected.message}
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}