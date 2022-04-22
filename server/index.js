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


app.get('/reviews', (req, res) => {
  Reviews.find({product_id: 37311}).exec()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      console.error(err);
    });
});
// app.get("/reviews", (req, res) => {
//   console.log('getReviews');
//   db.getAll()
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.error(err)
//     })
// });

app.post("/postman", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
