require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { Reviews, Counters, Characteristics } = require("../db/index.js");
const helpers = require('./helpers');

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.post("/reviews", (req, res) => {
  Reviews.create(helpers.formatSaveReview(req.body))
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get("/reviews", (req, res) => {
  const options = helpers.formatOptions(req.query)

  Reviews.find({ product_id: options.product_id })
    .skip(options.count * options.page - options.count)
    .limit(options.count)
    .sort(options.sort)
    .then((data) => {
      res.send(helpers.formatReviews(data, options));
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.get("/reviews/meta", async (req, res) => {
  try {
    const reviews = await Reviews.find({product_id: req.query.product_id})
    const chars = await Characteristics.find({product_id: req.query.product_id});
    productData = helpers.formatRatingsData(req.query.product_id, reviews, chars);
    res.send(productData);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
})

app.put("/reviews/:review_id/helpful", (req, res) => {
  Reviews.findOneAndUpdate({id: req.params.review_id}, {$inc: {helpfulness: 1}})
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.send(err);
    });
});

app.put("/reviews/:review_id/report", (req, res) => {
  console.log(req.params.review_id);
  Reviews.findOneAndUpdate({id: req.params.review_id}, {reported: true})
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.send(err);
    })
})

app.post("/postman", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get("/postman", (req, res) => {
  res.send("Hello Postman! Have a nice day :)");
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
