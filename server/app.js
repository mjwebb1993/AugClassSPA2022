// import dotenv functionality to get access to environmental variables in .env file
const dotenv = require("dotenv");
// include Mongoose in your project
const mongoose = require("mongoose");
// import express
const express = require("express");
// import the new Pizzas router file
const pizzas = require("./routers/pizzas");
// 'Import' the Express module instead of http

dotenv.config();

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};


// hook it up to MongoDB
mongoose.connect(process.env.MONGODB)

// map the constant db to mongoose.connection so that we can refer to it later on in our code without having to type it all out
const db = mongoose.connection

// handles events that Mongoose sends back to indicate the status of our connection to the database
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);


// Initialize the Express application
const app = express();

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(cors);
app.use(logging);
app.use(express.json());
app.use("/pizzas", pizzas);

/*
  express supports chaining `use()` statements,
  so the above 2 statements could look like this as well
  app.use(express.json()).use(logging)
*/

// **THIS IS WHERE THE ROUTES WERE ABSTRACTED FROM TO THE pizzas.js ROUTER FILE**


// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(4040, () => console.log("Listening on port 4040"));
