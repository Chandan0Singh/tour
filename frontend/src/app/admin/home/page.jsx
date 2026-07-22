"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/keyword";

const API = `${BACKEND_URL}/api/home`;

export default function AdminHomePage() {
  const [formData, setFormData] = useState({
    hero: {
      title: "",
      subtitle: "",
      description: "",
      backgroundImage: "",
      buttonText: "",
      buttonLink: "",
    },
    stats: {
      travelers: "",
      treks: "",
      destinations: "",
      rating: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();


      console.log("admin home : ", data )

      if (data.success && data.home) {
        setFormData(data.home);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }));
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(API, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      alert(result.success ? "Home Updated" : result.message);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Home Page Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          <h2 className="text-xl font-semibold">
            Hero Section
          </h2>

          <input
            type="text"
            name="title"
            value={formData.hero?.title || ""}
            onChange={handleHeroChange}
            placeholder="Hero Title"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="subtitle"
            value={formData.hero?.subtitle || ""}
            onChange={handleHeroChange}
            placeholder="Subtitle"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            value={formData.hero?.description || ""}
            onChange={handleHeroChange}
            placeholder="Description"
            rows={4}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="backgroundImage"
            value={formData.hero?.backgroundImage || ""}
            onChange={handleHeroChange}
            placeholder="Background Image URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="buttonText"
            value={formData.hero?.buttonText || ""}
            onChange={handleHeroChange}
            placeholder="Button Text"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="buttonLink"
            value={formData.hero?.buttonLink || ""}
            onChange={handleHeroChange}
            placeholder="Button Link"
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          <h2 className="text-xl font-semibold">
            Stats
          </h2>

          <input
            type="number"
            name="travelers"
            value={formData.stats?.travelers || ""}
            onChange={handleStatsChange}
            placeholder="Travelers"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="treks"
            value={formData.stats?.treks || ""}
            onChange={handleStatsChange}
            placeholder="Treks"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="destinations"
            value={formData.stats?.destinations || ""}
            onChange={handleStatsChange}
            placeholder="Destinations"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.stats?.rating || ""}
            onChange={handleStatsChange}
            placeholder="Rating"
            className="w-full border rounded-lg p-3"
          />

        </div>

        <button
          disabled={loading}
          className="bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>
  );
}
