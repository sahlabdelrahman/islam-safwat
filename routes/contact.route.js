/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middlewares/user.middleware");
const { handleContact } = require("../controllers/contact.controller");

router.post("/contact", handleContact);

module.exports = router;
