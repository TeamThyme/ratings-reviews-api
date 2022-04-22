const csv = require("csv-parser");
const fs = require("fs");
const fastcsv = require('fast-csv');

const { Reviews } = require("../db/index.js");


const importReviews = function () {
  let stream = fs.createReadStream('../../csvFiles/reviews.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', (data) => {
      csvStream.pause();

      let formattedData = {
        product_id: Number(data[1]),
        // rating: Number(data[2]),
        // recommend: data[6] === "true",
        //HOW TO DYNAMICALLY ALLOCATE RATINGS AND RECS
        r1: 0,
        r2: 0,
        r3: 0,
        r4: 0,
        r5: 0,
        rTrue: 0,
        rFalse: 0,

      };


      //HOW TO
      Reviews.findOneAndUpdate(formattedData, (err, results) => {
        if (err) {
          console.log('error inserting review', err);
        } else {
          console.log(`inserted id: ${data[0]} review`);
          csvStream.resume();
        }
      });
    })
    .on('end', () => {
      console.log('completed inserting reviews');
    });

  stream.pipe(csvStream);
};

importReviews();

// module.exports = { importReviews };
