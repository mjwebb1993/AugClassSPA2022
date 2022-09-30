import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";

//  include Mongoose in your project
const mongoose = require('mongoose')

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

// include dotenv in project
const dotenv = require("dotenv");
// initiate dotenv
dotenv.config();

// assign the port for the BE
const PORT = process.env.API_PORT || 4040; // we use || to provide a default value

// assign the Navigo library with the home path as default passed in and store as "router" for easier reference later in code
const router = new Navigo("/");

// render function to handle compiling primary elements prior to render
function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
      ${Header(state)}
      ${Nav(store.Links)}
      ${Main(state)}
      ${Footer()}
    `;

  afterRender(state);

  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

// use Navigo to handle routing based on selected view/path
router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    // Add a switch case statement to handle multiple routes
    switch (view) {
      // If the view is home...
      case "Home":
        // Send a GET request to the OpenWeathermap API
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          // wait for the response and then convert kelvin to fahrenheit
          .then(response => {
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
            // pass the desired values from the json response body object into the weather array inside the store folder Home.js file
            store.Home.weather = {};
            store.Home.weather.city = response.data.name;
            store.Home.weather.temp = kelvinToFahrenheit(
              response.data.main.temp
            );
            store.Home.weather.feelsLike = kelvinToFahrenheit(
              response.data.main.feels_like
            );
            store.Home.weather.description = response.data.weather[0].main;
            // log the response data for easy debugging
            console.log(response.data);
            // tell it to wrap up and move on
            done();
          })
          // handles errors
          .catch(err => console.log(err));
        break;
      // if the view is "pizza"...
      case "Pizza":
        axios
          // send a GET request to the Pizza API
          .get(`${process.env.PIZZA_PLACE_API_URL}`)
          // wait for the response, then...
          .then(response => {
            // ...push that data to the pizzas array in the pizza.js file in the store folder
            store.Pizza.pizzas = response.data;
            // tell it to wrap up and move on
            done();
          })
          // handles errors
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      // tells it what to do in any other situation
      default:
        // just move on then
        done();
    }
  }
});

// actually render the view here using navigo
router
  // Navigo, ACTIVATE!
  .on({
    // when it's the home path, just execute the render function exactly as it is, since we have home passed in as the default view and state for the render function if nothing else is passed in
    "/": () => render(),
    // if something IS passed in though, pass it in as a view and execute based on THOSE rules instead. params is going to serve as our 'placeholder' var for this fat arrow callback function
    ":view": params => {
      // take the view being passed in, capitalize the first letter only, and assign it as the value of the "view" variable
      let view = capitalize(params.data.view);
      // pass THAT into the render function as which store file you're selecting
      render(store[view]);
    }
  })
  // "LET THERE BE WEBSITE!!!" ...and it is so.
  .resolve();
