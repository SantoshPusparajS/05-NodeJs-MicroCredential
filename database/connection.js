const mongoose = require("mongoose");

//Replacing DB password from .env file
const DB = process.env.DB_CONNECTION_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);
const connection = mongoose.connect(DB);

module.exports = connection;
