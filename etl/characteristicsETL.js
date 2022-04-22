const csv = require("csv-parser");
const fs = require("fs");
const fastcsv = require('fast-csv');

const { Metadata } = require("../db/index.js");


const importReviews = function () {
  let stream = fs.createReadStream('../../csvFiles/reviews.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', (data) => {
      csvStream.pause();

      let formattedData = {
        id: Number(data[0]),
        product_id: Number(data[1]),
        rating: Number(data[2]),
        date: Number(data[3]),
        summary: data[4],
        body: data[5],
        recommend: data[6] === "true",
        reported: data[7] === "true",
        reviewer_name: data[8],
        reviewer_email: data[9],
        response: data[10] === "null" ? null : data.response,
        helpfulness: Number(data[11]),
        photos: []
      };

      Reviews.insertMany(formattedData, (err, results) => {
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