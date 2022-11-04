/** @format */

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handleContact = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FOR_CONTACT,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL_FOR_CONTACT,
      subject: req.body.subject,
      text: `You got a message from
      Email: ${req.body.email}
      Name: ${req.body.name}
      Message: ${req.body.message}`,
    };

    await transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        return res.status(400).json(error);
      }
      return res.status(200).json({
        msg: "Message sent successfully.",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while handling contact.",
    });
  }
};
