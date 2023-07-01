const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../models/User.js");
const userController = require("../controllers/userController.js");

router.get("/hello", (req, res) => {
  return res.json({
    error: false,
    message: "Server is running 💩",
    data: null,
  });
});

router.post("/register", userController);
module.exports = router;
