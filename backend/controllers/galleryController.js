const Gallery = require("../models/Gallery");

// Get All Images
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json(gallery);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch gallery",
      error: err.message,
    });
  }
};

// Get Single Image
const getGalleryById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.json(image);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Add Image
const createGallery = async (req, res) => {
  try {
    const gallery = new Gallery(req.body);

    await gallery.save();

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create image",
      error: err.message,
    });
  }
};

// Update Image
const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.json(gallery);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Image
const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.json({
      message: "Gallery image deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};