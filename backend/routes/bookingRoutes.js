const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByEmail,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
} = require("../controllers/bookingController");

// Create Booking
router.post("/", createBooking);

// Get All Bookings (Admin)
router.get("/", getAllBookings);

// Get Single Booking
router.get("/:id", getBookingById);

// Get Bookings By Email
router.get("/email/:email", getBookingsByEmail);

// Update Booking Status
router.patch("/:id/status", updateBookingStatus);

// Update Payment Status
router.patch("/:id/payment", updatePaymentStatus);

// Delete Booking
router.delete("/:id", deleteBooking);

module.exports = router;