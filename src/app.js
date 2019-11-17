// Load in Core Modules
const path = require("path");

// Load in NPM Modules
const express = require("express");
const hbs = require("hbs");

// Load in internal functions
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setup routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Walter Ashbrook"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Walter Ashbrook"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Walter Ashbrook",
    helpText: "This is a help message!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found.",
    name: "Walter Ashbrook",
    title: "404"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
    name: "Walter Ashbrook",
    title: "404"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
