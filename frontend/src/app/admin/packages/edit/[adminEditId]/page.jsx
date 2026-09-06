"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { BACKEND_URL } from "@/keyword";

const initialState = {
  type: "Tour",
  title: "",
  slug: "",
  shortDescription: "",
  description: "",

  destination: "",
  state: "",
  country: "India",

  duration: {
    days: "",
    nights: "",
  },

  difficulty: "Easy",
  altitude: "",

  startingPoint: "",
  endingPoint: "",

  price: "",
  discountPrice: "",
  availableSeats: "",

  groupSize: {
    min: "",
    max: "",
  },

  images: [],
  bannerImage: "",
  gallery: [],

  highlights: [],
  inclusions: [],
  exclusions: [],
  thingsToCarry: [],

  itinerary: [],

  departureDates: [],

  cancellationPolicy: "",
  termsAndConditions: "",

  faqs: [],

  featured: false,
  bestSeller: false,
  status: "Active",

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
  },
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, required = false }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  ...props
}) {
  return (
    <input
      {...props}
      type={type}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
    />
  );
}

function Textarea({ value, onChange, placeholder = "", rows = 4 }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value ?? ""}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
    >
      {children}
    </select>
  );
}

function StringListEditor({ items, setItems, placeholder }) {
  const addItem = () => {
    setItems([...items, ""]);
  };

  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
          />

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="rounded-xl border border-red-200 px-4 text-red-600 hover:bg-red-50"
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
      >
        + Add
      </button>
    </div>
  );
}

export default function EditPackagePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.adminEditId;

  console.log("EditPackagePage params:", params?.adminEditId);

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Fetch Product
  // -----------------------------

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching product with ID:", id);

        const response = await axios.get(
          `${BACKEND_URL}/api/products/by-id/${id}`
        );

        const product = response.data.product;

        console.log("Fetched product:", product);

        setFormData({
          type: product.type || "Tour",

          title: product.title || "",
          slug: product.slug || "",

          shortDescription: product.shortDescription || "",
          description: product.description || "",

          destination: product.destination || "",
          state: product.state || "",
          country: product.country || "India",

          duration: {
            days: product.duration?.days ?? "",
            nights: product.duration?.nights ?? "",
          },

          difficulty: product.difficulty || "Easy",
          altitude: product.altitude ?? "",

          startingPoint: product.startingPoint || "",
          endingPoint: product.endingPoint || "",

          price: product.price ?? "",
          discountPrice: product.discountPrice ?? "",
          availableSeats: product.availableSeats ?? "",

          groupSize: {
            min: product.groupSize?.min ?? "",
            max: product.groupSize?.max ?? "",
          },

          images: (product.images || []).map((image) => ({
            url: image.url || "",
            alt: image.alt || "",
          })),

          bannerImage: product.bannerImage || "",

          gallery: product.gallery || [],

          highlights: product.highlights || [],
          inclusions: product.inclusions || [],
          exclusions: product.exclusions || [],
          thingsToCarry: product.thingsToCarry || [],

          itinerary: (product.itinerary || []).map((item, index) => ({
            day: item.day ?? index + 1,
            title: item.title || "",
            description: item.description || "",
          })),

          departureDates: (product.departureDates || []).map((date) => {
            if (typeof date === "string") {
              return date.substring(0, 10);
            }

            return new Date(date).toISOString().substring(0, 10);
          }),

          cancellationPolicy: product.cancellationPolicy || "",

          termsAndConditions: product.termsAndConditions || "",

          faqs: (product.faqs || []).map((faq) => ({
            question: faq.question || "",
            answer: faq.answer || "",
          })),

          featured: Boolean(product.featured),
          bestSeller: Boolean(product.bestSeller),

          status: product.status || "Active",

          seo: {
            metaTitle: product.seo?.metaTitle || "",
            metaDescription: product.seo?.metaDescription || "",
            keywords: product.seo?.keywords || [],
          },
        });
      } catch (err) {
        console.error("Error fetching product:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to load package."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // -----------------------------
  // Simple Field Update
  // -----------------------------

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  // -----------------------------
  // Images
  // -----------------------------

  const addImage = () => {
    updateField("images", [
      ...formData.images,
      {
        url: "",
        alt: "",
      },
    ]);
  };

  const updateImage = (index, field, value) => {
    const images = [...formData.images];

    images[index] = {
      ...images[index],
      [field]: value,
    };

    updateField("images", images);
  };

  const removeImage = (index) => {
    updateField(
      "images",
      formData.images.filter((_, i) => i !== index)
    );
  };

  // -----------------------------
  // Gallery
  // -----------------------------

  const addGallery = () => {
    updateField("gallery", [...formData.gallery, ""]);
  };

  const updateGallery = (index, value) => {
    const gallery = [...formData.gallery];
    gallery[index] = value;
    updateField("gallery", gallery);
  };

  const removeGallery = (index) => {
    updateField(
      "gallery",
      formData.gallery.filter((_, i) => i !== index)
    );
  };

  // -----------------------------
  // Itinerary
  // -----------------------------

  const addItinerary = () => {
    updateField("itinerary", [
      ...formData.itinerary,
      {
        day: formData.itinerary.length + 1,
        title: "",
        description: "",
      },
    ]);
  };

  const updateItinerary = (index, field, value) => {
    const itinerary = [...formData.itinerary];

    itinerary[index] = {
      ...itinerary[index],
      [field]: value,
    };

    updateField("itinerary", itinerary);
  };

  const removeItinerary = (index) => {
    const itinerary = formData.itinerary
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        day: i + 1,
      }));

    updateField("itinerary", itinerary);
  };

  // -----------------------------
  // FAQ
  // -----------------------------

  const addFaq = () => {
    updateField("faqs", [
      ...formData.faqs,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const updateFaq = (index, field, value) => {
    const faqs = [...formData.faqs];

    faqs[index] = {
      ...faqs[index],
      [field]: value,
    };

    updateField("faqs", faqs);
  };

  const removeFaq = (index) => {
    updateField(
      "faqs",
      formData.faqs.filter((_, i) => i !== index)
    );
  };

  // -----------------------------
  // Departure Dates
  // -----------------------------

  const addDepartureDate = () => {
    updateField("departureDates", [
      ...formData.departureDates,
      "",
    ]);
  };

  const updateDepartureDate = (index, value) => {
    const dates = [...formData.departureDates];
    dates[index] = value;

    updateField("departureDates", dates);
  };

  const removeDepartureDate = (index) => {
    updateField(
      "departureDates",
      formData.departureDates.filter((_, i) => i !== index)
    );
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,

        duration: {
          days: Number(formData.duration.days),
          nights: Number(formData.duration.nights),
        },

        altitude:
          formData.altitude === ""
            ? undefined
            : Number(formData.altitude),

        price: Number(formData.price),

        discountPrice:
          formData.discountPrice === ""
            ? undefined
            : Number(formData.discountPrice),

        availableSeats:
          formData.availableSeats === ""
            ? undefined
            : Number(formData.availableSeats),

        groupSize: {
          min:
            formData.groupSize.min === ""
              ? undefined
              : Number(formData.groupSize.min),

          max:
            formData.groupSize.max === ""
              ? undefined
              : Number(formData.groupSize.max),
        },

        itinerary: formData.itinerary.map((item, index) => ({
          day: Number(item.day) || index + 1,
          title: item.title,
          description: item.description,
        })),

        departureDates: formData.departureDates
          .filter(Boolean)
          .map((date) => new Date(`${date}T00:00:00.000Z`)),

        images: formData.images.filter((image) => image.url),

        gallery: formData.gallery.filter(Boolean),

        highlights: formData.highlights.filter(Boolean),
        inclusions: formData.inclusions.filter(Boolean),
        exclusions: formData.exclusions.filter(Boolean),
        thingsToCarry: formData.thingsToCarry.filter(Boolean),

        seo: {
          metaTitle: formData.seo.metaTitle,
          metaDescription: formData.seo.metaDescription,
          keywords: formData.seo.keywords.filter(Boolean),
        },
      };

      await axios.put(
        `${BACKEND_URL}/api/products/${id}`,
        payload
      );

      alert("Package updated successfully!");

      router.push("/admin/packages");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to update package."
      );
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
          <p className="text-sm text-gray-500">
            Loading package...
          </p>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Failed to load package
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-4 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-3 text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
              Edit Package
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update package information and save your changes.
            </p>
          </div>

          <div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
            <span className="text-gray-500">Package ID: </span>
            <span className="font-medium">{id}</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFORMATION */}

          <SectionCard title="Basic Information">
            <div className="grid gap-5 md:grid-cols-2">

              <Field label="Package Type" required>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    updateField("type", e.target.value)
                  }
                >
                  <option value="Tour">Tour</option>
                  <option value="Trek">Trek</option>
                </Select>
              </Field>

              <Field label="Title" required>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;

                    updateField("title", title);

                    // Only automatically update slug
                    // if title is being edited.
                    updateField("slug", slugify(title));
                  }}
                />
              </Field>

              <Field label="Slug" required>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    updateField(
                      "slug",
                      slugify(e.target.value)
                    )
                  }
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Short Description">
                  <TextInput
                    value={formData.shortDescription}
                    onChange={(e) =>
                      updateField(
                        "shortDescription",
                        e.target.value
                      )
                    }
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Description">
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      updateField(
                        "description",
                        e.target.value
                      )
                    }
                    rows={7}
                  />
                </Field>
              </div>

            </div>
          </SectionCard>

          {/* LOCATION */}

          <SectionCard title="Location">
            <div className="grid gap-5 md:grid-cols-3">

              <Field label="Destination" required>
                <Input
                  value={formData.destination}
                  onChange={(e) =>
                    updateField(
                      "destination",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="State">
                <Input
                  value={formData.state}
                  onChange={(e) =>
                    updateField("state", e.target.value)
                  }
                />
              </Field>

              <Field label="Country">
                <Input
                  value={formData.country}
                  onChange={(e) =>
                    updateField("country", e.target.value)
                  }
                />
              </Field>

            </div>
          </SectionCard>

          {/* TRIP DETAILS */}

          <SectionCard title="Trip Details">

            <div className="grid gap-5 md:grid-cols-4">

              <Field label="Days">
                <Input
                  type="number"
                  value={formData.duration.days}
                  onChange={(e) =>
                    updateNestedField(
                      "duration",
                      "days",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Nights">
                <Input
                  type="number"
                  value={formData.duration.nights}
                  onChange={(e) =>
                    updateNestedField(
                      "duration",
                      "nights",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Difficulty">
                <Select
                  value={formData.difficulty}
                  onChange={(e) =>
                    updateField(
                      "difficulty",
                      e.target.value
                    )
                  }
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Difficult">Difficult</option>
                </Select>
              </Field>

              <Field label="Altitude (m)">
                <Input
                  type="number"
                  value={formData.altitude}
                  onChange={(e) =>
                    updateField(
                      "altitude",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Starting Point">
                <Input
                  value={formData.startingPoint}
                  onChange={(e) =>
                    updateField(
                      "startingPoint",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Ending Point">
                <Input
                  value={formData.endingPoint}
                  onChange={(e) =>
                    updateField(
                      "endingPoint",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Minimum Group Size">
                <Input
                  type="number"
                  value={formData.groupSize.min}
                  onChange={(e) =>
                    updateNestedField(
                      "groupSize",
                      "min",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Maximum Group Size">
                <Input
                  type="number"
                  value={formData.groupSize.max}
                  onChange={(e) =>
                    updateNestedField(
                      "groupSize",
                      "max",
                      e.target.value
                    )
                  }
                />
              </Field>

            </div>
          </SectionCard>

          {/* PRICING */}

          <SectionCard title="Pricing & Availability">

            <div className="grid gap-5 md:grid-cols-3">

              <Field label="Original Price" required>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    updateField("price", e.target.value)
                  }
                />
              </Field>

              <Field label="Discount Price">
                <Input
                  type="number"
                  value={formData.discountPrice}
                  onChange={(e) =>
                    updateField(
                      "discountPrice",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Available Seats">
                <Input
                  type="number"
                  value={formData.availableSeats}
                  onChange={(e) =>
                    updateField(
                      "availableSeats",
                      e.target.value
                    )
                  }
                />
              </Field>

            </div>
          </SectionCard>

          {/* MEDIA */}

          <SectionCard title="Media">

            <div className="space-y-6">

              <Field label="Banner Image">
                <Input
                  value={formData.bannerImage}
                  onChange={(e) =>
                    updateField(
                      "bannerImage",
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                />
              </Field>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">
                    Package Images
                  </h3>

                  <button
                    type="button"
                    onClick={addImage}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white"
                  >
                    + Add Image
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="rounded-xl border p-4"
                    >
                      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">

                        <Input
                          value={image.url}
                          onChange={(e) =>
                            updateImage(
                              index,
                              "url",
                              e.target.value
                            )
                          }
                          placeholder="Image URL"
                        />

                        <Input
                          value={image.alt}
                          onChange={(e) =>
                            updateImage(
                              index,
                              "alt",
                              e.target.value
                            )
                          }
                          placeholder="Alt text"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="rounded-xl border border-red-200 px-4 text-red-600"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">
                    Gallery
                  </h3>

                  <button
                    type="button"
                    onClick={addGallery}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white"
                  >
                    + Add Image
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.gallery.map((url, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <Input
                        value={url}
                        onChange={(e) =>
                          updateGallery(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Gallery image URL"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeGallery(index)
                        }
                        className="rounded-xl border border-red-200 px-4 text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </SectionCard>

          {/* HIGHLIGHTS */}

          <SectionCard title="Highlights">
            <StringListEditor
              items={formData.highlights}
              setItems={(items) =>
                updateField("highlights", items)
              }
              placeholder="Enter package highlight"
            />
          </SectionCard>

          {/* INCLUSIONS */}

          <SectionCard title="Inclusions">
            <StringListEditor
              items={formData.inclusions}
              setItems={(items) =>
                updateField("inclusions", items)
              }
              placeholder="Enter inclusion"
            />
          </SectionCard>

          {/* EXCLUSIONS */}

          <SectionCard title="Exclusions">
            <StringListEditor
              items={formData.exclusions}
              setItems={(items) =>
                updateField("exclusions", items)
              }
              placeholder="Enter exclusion"
            />
          </SectionCard>

          {/* THINGS TO CARRY */}

          <SectionCard title="Things To Carry">
            <StringListEditor
              items={formData.thingsToCarry}
              setItems={(items) =>
                updateField(
                  "thingsToCarry",
                  items
                )
              }
              placeholder="Enter item"
            />
          </SectionCard>

          {/* ITINERARY */}

          <SectionCard title="Itinerary">

            <div className="space-y-5">

              {formData.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Day {item.day}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        removeItinerary(index)
                      }
                      className="text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">

                    <Field label="Day Title">
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          updateItinerary(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Description">
                      <Textarea
                        value={item.description}
                        onChange={(e) =>
                          updateItinerary(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={5}
                      />
                    </Field>

                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addItinerary}
                className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium"
              >
                + Add Day
              </button>

            </div>
          </SectionCard>

          {/* DEPARTURE DATES */}

          <SectionCard title="Departure Dates">

            <div className="space-y-3">

              {formData.departureDates.map(
                (date, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        updateDepartureDate(
                          index,
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeDepartureDate(index)
                      }
                      className="rounded-xl border border-red-200 px-4 text-red-600"
                    >
                      ×
                    </button>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addDepartureDate}
                className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium"
              >
                + Add Departure Date
              </button>

            </div>
          </SectionCard>

          {/* POLICIES */}

          <SectionCard title="Policies">

            <div className="space-y-5">

              <Field label="Cancellation Policy">
                <Textarea
                  value={formData.cancellationPolicy}
                  onChange={(e) =>
                    updateField(
                      "cancellationPolicy",
                      e.target.value
                    )
                  }
                  rows={5}
                />
              </Field>

              <Field label="Terms & Conditions">
                <Textarea
                  value={formData.termsAndConditions}
                  onChange={(e) =>
                    updateField(
                      "termsAndConditions",
                      e.target.value
                    )
                  }
                  rows={7}
                />
              </Field>

            </div>
          </SectionCard>

          {/* FAQ */}

          <SectionCard title="FAQs">

            <div className="space-y-5">

              {formData.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border p-5"
                >
                  <div className="mb-4 flex justify-between">
                    <h3 className="font-semibold">
                      FAQ {index + 1}
                    </h3>

                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">

                    <Field label="Question">
                      <Input
                        value={faq.question}
                        onChange={(e) =>
                          updateFaq(
                            index,
                            "question",
                            e.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="Answer">
                      <Textarea
                        value={faq.answer}
                        onChange={(e) =>
                          updateFaq(
                            index,
                            "answer",
                            e.target.value
                          )
                        }
                        rows={4}
                      />
                    </Field>

                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addFaq}
                className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-medium"
              >
                + Add FAQ
              </button>

            </div>
          </SectionCard>

          {/* SEO */}

          <SectionCard title="SEO">

            <div className="space-y-5">

              <Field label="Meta Title">
                <Input
                  value={formData.seo.metaTitle}
                  onChange={(e) =>
                    updateNestedField(
                      "seo",
                      "metaTitle",
                      e.target.value
                    )
                  }
                />
              </Field>

              <Field label="Meta Description">
                <Textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) =>
                    updateNestedField(
                      "seo",
                      "metaDescription",
                      e.target.value
                    )
                  }
                  rows={4}
                />
              </Field>

              <Field label="SEO Keywords">
                <StringListEditor
                  items={formData.seo.keywords}
                  setItems={(items) =>
                    updateNestedField(
                      "seo",
                      "keywords",
                      items
                    )
                  }
                  placeholder="SEO keyword"
                />
              </Field>

            </div>
          </SectionCard>

          {/* STATUS */}

          <SectionCard title="Package Settings">

            <div className="grid gap-5 md:grid-cols-3">

              <Field label="Status">
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </Field>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    updateField(
                      "featured",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium">
                  Featured Package
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                <input
                  type="checkbox"
                  checked={formData.bestSeller}
                  onChange={(e) =>
                    updateField(
                      "bestSeller",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium">
                  Best Seller
                </span>
              </label>

            </div>
          </SectionCard>

          {/* ACTIONS */}

          <div className="sticky bottom-4 flex justify-end gap-3 rounded-2xl border bg-white p-4 shadow-lg">

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update Package"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

// Small text input helper
function TextInput({ value, onChange, placeholder = "" }) {
  return (
    <input
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
    />
  );
}