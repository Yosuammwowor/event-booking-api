const express = require("express");
const route = express.Router();

const {
  noRoutes,
  getEvents,
  addEvents,
} = require("../controllers/controllerEvents");

route.get("/", (req, res) => {
  getEvents(req, res);
});

route.post("/", (req, res) => {
  addEvents(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
