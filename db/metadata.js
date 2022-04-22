const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/metadata")

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

let Metadata = mongoose.model("Metadata", metadataSchema);

module.exports = Metadata;
