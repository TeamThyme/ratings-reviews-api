const csv = require("csv-parser");
const fs = require("fs");
const fastcsv = require("fast-csv");

const { Ratings } = require("../db/index.js");

const importRatings = function () {
  console.log("import ratings running...");
  let chunk = [];
  let stream = fs.createReadStream("../../csvFiles/reviews.csv");
  let csvStream = fastcsv.parse({ skipLines: 1 }).on("data", (data) => {

    let formattedData = {
      product_id: Number(data[1]),
    };
    chunk.push(formattedData);

    if (chunk.length > 5000) {
      console.log(chunk.length)
      csvStream.pause();
      for (let i = 0; i < chunk.length; i++) {
        console.log(chunk[i]);
        if(chunk[i].product_id) {
          Ratings.findOneAndUpdate({"product_id": chunk[i].product_id }, chunk[i], {upsert: true})
          .then(()=> {

          })
          .catch(err => {
            console.error(err);
          });
        }

      }
      chunk = [];
      stream.resume();
    }
  })
  .on('end', () => {
    for (let i = 0; i < chunk.length; i++) {
      Ratings.findOneAndUpdate({"product_id": chunk[i].product_id }, chunk[i], {upsert: true})
      .then(data => {
        console.log(data.product_id)
      })
      .catch(err => {
        console.error(err);
      });
    }
    console.log('completed inserting reviews');
  });
  stream.pipe(csvStream);
};

importRatings();
