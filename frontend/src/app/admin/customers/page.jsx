"use client";

import { useMemo, useState } from "react";

const initialCustomers = [
  {
    id: "CUS1001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    city: "Delhi",
    bookings: 5,
    joined: "15 Jan 2026",
    status: "Active",
  },
  {
    id: "CUS1002",
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "+91 9988776655",
    city: "Mumbai",
    bookings: 2,
    joined: "22 Feb 2026",
    status: "Blocked",
  },
  {
    id: "CUS1003",
    name: "Amit Singh",
    email: "amit@gmail.com",
    phone: "+91 9123456789",
    city: "Lucknow",
    bookings: 8,
    joined: "05 Mar 2026",
    status: "Active",
  },
  {
    id: "CUS1004",
    name: "Neha Gupta",
    email: "neha@gmail.com",
    phone: "+91 9871204567",
    city: "Jaipur",
    bookings: 1,
    joined: "10 Apr 2026",
    status: "Active",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);

      const matchesStatus =
        status === "All" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status:
                customer.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    if (!confirm("Delete this customer?")) return;

    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-gray-500 mt-2">
          Manage all registered customers.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Customers</p>
          <h2 className="text-3xl font-bold mt-2">
            {customers.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Active</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {customers.filter(c => c.status === "Active").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Blocked</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {customers.filter(c => c.status === "Blocked").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {customers.reduce((a, b) => a + b.bookings, 0)}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search customer..."
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
          <option>Active</option>
          <option>Blocked</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left">Customer</th>
              <th className="px-5 py-4 text-left">Phone</th>
              <th className="px-5 py-4 text-left">City</th>
              <th className="px-5 py-4 text-left">Bookings</th>
              <th className="px-5 py-4 text-left">Joined</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map((customer) => (

              <tr key={customer.id} className="border-t hover:bg-gray-50">

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="h-12 w-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                      {customer.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-500">
                        {customer.email}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-5 py-4">{customer.phone}</td>

                <td className="px-5 py-4">{customer.city}</td>

                <td className="px-5 py-4">{customer.bookings}</td>

                <td className="px-5 py-4">{customer.joined}</td>

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td className="px-5 py-4 flex gap-2">

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    View
                  </button>

                  <button
                    onClick={() => toggleStatus(customer.id)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      customer.status === "Active"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {customer.status === "Active"
                      ? "Block"
                      : "Unblock"}
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
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