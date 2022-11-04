/** @format */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  userIsExisting,
  registerNewUser,
  updatePassword,
} = require("../models/user.mode");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "Please enter all fields.",
      });
    }

    const emailIsExisting = await userIsExisting(email);
    if (emailIsExisting) {
      return res.status(400).json({
        msg: "Email is already existing, please enter another email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await registerNewUser({
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      return res.status(200).json({
        msg: "User is register successfully",
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding new user.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields.",
      });
    }

    const user = await userIsExisting(email);

    if (!user) {
      return res.status(404).json({
        message: "Email is wrong",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while login.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, email } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "Please enter all fields.",
      });
    }

    const user = await userIsExisting(email);

    if (!user) {
      return res.status(404).json({
        message: "Email is wrong",
      });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Old password is wrong",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await updatePassword(hashPassword, email);

    return res.status(200).json({
      msg: "Password updated successfully, Login again.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while login.",
    });
  }
};
