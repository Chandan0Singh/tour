import Product from "../models/Product.js";
import Blog from "../models/blogSchema.js";

export const getHomeData = async (req, res) => {
  try {
    console.log("controller");

    const featuredTreks = await Product.find({ type: "Trek" }).limit(4);
    const featuredTours = await Product.find({ type: "Tour" }).limit(3);
    const topDestinations = await Product.find({}).sort({ rating: -1 }).limit(3);

    const latestBlogs = await Blog.find({}).sort({rating: -1}).limit(3)


    res.status(200).json({
      success: true,
      message: "Home data",
      featuredTreks,
      featuredTours,
      topDestinations,
      latestBlogs
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching home data",
    });
  }
};