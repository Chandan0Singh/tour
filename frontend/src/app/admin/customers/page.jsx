"use client";

import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "@/keyword";

const API_BASE = `${BACKEND_URL}/api/user`;

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewCustomer, setViewCustomer] = useState(null);

  const limit = 10;

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        role: "user",
        page: currentPage,
        limit,
      });

      if (search.trim()) params.set("search", search.trim());
      if (status !== "All Status") params.set("status", status);

      const response = await fetch(`${API_BASE}/search?${params.toString()}`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to load customers");
      }

      setCustomers(data.users || []);
      setTotalUsers(data.totalUsers || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.log("fetchCustomers error:", err);
      setError("Could not load customers. Please try again.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [search, status, currentPage]);

  // Debounce search so we don't hit the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchCustomers();
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const toggleStatus = async (customer) => {
    const newStatus = customer.status === "active" ? "blocked" : "active";

    try {
      const response = await fetch(`${API_BASE}/block`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: customer._id, status: newStatus }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      setCustomers((prev) =>
        prev.map((c) =>
          c._id === customer._id ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (err) {
      console.log("toggleStatus error:", err);
      alert("Could not update customer status.");
    }
  };

  const deleteCustomer = async (customer) => {
    if (!confirm(`Delete ${customer.name || customer.email}?`)) return;

    try {
      const response = await fetch(`${API_BASE}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: customer._id }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete customer");
      }

      setCustomers((prev) => prev.filter((c) => c._id !== customer._id));
      setTotalUsers((prev) => prev - 1);
    } catch (err) {
      console.log("deleteCustomer error:", err);
      alert("Could not delete customer.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const activeCount = customers.filter((c) => c.status === "active").length;
  const blockedCount = customers.filter((c) => c.status === "blocked").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-gray-500 mt-2">Manage all registered customers.</p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Customers</p>
          <h2 className="text-3xl font-bold mt-2">{totalUsers}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Active (this page)</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {activeCount}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Blocked (this page)</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {blockedCount}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="flex-1 border rounded-lg px-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option>All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {error && (
          <div className="p-5 text-red-600 border-b bg-red-50">{error}</div>
        )}

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left">Customer</th>
              <th className="px-5 py-4 text-left">Phone</th>
              <th className="px-5 py-4 text-left">Joined</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                        {(customer.name || customer.firstName || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {customer.name ||
                            `${customer.firstName} ${customer.lastName}`}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">{customer.phone || "-"}</td>

                  <td className="px-5 py-4">
                    {formatDate(customer.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm capitalize ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 flex gap-2">
                    <button
                      onClick={() => setViewCustomer(customer)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() => toggleStatus(customer)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        customer.status === "active"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {customer.status === "active" ? "Block" : "Unblock"}
                    </button>

                    <button
                      onClick={() => deleteCustomer(customer)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-lg bg-white shadow disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* View Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {viewCustomer.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {viewCustomer.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {viewCustomer.phone || "-"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {viewCustomer.address || "-"}
              </p>
              <p>
                <span className="font-semibold">Joined:</span>{" "}
                {formatDate(viewCustomer.createdAt)}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">{viewCustomer.status}</span>
              </p>
            </div>

            <button
              onClick={() => setViewCustomer(null)}
              className="mt-6 w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
