/** @format */

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  let token = await req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error)
      return res.status(401).json({
        message: "Unauthorized, Please login again.",
      });
    req.userId = decoded._id;
    next();
  });
};
