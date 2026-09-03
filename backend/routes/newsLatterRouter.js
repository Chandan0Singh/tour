const express = require("express");
const { Subscribe } = require("../controllers/newsLatterController");

const router = express.Router();

router.post("/subscribe", Subscribe);

module.exports = router;