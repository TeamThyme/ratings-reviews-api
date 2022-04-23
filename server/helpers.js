
const formatOptions = (query) => {
  const options = {
    product_id: Number(query.product_id) || 1,
    page: Number(query.page) || 1,
    count: Number(query.count) || 5,
    sort: null,
  };

  if (query.sort === "helpful") {
    options.sort = { helpfulness: -1 };
  } else if (query.sort === "newest") {
    options.sort = { date: -1 };
  } else if (query.sort === "relevant") {
    // TODO: how sort by relevance?
  }
  return options;
};

const formatReviews = (array, query) => {
  const formattedArray = array.map((review) => {
    return {
      review_id: review.id,
      rating: review.rating,
      summary: review.summary,
      recommend: review.recommend,
      response: review.response,
      body: review.body,
      date: review.date,
      reviewer_name: review.reviewer_name,
      helpfulness: review.helpfulness,
      photos: review.photos,
    };
  });

  return {
    product_id: query.product_id,
    page: query.page,
    count: query.count,
    results: formattedArray,
  };
};

const formatSaveReview = (review) => {
  review.reviewer_name = review.name;
  review.helpfulness = 0;
  review.response = null;
  review.date = new Date();
  return review;
};

module.exports = {
  formatReviews,
  formatOptions,
  formatSaveReview
};
