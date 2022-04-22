const mongoose = require('mongoose');
const { Reviews } = require('../db/index.js');
const fs = require('fs');
const fastcsv = require('fast-csv');


const insertPhotosToReviews = () => {

  let stream = fs.createReadStream('./reviews_photos.csv')
  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', (data) => {
      console.log(data);
      csvStream.pause();
      console.log('paused');

      let formattedData = {
        id: Number(data[0]),
        review_id: Number(data[1]),
        url: data[2]
      };

      Reviews.updateOne(
        { id: Number(data[1]) },
        { $push: { photos: formattedData } }
      )
        .then(() => {
          console.log(`added photo ${data[0]} to ${data[1]}th review`);
          csvStream.resume();
        })
        .catch((err) => {
          console.log('error adding photos to collection', err);
        });
    })
    .on('end', () => {
      console.log('FINISHED adding photos to reviews collection');
    });

  stream.pipe(csvStream);
};

insertPhotosToReviews();

// module.exports = { insertPhotosToReviews };