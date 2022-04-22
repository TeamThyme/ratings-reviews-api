const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/metadata")

let metadataSchema = new mongoose.Schema({
  product_id: Number,
    r1: Number,
    r2: Number,
    r3: Number,
    r4: Number,
    r5: Number,
    rTrue: Number,
    rFalse: Number,
});

// characteristics: {
//   : {
//     id: Number,
//     value: Number,
//     count: Number,
//     total: Number,
//   },
//   Width: {
//     id: Number,
//     value: Number,
//     count: Number,
//     total: Number,
//   },
//   Comfort: {
//     id: Number,
//     value: Number,
//     count: Number,
//     total: Number,
//   },
//   Quality: {
//     id: Number,
//     value: Number,
//     count: Number,
//     total: Number,
//   },
// },

/*
 open the fileStream

  read and parse a new review object

  format product_id, rating, and recommendation

  findOneAndUpdate({product_id: product_id}, {$inc: {`r${rating}`: 1}}, {upsert: true})
 */

let Metadata = mongoose.model("Metadata", metadataSchema);

module.exports = Metadata;



