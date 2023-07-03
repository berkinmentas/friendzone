const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../models/User.js");
const userControllerSignUp = require("../controllers/userController.js");
const userControllerLogin = require("../controllers/userController.js");
const userAuth = require("../middlewares/userAuth.js");

router.get("/hello", (req, res) => {
  return res.json({
    error: false,
    message: "Server is running 💩",
    data: null,
  });
});

router.post("/register", userControllerSignUp);
router.post("/login", userControllerLogin);
router.get("/users", userAuth, (req, res) => {
  try {
    return res.json({
      error: false,
      message: "Middleware test passed",
    });
  } catch {
    return res.json({
      error: true,
      message: "Server Error",
    });
  }
});
module.exports = router;
