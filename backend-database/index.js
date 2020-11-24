const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config(
  {
    "path": path.join(__dirname, ".env")
  }
);
// environment variables:
//  why: you don"t want other people to have access to your db, so you store the uri in an .env

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
// for parsing json

const uri = process.env.ATLAS_URI;
// unique key to access the database
// user: admin, password: ohnsg5G3KrCWl8tu

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// start connection

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected!");
});
// connection started

// add routes here:
const BoilerRoutes = require(`${__dirname}/routes/boilers`);
// directory: routes/user.js
app.use("/boilers", BoilerRoutes);
// all routes defined in UserRouter will start with /user/*

const PORT = 5000;
// port it will run on locally

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});