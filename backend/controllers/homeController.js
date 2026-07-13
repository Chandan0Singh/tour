const Product = require("../models/Product");
const Blog = require("../models/Product");
const Home = require("../models/Product");

// Get Home Data
const getHome = async (req, res) => {
  try {
    const home = await Home.findOne();
    const featuredTreks = await Product.find({type: "Trek"}).limit(4);
    const featuredTours = await Product.find({type: "Tour"}).limit(3);
    const topDestinations = await Product.find({}).sort({createdAt: -1}).limit(3);
    const latestBlogs = await Blog.find({}).sort({createdAt: -1}).limit(3)


    res.status(200).json({
      success: true,
      home,
      featuredTreks,
      featuredTours,
      topDestinations,
      latestBlogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Home
const createHome = async (req, res) => {
  try {
    const existing = await Home.findOne();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Home data already exists",
      });
    }

    const home = await Home.create(req.body);

    res.status(201).json({
      success: true,
      home,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Home
const updateHome = async (req, res) => {
  try {
    const home = await Home.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });

    res.status(200).json({
      success: true,
      home,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Home
const deleteHome = async (req, res) => {
  try {
    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Home not found",
      });
    }

    await Home.findByIdAndDelete(home._id);

    res.status(200).json({
      success: true,
      message: "Home deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getHome,
  createHome,
  updateHome,
  deleteHome,
};
