require("dotenv").config();
const express = require("express");
const morgan = require('morgan');

const {Reviews} = require('../db/index.js');
// const db = require('../db/dbMethods');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));


app.post("/reviews", (req, res) => {
  db.saveReview(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/postman", (req, res) => {
  res.send("Hello Postman! Have a nice day :)");
});


// app.get('/reviews', (req, res) => {
//   Reviews.find({product_id: 37311}).exec()
//     .then(data => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });
app.get("/reviews", (req, res) => {


  const options = {
    product_id: Number(req.query.product_id) || 1,
    page: Number(req.query.page) || 1,
    count: Number(req.query.count) || 5,
    sort: null
  };

  if (req.query.sort === 'helpful') {
    options.sort = {'helpfulness': 1};
  } else if (req.query.sort === 'newest') {
    options.sort = {"date": -1};
  } else if (req.query.sort === "relevant") {
    // TODO: how sort by relevance?
  }
  // console.log(options)
  Reviews.find({"product_id": options.product_id}).skip(options.count * options.page - options.count).limit(options.count).sort(options.sort)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(err)
    })
});

app.post("/postman", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
