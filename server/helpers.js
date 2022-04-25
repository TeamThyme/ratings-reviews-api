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

const formatRatingsData = (id, reviews, chars) => {
  const data = {
    product_id: id.toString(),
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommended: { false: 0, true: 0 },
    characteristics: {},
  };

  reviews.forEach((review) => {
    data.ratings[review.rating] = data.ratings[review.rating] + 1;
    data.recommended[review.recommend] = data.recommended[review.recommend] + 1;
  });
  chars.forEach((char) => {
    let count = 0;
    let total = 0;
    char.char_reviews.forEach((review) => {
      count++;
      total += review.value;
    });
    data.characteristics[char.name] = {
      id: char.id,
      value: (total / count).toString(),
    };
  });
  for (let key in data.ratings) {
    data.ratings[key] = data.ratings[key].toString();
  }
  for (let key in data.recommended) {
    data.recommended[key] = data.recommended[key].toString();
  }
  return data;
};

module.exports = {
  formatReviews,
  formatOptions,
  formatSaveReview,
  formatRatingsData,
};
