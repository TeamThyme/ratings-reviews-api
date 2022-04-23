const csv = require("csv-parser");
const fs = require("fs");
const fastcsv = require('fast-csv');

const { Ratings } = require("../db/index.js");


const importRatings = function () {
  let stream = fs.createReadStream('../../csvFiles/reviews.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', (data) => {

      console.log(data);
      let formattedData = {
        product_id: Number(data[1]),
        `r${data[2]}`: 1,
        `r${data[6]}`: 1,
      };
      console.log(formattedData);
      csvStream.pause();
    });
    stream.pipe(csvStream);
  };
      //HOW TO
    //   Reviews.findOneAndUpdate(formattedData, (err, results) => {
    //     if (err) {
    //       console.log('error inserting review', err);
    //     } else {
    //       console.log(`inserted id: ${data[0]} review`);
    //       csvStream.resume();
    //     }
    //   });
    // })
    // .on('end', () => {
    //   console.log('completed inserting reviews');
    // });



importRatings();
