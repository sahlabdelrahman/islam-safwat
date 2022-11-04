/** @format */

const { verifyToken } = require("../middlewares/user.middleware");

const router = require("express").Router();

const {
  register,
  login,
  changePassword,
} = require("../controllers/user.controller");

router.post("/user/register", register);
router.post("/user/login", login);
router.put("/user/change-password", verifyToken, changePassword);

module.exports = router;
