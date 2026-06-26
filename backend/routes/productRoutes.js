const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getFeaturedProducts,
  getBestSellerProducts,
  searchProducts,
  getProductBySlug,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/featured", getFeaturedProducts);

router.get("/bestseller", getBestSellerProducts);

router.get("/search", searchProducts);

router.get("/related/:id", getRelatedProducts);

router.get("/:slug", getProductBySlug);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;