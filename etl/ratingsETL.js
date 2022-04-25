const csv = require("csv-parser");
const fs = require("fs");
const fastcsv = require("fast-csv");

const { Ratings } = require("../db/index.js");

const importRatings = function () {
  console.log("import ratings running...");
  const chunk = [];
  let stream = fs.createReadStream("../../csvFiles/reviews.csv");

  let csvStream = fastcsv.parse({ skipLines: 1 }).on("data", (data) => {

    let formattedData = {
      product_id: Number(data[1]),
      [`r${data[2]}`]: 1,
      [`r${data[6]}`]: 1,
    };

    chunk.push(formattedData);
    if (chunk.length > 5) {
      csvStream.pause();
      for (let i = 0; i < chunk.length; i++) {
        Ratings.findOneAndUpdate({"product_id": chunk[i].product_id }, chunk[i])
        .then(data => {

        })
        .catch(err => {
          console.error(err);
        })
      }


    }
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
