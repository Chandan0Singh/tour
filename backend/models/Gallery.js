const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    // Image URL
    image: {
      type: String,
      required: true,
    },

    // Optional Video URL
    video: {
      type: String,
      default: "",
    },

    // Related Tour / Trek
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    category: {
      type: String,
      enum: [
        "Tour",
        "Trek",
        "Destination",
        "Adventure",
        "Camping",
        "Wildlife",
        "Snow",
        "Other",
      ],
      default: "Other",
    },

    location: {
      type: String,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);