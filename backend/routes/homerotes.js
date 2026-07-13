const express = require("express");
const router = express.Router();

const {
  getHome,
  createHome,
  updateHome,
  deleteHome,
} = require("../controllers/homeController");

router.get("/", getHome);
router.post("/", createHome);
router.put("/", updateHome);
router.delete("/", deleteHome);

module.exports = router;