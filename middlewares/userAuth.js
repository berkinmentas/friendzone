const jwt = require("jsonwebtoken");
const express = require("express");

const userAuth = async (req, res, next) => {
  const authToken = req.headers.cookie;
  const token = authToken.split("=")[1];
  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(405).json({
        error: true,
        message: "Invalid Token",
      });
    } else {
      next();
    }
  });
};

module.exports = userAuth;
