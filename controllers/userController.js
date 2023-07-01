const mongoose = require("mongoose");
const connectDB = require("../connection.js");
const userSchema = require("../models/User.js");
const Joi = require("joi");

const userController = async (req, res) => {
  const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    nameSurname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  const { username, nameSurname, email, password, repeatPassword } = req.body;
  try {
    const validationResult = userValidationSchema.validate(req.body);
    const User = mongoose.model("User", userSchema);
    User.findOne({ $or: [{ email: email }, { username: username }] })
      .then((existingUser) => {
        if (existingUser) {
          return res.json({
            error: true,
            message: "Bu kullanıcı adı veya email zaten kullanılmış.",
          });
        } else {
          if (validationResult.error) {
            return res.json({
              error: true,
              message: validationResult.error.details[0].message,
            });
          } else {
            const newUser = new User({
              username: username,
              nameSurname: nameSurname,
              email: email,
              password: password,
              repeatPassword: repeatPassword,
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
    console.log("burada");
    console.log(error.message);
    return res.status(400).json({
      error: true,
      message: "An error occurred while registering the user : ",
      error_message: error,
    });
  }
};

module.exports = userController;
