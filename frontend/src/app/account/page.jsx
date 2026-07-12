"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  Package,
  Settings,
  LogOut,
  Pencil,
  Plus,
  Mountain,
  Calendar,
  ChevronRight,
} from "lucide-react";

// ---- static placeholder data -----------------------------------------
// Swap these for real fetches (GET /api/user/:id, GET /api/order/user/:id,
// GET /api/user/:id/addresses) whenever the backend is wired up — the tab
// structure and layout below won't need to change.

const USER = {
  name: "Chandan singh",
  email: "chandan.singh@example.com",
  phone: "+91 98765 43210",
  memberSince: "March 2024",
  avatar: "CR",
};

const BOOKINGS = [
  {
    id: "NE-20458",
    title: "Kedarkantha Trek",
    type: "Trek",
    date: "12 Jan 2026",
    status: "Upcoming",
    price: 6999,
    image:
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&q=80",
  },
  {
    id: "NE-19832",
    title: "Kashmir Valley Tour",
    type: "Tour",
    date: "04 Oct 2025",
    status: "Completed",
    price: 14999,
    image:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&q=80",
  },
  {
    id: "NE-18120",
    title: "Valley of Flowers Trek",
    type: "Trek",
    date: "18 Jul 2025",
    status: "Completed",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
  },
];

const ADDRESSES = [
  {
    id: "a1",
    label: "Home",
    name: "Chandan singh",
    line: "42 Rajpur Road, Dehradun, Uttarakhand, 248001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Work",
    name: "Chandan singh",
    line: "Tower B, Cyber Hub, DLF Phase 2, Gurugram, Haryana, 122002",
    phone: "+91 98765 43210",
    isDefault: false,
  },
];

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "My Bookings", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATUS_STYLES = {
  Upcoming: "bg-[#EAF1E9] text-[#5E6B58]",
  Completed: "bg-[#F0EEE9] text-gray-500",
  Cancelled: "bg-[#FBEAEA] text-[#B34747]",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="py-16 border-b border-[#E4E0D8]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[4px] text-[#5E6B58] text-sm mb-3">
            Welcome Back
          </p>
          <h1
            className="text-5xl text-[#2D2D2D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Account
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-[#E4E0D8] p-6 sticky top-24">
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#E4E0D8]">
              <div className="w-14 h-14 rounded-full bg-[#5E6B58] text-white flex items-center justify-center text-lg font-medium">
                {USER.avatar}
              </div>
              <div>
                <p className="text-[#2D2D2D] font-medium">{USER.name}</p>
                <p className="text-xs text-gray-400">
                  Member since {USER.memberSince}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      isActive
                        ? "bg-[#5E6B58] text-white"
                        : "text-[#2D2D2D] hover:bg-[#F8F5EE]"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-[#B34747] hover:bg-[#FBEAEA] transition-colors mt-2">
                <LogOut size={16} />
                Log Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "addresses" && <AddressesTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

// ---- tabs -------------------------------------------------------------

function SectionCard({ title, action, children }) {
  return (
    <div className="bg-white border border-[#E4E0D8] p-8">
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function ProfileTab() {
  const [form, setForm] = useState({
    name: USER.name,
    email: USER.email,
    phone: USER.phone,
  });
  const [editing, setEditing] = useState(false);

  return (
    <SectionCard
      title="Profile Details"
      action={
        <button
          onClick={() => setEditing((v) => !v)}
          className="flex items-center gap-2 text-sm text-[#5E6B58] uppercase tracking-[1px]"
        >
          <Pencil size={14} />
          {editing ? "Cancel" : "Edit"}
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Full Name"
          value={form.name}
          editing={editing}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          label="Email"
          value={form.email}
          editing={editing}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <Field
          label="Phone"
          value={form.phone}
          editing={editing}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
        />
      </div>

      {editing && (
        <button
          onClick={() => setEditing(false)}
          className="mt-8 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-sm hover:bg-[#4b5847] transition-colors"
        >
          Save Changes
        </button>
      )}
    </SectionCard>
  );
}

function Field({ label, value, editing, onChange }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
        {label}
      </label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
        />
      ) : (
        <p className="text-[#2D2D2D]">{value}</p>
      )}
    </div>
  );
}

function BookingsTab() {
  return (
    <SectionCard title="My Bookings">
      <div className="space-y-4">
        {BOOKINGS.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col sm:flex-row gap-4 border border-[#E4E0D8] p-4"
          >
            <img
              src={booking.image}
              alt={booking.title}
              className="w-full sm:w-28 h-32 sm:h-20 object-cover flex-shrink-0"
            />
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-[1px] text-[#5E6B58]">
                    <Mountain size={11} />
                    {booking.type}
                  </span>
                  <span className="text-xs text-gray-400">
                    #{booking.id}
                  </span>
                </div>
                <h3 className="text-[#2D2D2D] font-medium">
                  {booking.title}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Calendar size={12} />
                  {booking.date}
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2">
                <span
                  className={`px-3 py-1 text-[11px] uppercase tracking-[1px] ${
                    STATUS_STYLES[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
                <p className="text-[#2D2D2D] font-semibold">
                  ₹{booking.price.toLocaleString()}
                </p>
              </div>

              <button className="flex items-center gap-1 text-xs text-[#5E6B58] uppercase tracking-[1px] whitespace-nowrap">
                View Details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AddressesTab() {
  return (
    <SectionCard
      title="Saved Addresses"
      action={
        <button className="flex items-center gap-2 text-sm text-[#5E6B58] uppercase tracking-[1px]">
          <Plus size={14} />
          Add New
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {ADDRESSES.map((addr) => (
          <div
            key={addr.id}
            className="border border-[#E4E0D8] p-5 relative"
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[1px] bg-[#EAF1E9] text-[#5E6B58] px-2 py-1">
                Default
              </span>
            )}
            <p className="text-xs uppercase tracking-[1px] text-[#5E6B58] mb-2">
              {addr.label}
            </p>
            <p className="text-[#2D2D2D] font-medium">{addr.name}</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {addr.line}
            </p>
            <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
            <div className="flex gap-4 mt-4 text-xs uppercase tracking-[1px]">
              <button className="text-[#5E6B58]">Edit</button>
              <button className="text-[#B34747]">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SettingsTab() {
  return (
    <SectionCard title="Account Settings">
      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
            />
          </div>
        </div>

        <button className="px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-sm hover:bg-[#4b5847] transition-colors">
          Update Password
        </button>

        <div className="pt-6 border-t border-[#E4E0D8]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#2D2D2D] font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">
                Trip reminders, offers, and booking updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-[#E4E0D8] peer-checked:bg-[#5E6B58] rounded-full transition-colors" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}