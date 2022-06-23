# System Design: Ratings and Reviews API

A back-end microservice for an [E-Commerce Website](https://github.com/CradleMountain/wouldawoodshopshopwood). The goal of the project was to build a scalable RESTful API for an existing e-commerce web application and optimize it to withstand the web scale traffic loads. Working in a team of three engineers, we inherited a legacy codebase and each member took ownership of a micro service that will maintain the existing application data set. I was responsible for redesigning and building a backend server and database for the Ratings and Reviews API service.


**Optimization**
The back end distributed the load via Nginx to three AWS-EC2 instances that called upon a MongoDB database housed in an additional AWS instance. Performance was scaled to meet production level traffic of 1500 req/sec @ 14ms/req with less than 1% error rate.
![image](images/fecGif.gif)


