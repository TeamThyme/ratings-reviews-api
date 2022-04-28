const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


mongoose.connect("mongodb://markalperin:password@localhost:27017/reviews?authMechanism=SCRAM-SHA-256")
  // .connect("mongodb://localhost/reviews")
  .then((res) => console.log("You are connected to the Reviews DB!"))
  .catch((err) => console.log(err));

let reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: { type: Number, default: 0 },
  photos: Array,
});

let ratingsSchema = new mongoose.Schema({
  product_id: { type: Number, unique: true },
  r1: { type: Number, default: 0 },
  r2: { type: Number, default: 0 },
  r3: { type: Number, default: 0 },
  r4: { type: Number, default: 0 },
  r5: { type: Number, default: 0 },
  rtrue: { type: Number, default: 0 },
  rfalse: { type: Number, default: 0 },
});

let characteristicsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  char_reviews: Array,
});

let countersSchema = new mongoose.Schema({
  name: String,
  directions: String,
  review_id: Number,
  characteristic_id: Number,
});

module.exports = {
  Reviews: mongoose.model("Reviews", reviewsSchema),
  Ratings: mongoose.model("Ratings", ratingsSchema),
  Counters: mongoose.model("Counters", countersSchema),
  Characteristics: mongoose.model("Characteristics", characteristicsSchema),
};
