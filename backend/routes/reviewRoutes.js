const express = require("express");

const router = express.Router();

const {
  createReview,
  getAllReviews,
  getProductReviews,
  getReview,
  updateReview,
  deleteReview,
  approveReview,
  rejectReview,
  getPendingReviews,
} = require("../controllers/reviewController");

router.post("/", createReview);

router.get("/", getAllReviews);

router.get("/pending", getPendingReviews);

router.get("/product/:productId", getProductReviews);

router.get("/:id", getReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

router.patch("/:id/approve", approveReview);
router.patch("/:id/reject", rejectReview);

module.exports = router;
