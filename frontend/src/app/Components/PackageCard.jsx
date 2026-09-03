"use client";
import Link from "next/link";

export default function PackageCard({ pkg }) {
  const {
    slug,
    type,
    title,
    destination,
    state,
    duration,
    difficulty,
    price,
    discountPrice,
    averageRating,
    totalReviews,
    images,
    bannerImage,
  } = pkg;

  const image = bannerImage || images?.[0]?.url || "/placeholder.jpg";
  const imageAlt = images?.[0]?.alt || title;

  const basePath = type === "Trek" ? "treks" : "tours";
  const href = `/${basePath}/${state?.toLowerCase()}/${slug}`;

  const difficultyClass =
    difficulty === "Easy"
      ? "badge--easy"
      : difficulty === "Moderate"
      ? "badge--moderate"
      : difficulty === "Difficult"
      ? "badge--hard"
      : "";

  return (
    <Link href={href} className="card">
      <img
        src={image}
        alt={imageAlt}
        className="card__image card__image--landscape"
      />
      <div className="card__body">
        <span className="card__tag">{type}</span>
        <h3 className="card__title truncate-2">{title}</h3>

        <div className="card__meta">
          {duration?.days ? (
            <span className="card__meta-item">
              🗓️ {duration.days}D/{duration.nights}N
            </span>
          ) : null}
          {destination ? (
            <span className="card__meta-item">📍 {destination}</span>
          ) : null}
          {difficulty ? (
            <span className={`badge ${difficultyClass}`}>{difficulty}</span>
          ) : null}
        </div>

        {averageRating > 0 ? (
          <div className="stars">
            ⭐ {averageRating.toFixed(1)}{" "}
            <span className="text-xs text-muted">({totalReviews})</span>
          </div>
        ) : null}

        <div className="flex-between mt-sm">
          <div>
            {discountPrice ? (
              <>
                <span className="card__price">
                  ₹{discountPrice.toLocaleString("en-IN")}
                </span>
                <span
                  className="text-xs text-muted"
                  style={{ textDecoration: "line-through", marginLeft: 6 }}
                >
                  ₹{price?.toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="card__price">
                ₹{price?.toLocaleString("en-IN")}
              </span>
            )}
            <div className="card__price-note">per person</div>
          </div>
        </div>
      </div>
    </Link>
  );
}