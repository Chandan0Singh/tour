const Product = require("../models/Product");

// Get All Products (with filters, sorting & pagination)
const getAllProducts = async (req, res) => {
  try {
    const {
      type,
      category,
      difficulty,
      minPrice,
      maxPrice,
      featured,
      bestSeller,
      page = 1,
      limit = 9,
      sort = "latest",
    } = req.query;

    let filter = {
      status: "Active",
    };

    if (type) filter.type = type;

    if (category && category !== "All Tours") {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (bestSeller === "true") {
      filter.bestSeller = true;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);

      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    switch (sort) {
      case "price_asc":
        query = query.sort({ price: 1 });
        break;

      case "price_desc":
        query = query.sort({ price: -1 });
        break;

      case "rating":
        query = query.sort({ averageRating: -1 });
        break;

      default:
        query = query.sort({ createdAt: -1 });
    }

    const products = await query.skip((page - 1) * limit).limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      products,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getProductCategories = async (req, res) => {
  try {
    const { type, state } = req.query;

    console.log("Received query parameters:", { type, state });

    if (!type || !state) {
      return res.status(400).json({
        success: false,
        message: "Type and state are required",
      });
    }

    const filter = {
      status: "Active",
      state: {
        $regex: `^${state}$`,
        $options: "i",
      },
    };

    // Tour / Trek ke liye type filter
    if (type === "Tour" || type === "Trek") {
      filter.type = type;
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      type,
      state,
      total: products.length,
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Featured Tours
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      featured: true,
      status: "Active",
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Best Seller Tours
const getBestSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      bestSeller: true,
      status: "Active",
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Search Products
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({
      title: {
        $regex: q,
        $options: "i",
      },
      status: "Active",
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Single Product by Slug
const getProductBySlug = async (req, res) => {
  try {

    const { slug } = req.params;

    console.log("Fetching product with slug:", req.params.slug);
    
    const products = await Product.find({
      state: { $regex: `^${slug}$`, $options: "i" },
      status: "Active",
    });


    if (!products) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(products);
  } catch (err) {

    console.log("Error fetching product by slug:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Related Products
const getRelatedProducts = async (req, res) => {
  try {
    const current = await Product.findById(req.params.id);

    if (!current) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const related = await Product.find({
      _id: { $ne: current._id },
      category: current.category,
      status: "Active",
    }).limit(4);

    res.json(related);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const saved = await product.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete product",
      error: err.message,
    });
  }
};

const createMenuItems = (states, basePath) => {
  return states
    .filter(Boolean)
    .map((state) => {
      const slug = state
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return {
        label: state,
        href: `${basePath}/${slug}`,
      };
    });
};

const getHeaderMenu = async (req, res) => {
  try {
    // Get unique states for Tours
    const tourStates = await Product.distinct("state", {
      type: "Tour",
      status: "Active",
      state: {
        $exists: true,
        $ne: "",
      },
    });

    // Get unique states for Treks
    const trekStates = await Product.distinct("state", {
      type: "Trek",
      status: "Active",
      state: {
        $exists: true,
        $ne: "",
      },
    });

    // Get unique states for Destinations
    const destinationStates = await Product.distinct("state", {
      status: "Active",
      state: {
        $exists: true,
        $ne: "",
      },
    });

    const tours = [
      {
        label: "All Tours",
        href: "/tours",
      },
      ...createMenuItems(tourStates, "/tours"),
    ];

    const treks = [
      {
        label: "All Treks",
        href: "/treks",
      },
      ...createMenuItems(trekStates, "/treks"),
    ];

    const destinations = createMenuItems(
      destinationStates,
      "/destinations"
    );

    res.status(200).json({
      success: true,
      menu: {
        tours,
        treks,
        destinations,
      },
    });
  } catch (err) {
    console.log("Error in getHeaderMenu:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
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
};
