"use client";
import { useState } from "react";
import axios from "axios";

const emptyImage = () => ({ url: "", alt: "" });
const emptyItineraryDay = () => ({ day: "", title: "", description: "" });
const emptyFaq = () => ({ question: "", answer: "" });

const initialState = {
  type: "Tour",
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  destination: "",
  state: "",
  country: "India",
  duration: { days: "", nights: "" },
  difficulty: "Easy",
  altitude: "",
  startingPoint: "",
  endingPoint: "",
  price: "",
  discountPrice: "",
  availableSeats: "",
  groupSize: { min: "", max: "" },
  images: [emptyImage()],
  bannerImage: "",
  gallery: [""],
  highlights: [""],
  inclusions: [""],
  exclusions: [""],
  thingsToCarry: [""],
  itinerary: [emptyItineraryDay()],
  departureDates: [""],
  cancellationPolicy: "",
  termsAndConditions: "",
  faqs: [emptyFaq()],
  featured: false,
  bestSeller: false,
  status: "Active",
  seo: { metaTitle: "", metaDescription: "", keywords: [""] },
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ---------- Reusable pieces ----------

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <h2 className="fd text-lg text-[#1B3A1F] mb-1">{title}</h2>
      {subtitle && <p className="text-xs text-gray-400 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-gray-600">
        {label}
        {required && <span className="text-[#B71C1C] ml-0.5">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1B5E20] focus:ring-1 focus:ring-[#1B5E20] transition-colors bg-[#FBFAF8]";

function TextInput(props) {
  return <input {...props} className={inputClass} />;
}

function TextArea(props) {
  return <textarea {...props} className={`${inputClass} min-h-[90px] resize-y`} />;
}

// Generic list of plain strings (highlights, inclusions, exclusions, gallery, etc.)
function StringListEditor({ label, hint, items, onChange, placeholder }) {
  const update = (idx, value) => {
    const next = [...items];
    next[idx] = value;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <button
          type="button"
          onClick={add}
          className="text-xs font-semibold text-[#1B5E20] hover:underline"
        >
          + Add
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="flex flex-col gap-2">
        {items.map((val, idx) => (
          <div key={idx} className="flex gap-2">
            <TextInput
              value={val}
              placeholder={placeholder}
              onChange={(e) => update(idx, e.target.value)}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-xs text-[#B71C1C] px-2 hover:underline whitespace-nowrap"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AddPackagePage() {
  const [formData, setFormData] = useState(initialState);
  const [slugTouched, setSlugTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success' | 'error', text }

  const setField = (path, value) => {
    setFormData((prev) => {
      const next = { ...prev };
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        next[parent] = { ...prev[parent], [child]: value };
      } else {
        next[path] = value;
      }
      return next;
    });
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setField("title", value);
    if (!slugTouched) {
      setField("slug", slugify(value));
    }
  };

  // ---- images ----
  const updateImage = (idx, key, value) => {
    const next = [...formData.images];
    next[idx] = { ...next[idx], [key]: value };
    setField("images", next);
  };
  const addImage = () => setField("images", [...formData.images, emptyImage()]);
  const removeImage = (idx) =>
    setField(
      "images",
      formData.images.filter((_, i) => i !== idx)
    );

  // ---- itinerary ----
  const updateItineraryDay = (idx, key, value) => {
    const next = [...formData.itinerary];
    next[idx] = { ...next[idx], [key]: value };
    setField("itinerary", next);
  };
  const addItineraryDay = () =>
    setField("itinerary", [...formData.itinerary, emptyItineraryDay()]);
  const removeItineraryDay = (idx) =>
    setField(
      "itinerary",
      formData.itinerary.filter((_, i) => i !== idx)
    );

  // ---- faqs ----
  const updateFaq = (idx, key, value) => {
    const next = [...formData.faqs];
    next[idx] = { ...next[idx], [key]: value };
    setField("faqs", next);
  };
  const addFaq = () => setField("faqs", [...formData.faqs, emptyFaq()]);
  const removeFaq = (idx) =>
    setField(
      "faqs",
      formData.faqs.filter((_, i) => i !== idx)
    );

  // ---- departure dates ----
  const updateDepartureDate = (idx, value) => {
    const next = [...formData.departureDates];
    next[idx] = value;
    setField("departureDates", next);
  };
  const addDepartureDate = () =>
    setField("departureDates", [...formData.departureDates, ""]);
  const removeDepartureDate = (idx) =>
    setField(
      "departureDates",
      formData.departureDates.filter((_, i) => i !== idx)
    );

  // ---- seo keywords ----
  const updateKeyword = (idx, value) => {
    const next = [...formData.seo.keywords];
    next[idx] = value;
    setField("seo.keywords", next);
  };
  const addKeyword = () =>
    setField("seo.keywords", [...formData.seo.keywords, ""]);
  const removeKeyword = (idx) =>
    setField(
      "seo.keywords",
      formData.seo.keywords.filter((_, i) => i !== idx)
    );

  const buildPayload = () => {
    const clean = (arr) => (arr || []).map((v) => v?.trim?.() ?? v).filter((v) => v);

    return {
      type: formData.type,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      destination: formData.destination.trim(),
      state: formData.state.trim(),
      country: formData.country.trim() || "India",
      duration: {
        days: formData.duration.days ? Number(formData.duration.days) : undefined,
        nights: formData.duration.nights ? Number(formData.duration.nights) : undefined,
      },
      difficulty: formData.difficulty,
      altitude: formData.altitude ? Number(formData.altitude) : undefined,
      startingPoint: formData.startingPoint.trim(),
      endingPoint: formData.endingPoint.trim(),
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
      availableSeats: formData.availableSeats ? Number(formData.availableSeats) : undefined,
      groupSize: {
        min: formData.groupSize.min ? Number(formData.groupSize.min) : undefined,
        max: formData.groupSize.max ? Number(formData.groupSize.max) : undefined,
      },
      images: formData.images.filter((img) => img.url.trim()),
      bannerImage: formData.bannerImage.trim(),
      gallery: clean(formData.gallery),
      highlights: clean(formData.highlights),
      inclusions: clean(formData.inclusions),
      exclusions: clean(formData.exclusions),
      thingsToCarry: clean(formData.thingsToCarry),
      itinerary: formData.itinerary
        .filter((d) => d.title.trim() || d.description.trim())
        .map((d) => ({
          day: d.day ? Number(d.day) : undefined,
          title: d.title.trim(),
          description: d.description.trim(),
        })),
      departureDates: clean(formData.departureDates),
      cancellationPolicy: formData.cancellationPolicy.trim(),
      termsAndConditions: formData.termsAndConditions.trim(),
      faqs: formData.faqs.filter((f) => f.question.trim() || f.answer.trim()),
      featured: formData.featured,
      bestSeller: formData.bestSeller,
      status: formData.status,
      seo: {
        metaTitle: formData.seo.metaTitle.trim(),
        metaDescription: formData.seo.metaDescription.trim(),
        keywords: clean(formData.seo.keywords),
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!formData.title.trim() || !formData.slug.trim() || !formData.destination.trim() || !formData.price) {
      setStatusMsg({
        type: "error",
        text: "Please fill in title, slug, destination, and price — these are required.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const payload = buildPayload();
      await axios.post("http://localhost:5000/api/products", payload);
      setStatusMsg({ type: "success", text: "Package created successfully." });
      setFormData(initialState);
      setSlugTouched(false);
    } catch (err) {
      setStatusMsg({
        type: "error",
        text:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to create package. Check the fields and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F9F7F4] pb-20"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');.fd{font-family:'Playfair Display',serif}`}</style>

      {/* HEADER */}
      <header className="bg-[#1B5E20] text-white py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#A5D6A7] text-xs font-semibold uppercase tracking-widest">
            Admin
          </span>
          <h1 className="fd text-3xl mt-2">Add a New Package</h1>
          <p className="text-white/65 text-sm mt-1">
            Create a new Tour or Trek listing. Fields marked with{" "}
            <span className="text-[#FFAB91]">*</span> are required.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-5 pt-8">
        {statusMsg && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium ${
              statusMsg.type === "success"
                ? "bg-[#E8F5E9] text-[#2E7D32]"
                : "bg-[#FFEBEE] text-[#B71C1C]"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* BASIC INFO */}
        <SectionCard title="Basic Information">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Package Type" required>
              <select
                className={inputClass}
                value={formData.type}
                onChange={(e) => setField("type", e.target.value)}
              >
                <option value="Tour">Tour</option>
                <option value="Trek">Trek</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                className={inputClass}
                value={formData.status}
                onChange={(e) => setField("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>
          </div>

          <Field label="Title" required>
            <TextInput
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Kedarkantha Winter Trek"
            />
          </Field>

          <Field
            label="Slug"
            required
            hint="Auto-generated from title. Edit manually if needed."
          >
            <TextInput
              value={formData.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setField("slug", e.target.value);
              }}
              placeholder="kedarkantha-winter-trek"
            />
          </Field>

          <Field label="Short Description">
            <TextInput
              value={formData.shortDescription}
              onChange={(e) => setField("shortDescription", e.target.value)}
              placeholder="One-line summary shown on listing cards"
            />
          </Field>

          <Field label="Full Description">
            <TextArea
              value={formData.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Detailed description of the package"
            />
          </Field>
        </SectionCard>

        {/* LOCATION */}
        <SectionCard title="Location">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Destination" required>
              <TextInput
                value={formData.destination}
                onChange={(e) => setField("destination", e.target.value)}
                placeholder="e.g. Kedarkantha"
              />
            </Field>
            <Field label="State">
              <TextInput
                value={formData.state}
                onChange={(e) => setField("state", e.target.value)}
                placeholder="e.g. Uttarakhand"
              />
            </Field>
            <Field label="Country">
              <TextInput
                value={formData.country}
                onChange={(e) => setField("country", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Starting Point">
              <TextInput
                value={formData.startingPoint}
                onChange={(e) => setField("startingPoint", e.target.value)}
              />
            </Field>
            <Field label="Ending Point">
              <TextInput
                value={formData.endingPoint}
                onChange={(e) => setField("endingPoint", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* TRIP DETAILS */}
        <SectionCard title="Trip Details">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Duration (Days)">
              <TextInput
                type="number"
                min="0"
                value={formData.duration.days}
                onChange={(e) => setField("duration.days", e.target.value)}
              />
            </Field>
            <Field label="Duration (Nights)">
              <TextInput
                type="number"
                min="0"
                value={formData.duration.nights}
                onChange={(e) => setField("duration.nights", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Difficulty">
              <select
                className={inputClass}
                value={formData.difficulty}
                onChange={(e) => setField("difficulty", e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Difficult">Difficult</option>
              </select>
            </Field>
            <Field label="Altitude (ft)">
              <TextInput
                type="number"
                min="0"
                value={formData.altitude}
                onChange={(e) => setField("altitude", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Group Size (Min)">
              <TextInput
                type="number"
                min="0"
                value={formData.groupSize.min}
                onChange={(e) => setField("groupSize.min", e.target.value)}
              />
            </Field>
            <Field label="Group Size (Max)">
              <TextInput
                type="number"
                min="0"
                value={formData.groupSize.max}
                onChange={(e) => setField("groupSize.max", e.target.value)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* PRICING */}
        <SectionCard title="Pricing & Availability">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Price (₹)" required>
              <TextInput
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setField("price", e.target.value)}
              />
            </Field>
            <Field label="Discount Price (₹)" hint="Optional — shown as the sale price">
              <TextInput
                type="number"
                min="0"
                value={formData.discountPrice}
                onChange={(e) => setField("discountPrice", e.target.value)}
              />
            </Field>
            <Field label="Available Seats">
              <TextInput
                type="number"
                min="0"
                value={formData.availableSeats}
                onChange={(e) => setField("availableSeats", e.target.value)}
              />
            </Field>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="accent-[#1B5E20]"
                checked={formData.featured}
                onChange={(e) => setField("featured", e.target.checked)}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="accent-[#1B5E20]"
                checked={formData.bestSeller}
                onChange={(e) => setField("bestSeller", e.target.checked)}
              />
              Best Seller
            </label>
          </div>
        </SectionCard>

        {/* MEDIA */}
        <SectionCard title="Media" subtitle="Cover images, banner, and gallery">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-600">Images</span>
              <button
                type="button"
                onClick={addImage}
                className="text-xs font-semibold text-[#1B5E20] hover:underline"
              >
                + Add image
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="flex gap-2">
                  <TextInput
                    value={img.url}
                    placeholder="Image URL"
                    onChange={(e) => updateImage(idx, "url", e.target.value)}
                  />
                  <TextInput
                    value={img.alt}
                    placeholder="Alt text"
                    onChange={(e) => updateImage(idx, "alt", e.target.value)}
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-xs text-[#B71C1C] px-2 hover:underline whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Field label="Banner Image URL">
            <TextInput
              value={formData.bannerImage}
              onChange={(e) => setField("bannerImage", e.target.value)}
              placeholder="Wide banner image for the package detail page"
            />
          </Field>

          <StringListEditor
            label="Gallery"
            items={formData.gallery}
            onChange={(v) => setField("gallery", v)}
            placeholder="Gallery image URL"
          />
        </SectionCard>

        {/* HIGHLIGHTS / INCLUSIONS */}
        <SectionCard title="Highlights & What's Included">
          <StringListEditor
            label="Highlights"
            items={formData.highlights}
            onChange={(v) => setField("highlights", v)}
            placeholder="e.g. Summit view of Himalayan peaks"
          />
          <StringListEditor
            label="Inclusions"
            items={formData.inclusions}
            onChange={(v) => setField("inclusions", v)}
            placeholder="e.g. All meals"
          />
          <StringListEditor
            label="Exclusions"
            items={formData.exclusions}
            onChange={(v) => setField("exclusions", v)}
            placeholder="e.g. Personal expenses"
          />
          <StringListEditor
            label="Things to Carry"
            items={formData.thingsToCarry}
            onChange={(v) => setField("thingsToCarry", v)}
            placeholder="e.g. Trekking shoes"
          />
        </SectionCard>

        {/* ITINERARY */}
        <SectionCard title="Itinerary" subtitle="Day-by-day plan">
          <div className="flex flex-col gap-4">
            {formData.itinerary.map((day, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-xl p-4 bg-[#FBFAF8] flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-widest">
                    Day {idx + 1}
                  </span>
                  {formData.itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(idx)}
                      className="text-xs text-[#B71C1C] hover:underline"
                    >
                      Remove day
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-[100px_1fr] gap-3">
                  <TextInput
                    type="number"
                    min="1"
                    placeholder="Day #"
                    value={day.day}
                    onChange={(e) => updateItineraryDay(idx, "day", e.target.value)}
                  />
                  <TextInput
                    placeholder="Day title, e.g. Summit Day"
                    value={day.title}
                    onChange={(e) => updateItineraryDay(idx, "title", e.target.value)}
                  />
                </div>
                <TextArea
                  placeholder="What happens on this day"
                  value={day.description}
                  onChange={(e) => updateItineraryDay(idx, "description", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryDay}
              className="self-start text-xs font-semibold text-[#1B5E20] hover:underline"
            >
              + Add another day
            </button>
          </div>
        </SectionCard>

        {/* DEPARTURE DATES */}
        <SectionCard title="Departure Dates">
          <div className="flex flex-col gap-2">
            {formData.departureDates.map((date, idx) => (
              <div key={idx} className="flex gap-2">
                <TextInput
                  type="date"
                  value={date}
                  onChange={(e) => updateDepartureDate(idx, e.target.value)}
                />
                {formData.departureDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDepartureDate(idx)}
                    className="text-xs text-[#B71C1C] px-2 hover:underline whitespace-nowrap"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDepartureDate}
              className="self-start text-xs font-semibold text-[#1B5E20] hover:underline"
            >
              + Add date
            </button>
          </div>
        </SectionCard>

        {/* POLICIES */}
        <SectionCard title="Policies">
          <Field label="Cancellation Policy">
            <TextArea
              value={formData.cancellationPolicy}
              onChange={(e) => setField("cancellationPolicy", e.target.value)}
            />
          </Field>
          <Field label="Terms & Conditions">
            <TextArea
              value={formData.termsAndConditions}
              onChange={(e) => setField("termsAndConditions", e.target.value)}
            />
          </Field>
        </SectionCard>

        {/* FAQS */}
        <SectionCard title="FAQs">
          <div className="flex flex-col gap-4">
            {formData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-xl p-4 bg-[#FBFAF8] flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#1B5E20] uppercase tracking-widest">
                    FAQ {idx + 1}
                  </span>
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="text-xs text-[#B71C1C] hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <TextInput
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => updateFaq(idx, "question", e.target.value)}
                />
                <TextArea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="self-start text-xs font-semibold text-[#1B5E20] hover:underline"
            >
              + Add FAQ
            </button>
          </div>
        </SectionCard>

        {/* SEO */}
        <SectionCard title="SEO">
          <Field label="Meta Title">
            <TextInput
              value={formData.seo.metaTitle}
              onChange={(e) => setField("seo.metaTitle", e.target.value)}
            />
          </Field>
          <Field label="Meta Description">
            <TextArea
              value={formData.seo.metaDescription}
              onChange={(e) => setField("seo.metaDescription", e.target.value)}
            />
          </Field>
          <StringListEditor
            label="Keywords"
            items={formData.seo.keywords}
            onChange={(v) => setField("seo.keywords", v)}
            placeholder="e.g. himalayan trek"
          />
        </SectionCard>

        {/* SUBMIT */}
        <div className="flex justify-end gap-3 sticky bottom-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#FF9800] hover:bg-[#F57C00] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors shadow-md"
          >
            {submitting ? "Creating..." : "Create Package"}
          </button>
        </div>
      </form>
    </div>
  );
}