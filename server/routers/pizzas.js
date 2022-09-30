// 'Import' the Express module instead of http
const express = require("express");

// Initialize the Express application
const app = express();

//  require the Express router so that we can define the CRUD route external to the Express app
const {Router} = require("express");

// import the Pizza model and instantiate an instance of Express Router module
const Pizza = require("../models/Pizza");
const router = Router();

// ** vvv abstracted routes from route index.js vvv **
app.use(express.json());

// Handle the request with HTTP GET method from http://localhost:4040/status
app
  .route("/status")
  .get((request, response) => {
   // Create the headers for response by default 200
   // Create the response body
   // End and return the response
   response.status(200).json({message: "Service healthy"})
  })
  //add a post method handler onto our home route that echoes back a request with a JSON body
  .post((request, response) => {
    response.json({requestBody: request.body});
  });


// ** ^^^ abstracted routes from route index.js ^^^ **

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const newPizza = new Pizza(request.body);
  newPizza.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

// export the router variable to be used in the app.js file
module.exports = router;
