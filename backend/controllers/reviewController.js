const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/Product");

const createReview = async (req, res) => {
  try {
    const { productId, userId, name, email, rating, title, review, images } =
      req.body;

    if (!productId || !userId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const alreadyReviewed = await Review.findOne({
      productId,
      userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this tour.",
      });
    }

    const newReview = await Review.create({
      productId,
      userId,
      name,
      email,
      rating,
      title,
      review,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name slug")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    return res.json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    await updateProductRating(review.product);

    return res.json({
      success: true,
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductRating(productId);

    return res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    review.isApproved = true;

    await review.save();

    await updateProductRating(review.product);

    return res.json({
      success: true,
      message: "Review approved successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      isApproved: false,
    })
      .populate("product", "name")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getProductReviews,
  getReview,
  updateReview,
  deleteReview,
  approveReview,
  getPendingReviews,
};
