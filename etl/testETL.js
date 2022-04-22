const db = require('../db/dbMethods');


db.getAll()
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  });