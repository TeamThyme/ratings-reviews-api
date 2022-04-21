const csv = require("csv-parser");
const fs = require("fs");
// const readline = require('readline');

const Reviews = require("../db/reviews.js");

const transformData = (data) => {
  const formattedData = {
    review_id: Number(data.review_id),
    url: data.url
  };
  return formattedData;
}

const insertData = async (data) => {
  Reviews.findOneAndUpdate({id: data.review_id}, data)
}

fs.createReadStream("./reviews.csv")
.pipe(csv())
.on("data", (data) => {
  const formattedData = transformData(data);
  console.log(formattedData.review_id);
  insertData(formattedData); // await
});
