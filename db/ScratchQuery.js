// indices
db.reviews.createIndex({id: 1});
db.reviews.createIndex({product_id: 1});
db.photos.createIndex({review_id: 1});
db.characteristics.createIndex({ id: 1});
db.characteristics.createIndex({ product_id: 1 });
db.characteristic_reviews.createIndex({ characteristic_id: 1 });

// Pipeline: aggregate photos => reviews, then merge
db.reviews.aggregate([
  {
    $lookup: {
      from: "photos",
      localField: "id",
      foreignField: "review_id",
      as: "photos",
    },
  },
  { $merge: { into: "reviews" } },
]);

// characteristics_reviews => characteristics
db.characteristics.aggregate([
  {
    $lookup: {
      from: "characteristic_reviews",
      localField: "id",
      foreignField: "characteristic_id",
      as: "char_reviews",
    }
  },
  { $merge: { into: "characteristics" } }
])
