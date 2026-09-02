"use client";
import { useEffect, useMemo, useState } from "react";
import PackageCard from "./PackageCard";

import { BACKEND_URL } from "@/keyword";

/**
 * type: "Tour" | "Trek" | null  (null = fetch both, used for /destinations/[state])
 * state: string (e.g. "goa", "himachal-pradesh")
 * heading: optional custom page title override
 */
export default function PackageGrid({ type = null, state, heading }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  useEffect(() => {
    if (!state) return;

    const fetchPackages = async () => {
      setLoading(true);
      setError(null);

      try {
        const types = type ? [type] : ["Tour", "Trek"];

        const responses = await Promise.all(
          types.map((t) =>
            fetch(
              `${BACKEND_URL}/api/products/categories?type=${t}&state=${state}`
            ).then((res) => res.json())
          )
        );

        const failed = responses.find((r) => !r.success);
        if (failed) {
          throw new Error(failed.message || "Failed to fetch packages");
        }

        setPackages(responses.flatMap((r) => r.products));
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [type, state]);

  const filteredPackages = useMemo(() => {
    if (difficultyFilter === "All") return packages;
    return packages.filter((p) => p.difficulty === difficultyFilter);
  }, [packages, difficultyFilter]);

  const stateDisplay = state
    ? state.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  const pageTitle =
    heading || `${type ? type + "s" : "Tours & Treks"} in ${stateDisplay}`;

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb__link">
            Home
          </a>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{stateDisplay}</span>
        </nav>

        <div className="section-header">
          <div className="section-header__left">
            <span className="section-eyebrow">Explore</span>
            <h2 className="section-title">{pageTitle}</h2>
            <p className="section-subtitle">
              {filteredPackages.length}{" "}
              {filteredPackages.length === 1 ? "package" : "packages"} found
            </p>
          </div>

          <div className="filter-group">
            {["All", "Easy", "Moderate", "Difficult"].map((level) => (
              <button
                key={level}
                className={`filter-pill ${
                  difficultyFilter === level ? "active" : ""
                }`}
                onClick={() => setDifficultyFilter(level)}
                type="button"
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="grid-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card"
                style={{ minHeight: 320, background: "#f0f0f0" }}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div style={{ padding: "3rem 0", textAlign: "center" }}>
            <p className="text-muted">Couldn't load packages: {error}</p>
          </div>
        )}

        {!loading && !error && filteredPackages.length === 0 && (
          <div style={{ padding: "3rem 0", textAlign: "center" }}>
            <p className="text-muted">
              No packages found for this destination.
            </p>
          </div>
        )}

        {!loading && !error && filteredPackages.length > 0 && (
          <div className="grid-3">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}