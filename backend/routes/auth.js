const express = require("express");
const router = express.Router();

const { signupUser, loginUser,  CHECK_ADMIN_PASSWORD } = require("../controllers/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/check-admin-password", CHECK_ADMIN_PASSWORD);

module.exports = router;
