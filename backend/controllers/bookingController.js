const Booking = require("../models/bookingSchema");
const Product = require("../models/Product");

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

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("booking error : ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createBooking };