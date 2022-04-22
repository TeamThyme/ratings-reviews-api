const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/reviews")

let reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: Array
});

let Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
