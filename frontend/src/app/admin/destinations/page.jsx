"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const API = "http://localhost:5000/api/products";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    try {
      const res = await fetch(`${API}?limit=100`);
      const data = await res.json();

      if (data.success) {
        setDestinations(data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this destination?")) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      setDestinations((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  const filtered = useMemo(() => {
    return destinations.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.destination?.toLowerCase().includes(keyword) ||
        item.title?.toLowerCase().includes(keyword) ||
        item.state?.toLowerCase().includes(keyword)
      );
    });
  }, [destinations, search]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Destination Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all travel destinations
          </p>
        </div>

        <Link
          href="/admin/destinations/add"
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
        >
          + Add Destination
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <input
          type="text"
          placeholder="Search destination..."
          className="w-full border rounded-lg px-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left">Image</th>
              <th className="px-5 py-4 text-left">Destination</th>
              <th className="px-5 py-4 text-left">State</th>
              <th className="px-5 py-4 text-left">Country</th>
              <th className="px-5 py-4 text-left">Packages</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  No destinations found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="relative w-24 h-16 rounded overflow-hidden">
                      <Image
                        src={
                          item.bannerImage ||
                          item.images?.[0]?.url ||
                          "/placeholder.jpg"
                        }
                        fill
                        alt={item.destination}
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {item.destination}
                  </td>

                  <td className="px-5 py-4">
                    {item.state}
                  </td>

                  <td className="px-5 py-4">
                    {item.country}
                  </td>

                  <td className="px-5 py-4">
                    {item.title}
                  </td>

                  <td className="px-5 py-4 flex gap-3">
                    <Link
                      href={`/admin/destinations/edit/${item._id}`}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}