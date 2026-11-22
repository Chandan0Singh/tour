
const express = require("express");
const router = express.Router();

const {
  createDestination,
  getAllDestinations,
  getDestinationBySlug,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

// Create destination
router.post("/", createDestination);

// Get all destinations
router.get("/", getAllDestinations);

// Get destination by slug
router.get("/:slug", getDestinationBySlug);

// Update destination
router.put("/:slug", updateDestination);

// Delete destination
router.delete("/:slug", deleteDestination);

module.exports = router;
