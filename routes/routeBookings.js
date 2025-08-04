const express = require("express");
const { noRoutes, getBookings } = require("../controllers/controllerBookings");

const route = express.Router();

route.get("/", (req, res) => {
  getBookings(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
