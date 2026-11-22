const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
    },

    bannerImage: {
      type: [String],
      required: true,
      default: [],
    },

    heroTitle: {
      type: String,
      required: true,
      trim: true,
    },

    heroSubtitle: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Destination", destinationSchema);
