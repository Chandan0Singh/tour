const NewsLatter = require("../models/newsLatterModel");

const Subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingSubscriber = await NewsLatter.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "This email is already subscribed to the newsletter.",
      });
    }

    await NewsLatter.create({
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to the newsletter.",
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An error occurred while subscribing to the newsletter.",
    });
  }
};

module.exports = { Subscribe };