const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/reviews")
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
    helpfulness: Number,
    photos: Array
  });

  let metadataSchema = new mongoose.Schema({
    product_id: Number,
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
    },
    recommended: {
      true: Number,
      false: Number,
    },
    characteristics: {
      Size: {
        id: Number,
        value: Number,
        count: Number,
        total: Number,
      },
      Width: {
        id: Number,
        value: Number,
        count: Number,
        total: Number,
      },
      Comfort: {
        id: Number,
        value: Number,
        count: Number,
        total: Number,
      },
      Quality: {
        id: Number,
        value: Number,
        count: Number,
        total: Number,
      },
    },
  });


module.exports = {
  Reviews: mongoose.model("Reviews", reviewsSchema),
  Metadata: mongoose.model("Metadata", metadataSchema),
};

