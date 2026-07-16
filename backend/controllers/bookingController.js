const Booking = require("../models/bookingSchema");
const Product = require("../models/Product");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      productId,
      name,
      email,
      phone,
      travelers,
      travelDate,
      message,
    } = req.body;

    if (
      !productId ||
      !name ||
      !email ||
      !phone ||
      !travelDate ||
      !travelers
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory.",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    const totalAmount = product.price * travelers;

    const booking = await Booking.create({
      productId,
      name,
      email,
      phone,
      travelers,
      travelDate,
      message,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("productId", "title slug price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Booking By ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "productId",
      "title slug price"
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Bookings By Email
const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const bookings = await Booking.find({ email })
      .populate("productId", "title slug price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    booking.bookingStatus = bookingStatus;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking status updated.",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    booking.paymentStatus = paymentStatus;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Payment status updated.",
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByEmail,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
};