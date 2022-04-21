const Reviews = require("../db/reviews.js");


Reviews.find({id: 110940}, (err, result) => {
  console.log(result);
})

