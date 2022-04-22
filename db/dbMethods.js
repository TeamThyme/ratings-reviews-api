const { Reviews } = require ('./Index.js');

module.exports = {
  getAll: async () => {
    try {
      console.log("get all or twenty...");
      return await Reviews.findOne({id: 311220}).exec();
    } catch (err) {
      console.log(err);
    }
  },
  postReview: () => {}
};