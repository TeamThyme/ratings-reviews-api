
const db = require("../db/index.js");

const getReviewCounter = async () => {
  let reviewsTotal = await db.Reviews.count();
  let lastReview = await db.Reviews.find({id: {$gt: reviewsTotal - 7}}).sort({"id": -1}).limit(10);
  console.log("Last Reviews review_id: ", lastReview[0].review_id);

};
// getReviewCounter();
// 5774953 is the next available review id number


const getCharCounter = async () => {
  let charTotal = await db.Characteristics.count();
  console.log(charTotal);
  let lastChar = await db.Characteristics.find({id: {$gt: charTotal - 5}}).sort({"id": -1}).limit(10);
  console.log(lastChar);
};
// getCharCounter();
// 3347680 is the nex available characteristic id number


const makeReviewCounter = () => {
  const counterPayload = {
    name: "nextAvailableIds",
    directions: 'use current id, then increment',
    review_id: 5774953,
    characteristic_id: 3347680,
  };
  db.Counters.create(counterPayload);
}

makeReviewCounter();