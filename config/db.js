const mongoose = require("mongoose");

const connection = mongoose.connect('mongodb+srv://ashu1704:ashu1704@cluster0.7jgezmr.mongodb.net/men').then(() => {
  console.log("Connected to database");
});

module.exports = connection;
