const csv = require("csv-parser");
const fs = require("fs");
// const readline = require('readline');

const Reviews = require("../db/reviews.js");

const transformData = (data) => {
  const formattedData = {
    id: Number(data.id),
    product_id: Number(data.product_id),
    rating: Number(data.rating),
    date: Number(data.date),
    summary: data.summary,
    body: data.body,
    recommend: data.recommend === 'true',
    reported: data.reported === 'true',
    reviewer_name: data.reviewer_name,
    reviewer_email: data.reviewer_email,
    response: data.response === 'null' ? null : data.response,
    helpfulness: Number(data.helpfulness)
  };
  return formattedData;
}

const insertData = async (data) => {
  return await Reviews.findOneAndUpdate({id: data.id}, data, {upsert: true});
}


fs.createReadStream("./reviews.csv")
.pipe(csv())
.on("data", (data) => {
  if (data.id < 100000) {
    const formattedData = transformData(data);
    insertData(formattedData);
    console.log(formattedData.id);
  }
});

// const insertByLine = async () => {
//   const fileStream = fs.createReadStream("./reviews.csv");

//   const rl = readline.createInterface({ input: fileStream });

//   for await (const review of rl) {
//     console.log({review})
//     Reviews.findOneAndUpdate(review.id, review, {upsert: true})
//   }
// }

// insertByLine();

  // const dummyData = {
  //   id: '8273',
  //   product_id: '1415',
  //   rating: '4',
  //   date: '1600425805604',
  //   summary: 'Earum blanditiis unde consequatur eaque.',
  //   body: 'Possimus cupiditate consequatur. Delectus enim iste. Sit accusamus cum atque sint odio minus tempore. Voluptas veritatis deleniti ab.',
  //   recommend: 'true',
  //   reported: 'false',
  //   reviewer_name: 'Dessie.Jacobi',
  //   reviewer_email: 'Thelma.Schaden@gmail.com',
  //   response: 'null',
  //   helpfulness: '28'
  // };
