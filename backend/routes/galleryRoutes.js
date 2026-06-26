const express = require("express");

const router = express.Router();

const {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

router.get("/", getGallery);

router.get("/:id", getGalleryById);

router.post("/add", createGallery);

router.put("/:id", updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;