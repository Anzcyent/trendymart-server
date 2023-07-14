const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./helpers/db/connectDB");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(
  PORT,
  console.log(`Server started on port ${PORT} | ${process.env.NODE_ENV}`)
);
