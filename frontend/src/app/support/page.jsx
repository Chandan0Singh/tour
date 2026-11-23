"use client";

import { useState, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/keyword";
import {
  ChevronDown,
  Search,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Compass,
  CreditCard,
  ShieldCheck,
  Backpack,
  Users,
  Send,
  CheckCircle2,
} from "lucide-react";

// ---- content -----------------------------------------------------

const CATEGORIES = [
  { id: "all", label: "All Topics", icon: Compass },
  { id: "booking", label: "Bookings", icon: Compass },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "safety", label: "Safety & Gear", icon: ShieldCheck },
  { id: "groups", label: "Group Trips", icon: Users },
];

const FAQS = [
  {
    id: "f1",
    category: "booking",
    question: "How do I book a trek or tour package?",
    answer:
      "Open a package from the Treks or Tours page and review its available dates, inclusions, and booking options. Follow the booking steps shown for that package. If you need help with a booking, contact the travel desk with your booking ID.",
  },
  {
    id: "f2",
    category: "booking",
    question: "Can I customize a trek itinerary?",
    answer:
      "Customization depends on the package, route, and available dates. Send your preferred route, dates, and group size through the contact form so the travel desk can confirm what is possible.",
  },
  {
    id: "f3",
    category: "payments",
    question: "What payment methods are accepted?",
    answer:
      "Available payment methods and any advance-payment options are shown during checkout for the selected package.",
  },
  {
    id: "f4",
    category: "payments",
    question: "Is my payment information secure?",
    answer:
      "Complete payment only through the checkout page. Do not send card or banking details by email, phone, or WhatsApp. Contact support if the checkout page does not load or a payment status is unclear.",
  },
  {
    id: "f7",
    category: "safety",
    question: "What safety measures are in place on treks?",
    answer:
      "Safety requirements and support vary by route. Review the itinerary and trip-specific guidance before booking, and follow the trip leader's instructions during the trek. Contact the travel desk if a package's safety details are unclear.",
  },
  {
    id: "f8",
    category: "safety",
    question: "What gear should I bring?",
    answer:
      "Each package page includes a suggested packing list tailored to its difficulty level and season. As a baseline, we recommend sturdy trekking shoes, layered clothing, a rain shell, a headlamp, and a refillable water bottle.",
  },
  {
    id: "f9",
    category: "safety",
    question: "Do I need travel insurance?",
    answer:
      "Insurance requirements vary by package. Check the package details before booking and confirm that any policy you arrange covers the activities and locations on your itinerary.",
  },
  {
    id: "f10",
    category: "groups",
    question: "Do you offer discounts for group bookings?",
    answer:
      "Group availability and pricing depend on the package and requested dates. Send the group size and preferred dates through the contact form to request a quote.",
  },
  {
    id: "f11",
    category: "groups",
    question: "Can I book for someone else in my group separately?",
    answer:
      "Please follow the traveler-detail fields available during checkout. If your group needs separate bookings or a shared payment arrangement, contact the travel desk before booking.",
  },
  {
    id: "f12",
    category: "booking",
    question: "What is the best season to book a Himalayan trek?",
    answer:
      "The suitable season varies by route and year. Check the selected package's dates and trip information, and contact the travel desk if you need help choosing a departure.",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 90450 89285",
    hint: "Mon-Sat, 9am-7pm IST",
    href: "tel:+919045089285",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 93899 15896",
    hint: "Mon-Sat, 9am-7pm IST",
    href: "tel:+919389915896",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 90450 89285",
    hint: "Fastest response for quick questions",
    href: "https://wa.me/919045089285",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "travel.jaynegi@gmail.com",
    hint: "For booking queries, include your booking ID",
    href: "mailto:travel.jaynegi@gmail.com",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Dehradun, Uttarakhand, India",
    hint: "Contact us before visiting",
    href: "https://maps.google.com/?q=Dehradun%2C+Uttarakhand%2C+India",
  },
];

const API_BASE = `${BACKEND_URL}/api`;

// ---- component -----------------------------------------------------

export default function HelpSupportPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    bookingId: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !term ||
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const message = form.bookingId
        ? `Booking ID: ${form.bookingId}\n\n${form.message}`
        : form.message;
      await axios.post(`${API_BASE}/contact/send`, {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", bookingId: "", subject: "", message: "" });
    } catch (err) {
      setSubmitError(
        "We couldn't send your message right now. Please try again or reach us directly using the contact details above.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="py-16 border-b border-[#E4E0D8]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[4px] text-[#5E6B58] text-sm mb-3">
            We&apos;re Here to Help
          </p>
          <h1
            className="text-5xl text-[#2D2D2D]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Help &amp; Support
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Find answers about bookings, payments, and trip safety, or reach
            our travel desk directly.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a topic, e.g. booking, gear, group size…"
              className="w-full bg-white border border-[#E4E0D8] pl-12 pr-4 py-3.5 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 border text-sm uppercase tracking-[1px] transition-colors ${
                  isActive
                    ? "bg-[#5E6B58] border-[#5E6B58] text-white"
                    : "bg-white border-[#E4E0D8] text-[#5E6B58] hover:border-[#5E6B58]"
                }`}
              >
                <Icon size={15} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* FAQ list */}
          <div className="lg:col-span-2">
            <h2
              className="text-2xl text-[#2D2D2D] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="bg-white border border-[#E4E0D8] p-10 text-center text-gray-500">
                No results for that search. Try a different term or browse a
                category above.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white border border-[#E4E0D8]"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-[#2D2D2D] font-medium">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 text-[#5E6B58] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact panel */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E4E0D8] p-8">
              <h2
                className="text-2xl text-[#2D2D2D] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact Us
              </h2>
              <div className="space-y-5">
                {CONTACT_CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.href}
                      href={channel.href}
                      target={channel.label === "Visit Us" ? "_blank" : undefined}
                      rel={channel.label === "Visit Us" ? "noreferrer" : undefined}
                      className="flex items-start gap-3 group"
                    >
                      <span className="w-10 h-10 flex items-center justify-center bg-[#F8F5EE] border border-[#E4E0D8] text-[#5E6B58] flex-shrink-0">
                        <Icon size={17} />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[1px] text-gray-400">
                          {channel.label}
                        </span>
                        <span className="block text-[#2D2D2D] font-medium group-hover:text-[#5E6B58] transition-colors">
                          {channel.value}
                        </span>
                        <span className="block text-xs text-gray-400 mt-0.5">
                          {channel.hint}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#5E6B58] text-white p-8">
              <Backpack size={22} className="mb-3" />
              <h3
                className="text-xl mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Already on a trip?
              </h3>
              <p className="text-sm text-white/80">
                For help during an ongoing trip, call the travel desk at{" "}
                <a href="tel:+919045089285" className="underline">
                  +91 90450 89285
                </a>
                {" / "}
                <a href="tel:+919389915896" className="underline">
                  +91 93899 15896
                </a>
                . For immediate emergencies, contact local emergency services.
              </p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="mt-16 bg-white border border-[#E4E0D8] p-8 md:p-12 max-w-3xl mx-auto">
          <h2
            className="text-2xl text-[#2D2D2D] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Still need help?
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Send us a message and our travel desk will get back to you within 24
            hours.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={40} className="text-[#5E6B58] mb-4" />
              <h3
                className="text-xl text-[#2D2D2D] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Message sent
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Thanks for reaching out. We&apos;ve received your message and will
                respond by email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-[#5E6B58] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={handleFormChange("name")}
                    className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleFormChange("email")}
                    className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
                  Booking ID (optional)
                </label>
                <input
                  type="text"
                  value={form.bookingId}
                  onChange={handleFormChange("bookingId")}
                  placeholder="e.g. NE-20458"
                  className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={handleFormChange("subject")}
                  className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[1px] text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleFormChange("message")}
                  className="w-full border border-[#E4E0D8] px-4 py-3 text-sm outline-none focus:border-[#5E6B58] resize-none"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#5E6B58] text-white uppercase tracking-[3px] text-sm hover:bg-[#4b5847] transition disabled:opacity-60"
              >
                {submitting ? (
                  "Sending…"
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
