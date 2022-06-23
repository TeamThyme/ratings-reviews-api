# System Design: Ratings and Reviews API

A back-end microservice for an [E-Commerce Website](https://github.com/CradleMountain/wouldawoodshopshopwood). The goal of the project was to build a scalable RESTful API for an existing e-commerce web application and optimize it to withstand the web scale traffic loads. Working in a team of three engineers, we inherited a legacy codebase and each member took ownership of a micro service that will maintain the existing application data set. I was responsible for redesigning and building a backend server and database for the Ratings and Reviews API service.

## Table of contents
1. [Description](#description)
2. [Screenshots](#screenshots)

## Description <a name=”description”></a>
The Front End Capstone represents roughly three weeks of planning and development toward a single product page for an e-commerce website. It was designed from a plain-language specifications document by a team of three as part of the Hack Reactor Software Engineering Immersive.

The project is divided into four main widgets: Product Overview, Related Products, Questions and Answers, and Ratings and Reviews. Each member of our team was responsible for one widget, and Related Products was a collaborative effort. The site also tracks user interaction data, including the time and target element of each click.

The **Product Overview** is the top-most widget on the page. It guides the user through different styles of products and their many images with carousels and thumbnails. The Overview also allows the user to place products into the cart for later purchase.

The **Related Products** widget displays other products to the user and allows the user to navigate to update the Product Overview with these new items. It consists of a display carousel and modals that display product comparison.

The **Questions and Answers** widget displays user-submitted questions relating to a specific product, and the answers corresponding to the individual questions. The user may search the questions, report questions and answers, and mark questions and answers as helpful.

The **Ratings and Reviews** widget displays user-created product reviews in a list format. Metadata derived from the reviews, including average rating, are displayed to the side. The reviews may be filtered by rating and sorted by newest, most relevant, and most helpful. Users have the ability to mark a review as helpful and view attached images, as well as write and post a new review.

## Screenshots <a name=”screenshots></a>

**Scrolling Carousels and Image Zoom**
![image](images/fecGif.gif)

In order to access Hack Reactor’s server, you will need to use your own GitHub API token. Rename or copy `example.config.js` to `config.js` and edit in your GitHub token where indicated.

The webpage will be available in your browser: [http://localhost:3000](http://localhost:3000)
