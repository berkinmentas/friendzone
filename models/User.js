const mongoose = require("mongoose");
// const connectDB = require("./connection.js");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  nameSurname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 5 },
});

module.exports = userSchema;
