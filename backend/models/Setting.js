const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    // Website Information
    siteName: {
      type: String,
      required: true,
    },

    siteLogo: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    siteDescription: {
      type: String,
      default: "",
    },

    // Contact Details
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    // Social Media
    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    // SEO
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: [
      {
        type: String,
      },
    ],

    // Google Services
    googleAnalyticsId: {
      type: String,
      default: "",
    },

    googleMapEmbed: {
      type: String,
      default: "",
    },

    // Footer
    copyright: {
      type: String,
      default: "",
    },

    // Booking
    currency: {
      type: String,
      default: "INR",
    },

    bookingEmail: {
      type: String,
      default: "",
    },

    bookingPhone: {
      type: String,
      default: "",
    },

    // Maintenance
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);