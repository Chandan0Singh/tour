const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
});

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
  },
  { timestamps: true }
);

const packageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Tour", "Trek"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
    },

    shortDescription: String,

    description: String,

    destination: {
      type: String,
      required: true,
    },

    state: String,

    country: {
      type: String,
      default: "India",
    },

    duration: {
      days: Number,
      nights: Number,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Difficult"],
    },

    altitude: Number,

    startingPoint: String,

    endingPoint: String,

    price: {
      type: Number,
      required: true,
    },

    discountPrice: Number,

    availableSeats: Number,

    groupSize: {
      min: Number,
      max: Number,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    bannerImage: String,

    gallery: [String],

    highlights: [String],

    inclusions: [String],

    exclusions: [String],

    thingsToCarry: [String],

    itinerary: [itinerarySchema],

    departureDates: [Date],

    cancellationPolicy: String,

    termsAndConditions: String,

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    featured: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", packageSchema);