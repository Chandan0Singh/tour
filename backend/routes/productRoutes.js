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
  getHeaderMenu,
  getProductCategories,
  getSinglePageBySlug,
  getProductById,
} = require("../controllers/productController");

router.get("/", getAllProducts);

router.get("/featured", getFeaturedProducts);

router.get("/bestseller", getBestSellerProducts);

router.get("/search", searchProducts);

router.get("/categories", getProductCategories);

router.get("/header-menu", getHeaderMenu);

router.get("/related/:id", getRelatedProducts);

router.get("/singleProduct/:slug", getSinglePageBySlug);

router.get("/singlePage/:slug", getSinglePageBySlug); // New route for single page by slug

router.get("/by-id/:id", getProductById);

router.get("/:slug", getProductBySlug);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
