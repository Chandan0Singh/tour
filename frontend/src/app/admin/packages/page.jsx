"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API = "http://localhost:5000/api/products";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const res = await fetch(`${API}?limit=100`);
      const data = await res.json();

      if (data.success) {
        setPackages(data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deletePackage(id) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      setPackages((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const filtered = useMemo(() => {
    return packages.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.destination?.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" ? true : item.type === type;

      return matchesSearch && matchesType;
    });
  }, [packages, search, type]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Package Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage Tours & Treks
          </p>
        </div>

        <Link
          href="/admin/packages/add"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
        >
          + Add Package
        </Link>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row gap-4 mb-8">

        <input
          placeholder="Search package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 flex-1"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option>All</option>
          <option>Tour</option>
          <option>Trek</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-5 py-4">Image</th>

              <th className="text-left px-5 py-4">Title</th>

              <th className="text-left px-5 py-4">Destination</th>

              <th className="text-left px-5 py-4">Type</th>

              <th className="text-left px-5 py-4">Price</th>

              <th className="text-left px-5 py-4">Status</th>

              <th className="text-left px-5 py-4">Tags</th>

              <th className="text-left px-5 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10"
                >
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-10 text-gray-500"
                >
                  No Packages Found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">

                    <div className="relative h-16 w-24 rounded overflow-hidden">

                      <Image
                        src={
                          item.bannerImage ||
                          item.images?.[0]?.url ||
                          "/placeholder.jpg"
                        }
                        fill
                        alt={item.title}
                        className="object-cover"
                      />

                    </div>

                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {item.title}
                  </td>

                  <td className="px-5 py-4">
                    {item.destination}
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm">
                      {item.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    ₹{item.price}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex gap-2">

                      {item.featured && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}

                      {item.bestSeller && (
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                          Best Seller
                        </span>
                      )}

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex gap-3">

                      <Link
                        href={`/admin/packages/edit/${item._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deletePackage(item._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </div>

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