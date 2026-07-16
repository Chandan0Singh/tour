const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
