
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BACKEND_URL } from "@/keyword";

const API = `${BACKEND_URL}/api/destinations`;

const initialForm = {
  state: "",
  slug: "",
  country: "India",
  bannerImage: [""],
  heroTitle: "",
  heroSubtitle: "",
  description: "",
  isActive: true,
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
};

export default function DestinationBannerPage() {
  const params = useParams();
  const router = useRouter();

  const slug = decodeURIComponent(params.slug || "").toLowerCase();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  }, [slug]);

  // Fetch destination
  const fetchDestination = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API}/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      );

      if (res.status === 404) {
        setExists(false);

        setForm({
          ...initialForm,
          state: slug
            .split("-")
            .map((word) =>
              word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" "),
          slug,
        });

        return;
      }

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load destination");
      }

      const destination = data.destination;

      setExists(true);

      setForm({
        ...initialForm,
        ...destination,
        bannerImage:
          destination.bannerImage?.length > 0
            ? destination.bannerImage
            : [""],
        seo: {
          ...initialForm.seo,
          ...destination.seo,
          keywords: destination.seo?.keywords || [],
        },
      });

      setKeywordInput(
        (destination.seo?.keywords || []).join(", ")
      );

    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to load destination");
    } finally {
      setLoading(false);
    }
  };

  // Update normal fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update SEO fields
  const handleSEOChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  // Update banner image
  const updateBanner = (index, value) => {
    const updated = [...form.bannerImage];

    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      bannerImage: updated,
    }));
  };

  // Add banner
  const addBanner = () => {
    setForm((prev) => ({
      ...prev,
      bannerImage: [...prev.bannerImage, ""],
    }));
  };

  // Remove banner
  const removeBanner = (index) => {
    setForm((prev) => ({
      ...prev,
      bannerImage:
        prev.bannerImage.length > 1
          ? prev.bannerImage.filter((_, i) => i !== index)
          : [""],
    }));
  };

  // Save destination
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.state.trim() || !form.heroTitle.trim()) {
      alert("State name and hero title are required");
      return;
    }

    const banners = form.bannerImage
      .map((image) => image.trim())
      .filter(Boolean);

    if (banners.length === 0) {
      alert("Please add at least one banner image URL");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase(),
        bannerImage: banners,
        seo: {
          ...form.seo,
          keywords: keywordInput
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean),
        },
      };

      const res = await fetch(
        exists
          ? `${API}/${encodeURIComponent(slug)}`
          : API,
        {
          method: exists ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save destination");
      }

      setExists(true);

      alert(
        exists
          ? "Destination updated successfully!"
          : "Destination created successfully!"
      );

      if (!exists) {
        router.replace(
          `/admin/packages/banner/${encodeURIComponent(payload.slug)}`
        );
      } else {
        fetchDestination();
      }

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">
          Loading destination...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <form onSubmit={handleSubmit}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <Link
              href="/admin/packages"
              className="text-sm text-green-700 hover:underline"
            >
              ← Back to Packages
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              Destination Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage destination banners and hero content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <span
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                exists
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {exists ? "Existing Destination" : "New Destination"}
            </span>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {saving ? "Saving..." : "Save Destination"}
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Details */}
            <div className="bg-white rounded-xl border shadow-sm p-5 md:p-6">

              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Destination Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    State Name *
                  </label>

                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Delhi"
                    required
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL Slug *
                  </label>

                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="delhi"
                    required
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Country
                  </label>

                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="India"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

              </div>
            </div>

            {/* Banner Images */}
            <div className="bg-white rounded-xl border shadow-sm p-5 md:p-6">

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Banner Images
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add multiple images for this destination.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addBanner}
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
                >
                  + Add Image
                </button>

              </div>

              <div className="space-y-5">

                {form.bannerImage.map((image, index) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4"
                  >

                    <div className="flex justify-between items-center mb-3">

                      <h3 className="font-medium text-sm">
                        Banner Image {index + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() => removeBanner(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>

                    </div>

                    <input
                      type="text"
                      value={image}
                      onChange={(e) =>
                        updateBanner(index, e.target.value)
                      }
                      placeholder="Enter image URL"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                    />

                    {image && (
                      <div className="mt-4 h-48 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={`Banner ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                  </div>

                ))}

              </div>
            </div>

            {/* Hero Content */}
            <div className="bg-white rounded-xl border shadow-sm p-5 md:p-6">

              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Hero Section Content
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hero Title *
                  </label>

                  <input
                    name="heroTitle"
                    value={form.heroTitle}
                    onChange={handleChange}
                    placeholder="Discover the Magic of Delhi"
                    required
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hero Subtitle
                  </label>

                  <input
                    name="heroSubtitle"
                    value={form.heroSubtitle}
                    onChange={handleChange}
                    placeholder="Explore unforgettable experiences"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Destination Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write about this destination..."
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 resize-y"
                  />
                </div>

              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border shadow-sm p-5 md:p-6">

              <h2 className="text-lg font-bold text-gray-900 mb-5">
                SEO Settings
              </h2>

              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Title
                  </label>

                  <input
                    name="metaTitle"
                    value={form.seo.metaTitle}
                    onChange={handleSEOChange}
                    placeholder="Delhi Tours and Travel"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Description
                  </label>

                  <textarea
                    name="metaDescription"
                    value={form.seo.metaDescription}
                    onChange={handleSEOChange}
                    rows={3}
                    placeholder="Enter SEO meta description..."
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    SEO Keywords
                  </label>

                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Delhi tours, Delhi travel, Delhi packages"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Separate keywords using commas.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Status */}
            <div className="bg-white rounded-xl border shadow-sm p-5">

              <h2 className="font-bold text-gray-900 mb-4">
                Destination Status
              </h2>

              <label className="flex items-center justify-between gap-3 cursor-pointer">

                <div>
                  <p className="font-medium text-sm">
                    Active Destination
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Show this destination on website.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 accent-green-700"
                />

              </label>

            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border shadow-sm p-5">

              <h2 className="font-bold text-gray-900 mb-4">
                Hero Preview
              </h2>

              <div className="relative h-64 rounded-xl overflow-hidden bg-gray-200">

                {form.bannerImage.find((img) => img.trim()) ? (
                  <img
                    src={form.bannerImage.find((img) => img.trim())}
                    alt="Hero preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 h-full flex flex-col justify-center p-5 text-white">

                  <p className="text-xs uppercase tracking-widest text-white/70">
                    Explore {form.country}
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    {form.heroTitle || form.state || "Hero Title"}
                  </h3>

                  <p className="text-sm mt-3 text-white/80">
                    {form.heroSubtitle || "Your hero subtitle will appear here"}
                  </p>

                </div>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Preview uses the first available banner image.
              </p>

            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl border shadow-sm p-5">

              <h2 className="font-bold text-gray-900 mb-4">
                Destination Information
              </h2>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">State</span>
                  <span className="font-medium text-right">
                    {form.state || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Country</span>
                  <span className="font-medium">
                    {form.country || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Banner Images</span>
                  <span className="font-medium">
                    {form.bannerImage.filter((img) => img.trim()).length}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Status</span>
                  <span className={form.isActive ? "text-green-700" : "text-red-600"}>
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-end mt-8">

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            {saving ? "Saving..." : "Save Destination"}
          </button>

        </div>

      </form>
    </div>
  );
}
