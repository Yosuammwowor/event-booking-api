const express = require("express");
const route = express.Router();

const {
  getUsers,
  addUsers,
  noRoutes,
} = require("../controllers/controllerUsers");

route.get("/", (req, res) => {
  getUsers(req, res);
});

route.post("/", (req, res) => {
  addUsers(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
