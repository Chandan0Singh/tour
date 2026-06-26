const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Tour / Trek Package
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Booking Number
    bookingId: {
      type: String,
      unique: true,
    },

    // Customer Details
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    // Travel Details
    travelDate: {
      type: Date,
      required: true,
    },

    adults: {
      type: Number,
      default: 1,
    },

    children: {
      type: Number,
      default: 0,
    },

    totalPersons: {
      type: Number,
      required: true,
    },

    // Pricing
    pricePerPerson: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    // Coupon
    couponCode: {
      type: String,
    },

    // Payment
    paymentMethod: {
      type: String,
      enum: ["Razorpay", "Cash", "UPI", "Card"],
      default: "Razorpay",
    },

    paymentId: String,

    orderId: String,

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    // Booking Status
    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Cancelled",
        "Completed",
      ],
      default: "Placed",
    },

    // Special Request
    specialRequest: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);