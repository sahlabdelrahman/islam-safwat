/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const runDB = require("./config/runDB");
const cloudinaryConfig = require("./config/cloudinary");

// APP
const app = express();

var corsOptions = {
  origin: "*",
};

const config = JSON.parse(fs.readFileSync("package.json")).config;
if (config["server-compress"]) {
  app.use(compression({ filter: () => true }));
}

app.use((req, res, next) => {
  setTimeout(next, config["server-delay"]);
});

app.use(compression());

// Middlewars
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, "/uploads")));

app.use(cors(corsOptions));

// DB
runDB();

// Cloudinary config
cloudinaryConfig();

// Routes
fs.readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

// Handle notfound routes
// app.use(function (req, res) {
//   res.status(404).json({
//     msg: req.originalUrl + " not found",
//   });
// });

// app.get("/", (req, res) => {
//   const filePath = path.resolve(__dirname, "./client/build", "index.html");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }

//     data = data
//       .replace(/__TITLE__/g, "Islam Safwat - test")
//       .replace(
//         /__DESCRIPTION__/g,
//         "Islam Safwat, a photojournalist and documentary photographer born in Cairo March 1989. Graduated from the Faculty of Commerce Business Administration 2014. loves photography from childhood and use the old family cameras and smartphones when its arrived, then found the passion is on photojournalism so started works as a photojournalist at El Shorouk daily newspaper from 2016 till now, Islam based in Cairo, works as a Stringer with Associated Press Agency, and Bloomberg news, and Deutsche Press Agency, and contributor with GettyImages and NURPHOTO Agency, Work as a consultant with Goethe institute from March 2018, till now as a photographer"
//       )
//       .replace(
//         /__IMAGE__/,
//         "https://res.cloudinary.com/djc75dmuy/image/upload/v1664634484/featured/spjbaxasnuulnsqpzfqf.jpg"
//       );

//     res.send(data);
//   });
// });

// app.get("/singles", (req, res) => {
//   const filePath = path.resolve(__dirname, "./client/build", "index.html");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }

//     data = data
//       .replace(/__TITLE__/g, "Islam Safwat - Singles")
//       .replace(
//         /__DESCRIPTION__/g,
//         "it’s a collection of pictures from different events and different photography categories you can find here, news, sports, street, travel, and more."
//       )
//       .replace(
//         /__IMAGE__/,
//         "https://res.cloudinary.com/dvkdsstp7/image/upload/f_webp/q_100/v1/singles/kaj6jfclevpest72ko8b?_a=ATO2BAA0"
//       );

//     res.send(data);
//   });
// });

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
