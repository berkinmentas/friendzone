const mongoose = require("mongoose");
const connectDB = require("../connection.js");
const userSchema = require("../models/User.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User", userSchema);
const userControllerSignUp = async (req, res) => {
  const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    nameSurname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  const { username, nameSurname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const validationResult = userValidationSchema.validate(req.body);
    User.findOne({ $or: [{ email: email }, { username: username }] })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(409).json({
            error: true,
            message: "Bu kullanıcı adı veya email zaten kullanılmış.",
          });
        } else {
          if (validationResult.error) {
            return res.status(409).json({
              error: true,
              message: validationResult.error.details[0].message,
            });
          } else {
            console.log(hashedPassword);
            const newUser = new User({
              username: username,
              nameSurname: nameSurname,
              email: email,
              password: hashedPassword,
            });

            newUser.save();
            return res.json({
              error: false,
              message: "Register is succesfull.",
              data: User,
            });
          }
        }
      })
      .catch((err) => {
        return err;
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: true,
      message: "An error occurred while registering the user : ",
      error_message: error,
    });
  }
};

const userControllerLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  })
    .then((existingUser) => {
      bcrypt.compare(password, existingUser.password, function (err, response) {
        if (err) {
          return res.status(400).json({
            error: true,
            message: "Server Error",
          });
        }
        if (response) {
          const token = jwt.sign({ existingUser }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.cookie("authorization", token).json({
            error: false,
            message: "Login Successfull",
          });
        } else {
          // response is OutgoingMessage object that server response http request
          return res.status(409).json({
            error: true,
            message: "Password do not match",
          });
        }
      });
    })
    .catch((err) => {
      return err;
    });
};
module.exports = userControllerSignUp;
module.exports = userControllerLogin;
