const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "",
      },
      subtitle: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      backgroundImage: {
        type: String,
        default: "",
      },
      primaryButton: {
        text: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
      },
      secondaryButton: {
        text: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
      },
    },

    stats: {
      travelers: {
        type: Number,
        default: 0,
      },
      destinations: {
        type: Number,
        default: 0,
      },
      treks: {
        type: Number,
        default: 0,
      },
      yearsExperience: {
        type: Number,
        default: 0,
      },
    },

    newsletter: {
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },
      metaDescription: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Home", homeSchema);