const express = require("express");
const {
  noRoutes,
  getBookings,
  getBookingById,
  addBookings,
} = require("../controllers/controllerBookings");

const route = express.Router();

route.get("/", (req, res) => {
  getBookings(req, res);
});

route.get("/:id", (req, res) => {
  getBookingById(req, res);
});

route.post("/", (req, res) => {
  addBookings(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
