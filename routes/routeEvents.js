const express = require("express");
const route = express.Router();

const {
  noRoutes,
  getEvents,
  getEventById,
  addEvents,
  deleteEventById,
} = require("../controllers/controllerEvents");

route.get("/", (req, res) => {
  getEvents(req, res);
});

route.get("/:id", (req, res) => {
  getEventById(req, res);
});

route.post("/", (req, res) => {
  addEvents(req, res);
});

route.delete("/:id", (req, res) => {
  deleteEventById(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
