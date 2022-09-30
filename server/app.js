//  import the new Pizzas router file
const pizzas = require("./routers/pizzas");
// 'Import' the Express module instead of http
const express = require("express");

// Initialize the Express application
const app = express();

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use("/pizzas", pizzas);
app.use(logging);

/*
  express supports chaining `use()` statements,
  so the above 2 statements could look like this as well
  app.use(express.json()).use(logging)
*/

// **THIS IS WHERE THE ROUTES WERE ABSTRACTED FROM TO THE pizzas.js ROUTER FILE**


// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(4040, () => console.log("Listening on port 4040"));
