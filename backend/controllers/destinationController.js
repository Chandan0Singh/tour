
const Destination = require("../models/Destination");

// =====================================
// CREATE DESTINATION
// =====================================
const createDestination = async (req, res) => {
  try {
    const {
      state,
      slug,
      country,
      bannerImage,
      heroTitle,
      heroSubtitle,
      description,
      isActive,
      seo,
    } = req.body;

    if (!state || !slug || !heroTitle) {
      return res.status(400).json({
        success: false,
        message: "State, slug and hero title are required",
      });
    }

    if (!Array.isArray(bannerImage) || bannerImage.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one banner image is required",
      });
    }

    const existing = await Destination.findOne({
      $or: [
        { slug: slug.toLowerCase().trim() },
        { state: { $regex: `^${state.trim()}$`, $options: "i" } },
      ],
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Destination already exists",
      });
    }

    const destination = await Destination.create({
      state,
      slug: slug.toLowerCase().trim(),
      country,
      bannerImage,
      heroTitle,
      heroSubtitle,
      description,
      isActive,
      seo,
    });

    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      destination,
    });

  } catch (error) {
    console.log("CREATE DESTINATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// GET ALL DESTINATIONS
// =====================================
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// GET DESTINATION BY SLUG
// =====================================
const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const destination = await Destination.findOne({
      slug: slug.toLowerCase(),
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      destination,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// UPDATE DESTINATION
// =====================================
const updateDestination = async (req, res) => {
  try {
    const { slug } = req.params;

    const {
      state,
      slug: newSlug,
      country,
      bannerImage,
      heroTitle,
      heroSubtitle,
      description,
      isActive,
      seo,
    } = req.body;

    const destination = await Destination.findOne({
      slug: slug.toLowerCase(),
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Check whether new slug belongs to another destination
    if (newSlug && newSlug.toLowerCase() !== destination.slug) {
      const slugExists = await Destination.findOne({
        slug: newSlug.toLowerCase(),
        _id: { $ne: destination._id },
      });

      if (slugExists) {
        return res.status(409).json({
          success: false,
          message: "This slug is already being used",
        });
      }
    }

    if (state !== undefined) destination.state = state;
    if (newSlug !== undefined) {
      destination.slug = newSlug.toLowerCase().trim();
    }
    if (country !== undefined) destination.country = country;
    if (bannerImage !== undefined) destination.bannerImage = bannerImage;
    if (heroTitle !== undefined) destination.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) destination.heroSubtitle = heroSubtitle;
    if (description !== undefined) destination.description = description;
    if (isActive !== undefined) destination.isActive = isActive;
    if (seo !== undefined) destination.seo = seo;

    await destination.save();

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      destination,
    });

  } catch (error) {
    console.log("UPDATE DESTINATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================
// DELETE DESTINATION
// =====================================
const deleteDestination = async (req, res) => {
  try {
    const { slug } = req.params;

    const destination = await Destination.findOneAndDelete({
      slug: slug.toLowerCase(),
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationBySlug,
  updateDestination,
  deleteDestination,
};
