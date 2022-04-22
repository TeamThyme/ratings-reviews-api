// answer_photos => answers in DB: qa
db.answers.aggregate([{
  $lookup: {
    from: "answers_photos",
    localField: "id",
    foreignField: "answer_id",
    as: "photos"
  }
}])

//pipeline: aggregate answers => questions, then merge permanently
db.questions.aggregate([
  {$lookup: {
    from: "answers",
    localField: "id",
    foreignField: "question_id",
    as: "answers"
  }
},
{$merge:{into: 'questions'}}
])

// Pipeline: aggregate photos => reviews, then merge
db.reviews.aggregate([
  {$lookup: {
    from: "photos",
    localField: "id",
    foreignField: "review_id",
    as: "photos"
  }
},
{$merge: {into: 'reviews'}}
])

// ratings => products
db.products.aggregate([{
  $lookup: {
    from: "ratings",
    localField: "product_id",
    foreignField: "product_id",
    as: '"ratings'
  }
}])

// characteristics => products
db.products.aggregate([{
  $lookup: {
          from: "characteristics",
          localField: "product_id",
          foreignField: "product_id",
          as: "characteristics"
      }
}])

// characteristics_reviews => characteristics
db.characteristics.aggergate([{
  $lookup: {
    from: "characteristic_reviews"
  }
}])