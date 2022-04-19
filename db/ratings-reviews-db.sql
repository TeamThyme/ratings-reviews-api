SET check_function_bodies = false;

/* Table 'reviews' */
CREATE TABLE reviews(
  id integer NOT NULL,
  products_id integer NOT NULL,
  rating integer,
  summary text,
  recommend boolean,
  response text,
  body text,
  date text,
  helpfulness integer,
  reported boolean,
  reviewers_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'photos' */
CREATE TABLE photos(
  id integer NOT NULL,
  url text,
  reviews_id integer NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'reviewers' */
CREATE TABLE reviewers(
  id integer NOT NULL,
  reviewer_name text,
  email text,
  PRIMARY KEY(id)
);

/* Table 'products' */
CREATE TABLE products(id integer NOT NULL, PRIMARY KEY(id));

/* Relation 'reviewers_reviews' */
ALTER TABLE reviews
  ADD CONSTRAINT reviewers_reviews
    FOREIGN KEY (reviewers_id) REFERENCES reviewers (id);

/* Relation 'products_reviews' */
ALTER TABLE reviews
  ADD CONSTRAINT products_reviews
    FOREIGN KEY (products_id) REFERENCES products (id);

/* Relation 'reviews_photos' */
ALTER TABLE photos
  ADD CONSTRAINT reviews_photos FOREIGN KEY (reviews_id) REFERENCES reviews (id)
  ;
