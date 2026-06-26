const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Subscribed", "Unsubscribed"],
      default: "Subscribed",
    },

    subscribedAt: {
      type: Date,
      default: Date.now,
    },

    unsubscribedAt: {
      type: Date,
      default: null,
    },

    source: {
      type: String,
      enum: [
        "Homepage",
        "Footer",
        "Blog",
        "Popup",
        "Checkout",
      ],
      default: "Footer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);